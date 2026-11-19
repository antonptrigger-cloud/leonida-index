"""Remove baked-in (garbled AI) labels, scale bar and watermarks from the owner's art by OpenCV inpainting.
Boxes are in source-image pixels. Writes work/full-clean.png and work/vc-clean.png and a mask preview."""
import os
import cv2, numpy as np
import onnxruntime as ort
_LAMA=None
def lama(img, mask):
    """LaMa (Carve/LaMa-ONNX, 512x512 windows at source resolution). Only masked pixels are replaced."""
    global _LAMA
    if _LAMA is None: _LAMA=ort.InferenceSession(os.path.join(os.environ.get('LVG_WEIGHTS','weights'),'lama_fp32.onnx'),providers=['CPUExecutionProvider'])
    H,W=mask.shape; out=img.copy(); todo=mask>0
    while todo.any():
        ys,xs=np.where(todo); cy,cx=int(ys[0]),int(xs[0])
        y0=min(max(0,cy-60),H-512); x0=min(max(0,cx-200),W-512)
        win=img[y0:y0+512,x0:x0+512][:,:,::-1].astype(np.float32)/255
        mw=(mask[y0:y0+512,x0:x0+512]>0).astype(np.float32)
        r=_LAMA.run(None,{'image':win.transpose(2,0,1)[None],'mask':mw[None,None]})[0][0]
        r=np.clip(r.transpose(1,2,0),0,255) if r.max()>2 else np.clip(r.transpose(1,2,0)*255,0,255)
        sel=mw>0; ow=out[y0:y0+512,x0:x0+512]; ow[sel]=r[:,:,::-1][sel].astype(np.uint8)
        todo[y0:y0+512,x0:x0+512]&=~sel
    return out
K=lambda n: cv2.getStructuringElement(cv2.MORPH_ELLIPSE,(n,n))
def mask_box(img, box, mode, t=22, grow=2):
    x0,y0,x1,y1=box; roi=img[y0:y1,x0:x1]
    g=roi.min(axis=2)
    if mode=='white':
        mx=roi.max(axis=2).astype(int); m=(g>t)&((mx-g)<90)
    elif mode=='text':
        m=(cv2.morphologyEx(g,cv2.MORPH_TOPHAT,K(9))>t)
    elif mode=='textdark':  # text brighter OR darker than surroundings
        m=(cv2.morphologyEx(g,cv2.MORPH_TOPHAT,K(9))>t)|(cv2.morphologyEx(g,cv2.MORPH_BLACKHAT,K(9))>t+10)
    elif mode=='diff':  # flat background: anything that deviates from the median colour
        med=np.median(roi.reshape(-1,3),axis=0); d=np.abs(roi.astype(int)-med).sum(2); m=d>t
    elif mode=='rect':
        m=np.ones(g.shape,bool)
    m=m.astype(np.uint8)*255
    if grow: m=cv2.dilate(m,K(2*grow+1))
    out=np.zeros(img.shape[:2],np.uint8); out[y0:y1,x0:x1]=m; return out
def auto_water_text(img, exclude):
    """Small light glyph clusters on deep-blue water (street/district labels, grid numbers)."""
    b,g,r=[img[:,:,i].astype(int) for i in range(3)]
    water=cv2.dilate(((b-r>70)&(b>150)).astype(np.uint8),K(15))>0   # blue-dominant surroundings
    mn=img.min(axis=2)
    mxc=img.max(axis=2).astype(int)
    th=(cv2.morphologyEx(mn,cv2.MORPH_TOPHAT,K(9))>40)&(mn>165)&((mxc-mn)<50)&(img[:,:,0].astype(int)>=img[:,:,2].astype(int)-15)
    cand=(th&water).astype(np.uint8)
    n,lab,st,_=cv2.connectedComponentsWithStats(cand,connectivity=8)
    m=np.zeros(img.shape[:2],np.uint8)
    for i in range(1,n):
        x,y,w,h,a=st[i]
        if 2<=a<=400 and w<=60 and h<=30: m[lab==i]=255
    m=cv2.dilate(m,K(5)); m[exclude>0]=0
    return m
def run(src,out,boxes):
    img=cv2.imread(src); mask=np.zeros(img.shape[:2],np.uint8)
    for b in boxes: mask|=mask_box(img,*b)
    res=lama(img,mask)
    cv2.imwrite(out,res); cv2.imwrite(out.replace('.png','-mask.png'),mask)
    print(out,int((mask>0).sum()),'masked px'); return img,mask,res
FULL=[((452,350,666,372),'rect'),((238,520,302,541),'rect'),((500,1234,616,1262),'rect'),((386,1192,436,1212),'rect'),
      ((468,1445,572,1471),'rect'),((880,1556,1196,1640),'diff',30)]
VC=[((1258,303,1402,355),'rect'),   # VICE CITY (MIAMI)
    ((1476,308,1560,334),'rect'),   # VICE BEACH + garbled sub label
    ((1448,298,1472,314),'rect'),((1458,316,1486,328),'rect'),((1464,328,1488,342),'rect'),((1452,348,1480,364),'rect'),
    ((284,1046,382,1072),'rect'),   # WATSON BAY
    ((1370,609,1420,631),'rect'),((1358,718,1412,744),'rect'),((1376,285,1456,302),'rect'),
    ((1245,184,1310,202),'rect'),((1385,458,1425,474),'rect'),((1230,420,1285,440),'rect'),
    ((1617,988,1840,1072),'diff',30)]
# grid-line coordinate numbers sit just right of / above each vertical-horizontal grid crossing
GX=[85,254,423,593,762,932,1102,1270,1441,1610,1779]; GY=[118,288,457,627,797,966]
VC+=[((x+1,y-13,x+24,y-1),'rect') for x in GX for y in GY]
FULL+=[((829,309,857,324),'rect'),((707,474,737,488),'rect'),((366,287,405,301),'rect')]
if __name__=='__main__':
    import sys
    import sys
    which=sys.argv[1] if len(sys.argv)>1 else 'full'
    if which=='full': run('full-orig.jpg','work/full-clean.png',FULL)
    else: run('vc-orig.jpg','work/vc-clean.png',VC)
