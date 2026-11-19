"""Align the Vice City detail (homography from SIFT, see align.py) onto the upscaled full map and blend with a
feathered, colour-matched mask. Output: work/composite.png at 4x the full-map source pixels."""
import cv2, numpy as np, json
cv2.setNumThreads(8)
H=np.array(json.load(open('work/H.json')))
full=cv2.imread('work/full-x4.png'); vc=cv2.imread('work/vc-x4.png')
S=6  # composite pixels per full-map source pixel (ESRGAN gives 4x; VC detail is ~7.9x after 4x of its ~2x native)
K=S/4
full=cv2.resize(full,(round(full.shape[1]*K),round(full.shape[0]*K)),interpolation=cv2.INTER_LANCZOS4)
Hc,Wc=full.shape[:2]
M=np.diag([S,S,1.0])@H@np.diag([1/4,1/4,1.0])
warp=cv2.warpPerspective(vc,M,(Wc,Hc),flags=cv2.INTER_LANCZOS4,borderMode=cv2.BORDER_CONSTANT)
valid=cv2.warpPerspective(np.full(vc.shape[:2],255,np.uint8),M,(Wc,Hc),flags=cv2.INTER_NEAREST)
# the VC art has a thin frame/edge: erode, then feather
valid=cv2.erode(valid,np.ones((3,3),np.uint8),iterations=int(24*K))
dist=cv2.distanceTransform((valid>0).astype(np.uint8),cv2.DIST_L2,5)
FEATHER=220.0*K
alpha=np.clip(dist/FEATHER,0,1)**1.0
alpha=alpha*alpha*(3-2*alpha)  # smoothstep
# colour match: low-frequency gain between warped VC and full in the overlap
ov=(alpha>0.5)
small=lambda a: cv2.resize(a,(Wc//12,Hc//12),interpolation=cv2.INTER_AREA).astype(np.float32)
fs,ws=small(full),small(warp); ms=cv2.resize(ov.astype(np.uint8),(Wc//12,Hc//12),interpolation=cv2.INTER_AREA)>0.9
gain=np.ones((Hc//8,Wc//8,3),np.float32)
g=(cv2.GaussianBlur(fs,(0,0),12)+1)/(cv2.GaussianBlur(ws,(0,0),12)+1)
mean_gain=np.array([np.median(g[:,:,c][ms]) for c in range(3)]); print('median gain BGR',mean_gain)
gain=np.where(ms[...,None],g,mean_gain[None,None,:]).astype(np.float32)
gain=cv2.GaussianBlur(gain,(0,0),10)
gain=np.clip(cv2.resize(gain,(Wc,Hc),interpolation=cv2.INTER_CUBIC),0.8,1.25)
warp_c=np.clip(warp.astype(np.float32)*gain,0,255)
out=full.astype(np.float32)*(1-alpha[...,None])+warp_c*alpha[...,None]
cv2.imwrite('work/composite.png',np.clip(out,0,255).astype(np.uint8))
cv2.imwrite('work/composite-alpha.png',(alpha*255).astype(np.uint8))
ys,xs=np.where(valid>0); print('VC region (composite px)',xs.min(),xs.max(),ys.min(),ys.max())
