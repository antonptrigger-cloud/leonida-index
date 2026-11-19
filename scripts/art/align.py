import cv2, numpy as np, json
full=cv2.imread('full-orig.jpg'); vc=cv2.imread('vc-orig.jpg')
def prep(im,scale=1.0):
    g=cv2.cvtColor(im,cv2.COLOR_BGR2GRAY)
    if scale!=1: g=cv2.resize(g,None,fx=scale,fy=scale,interpolation=cv2.INTER_AREA)
    return cv2.createCLAHE(2.0,(8,8)).apply(g)
best=None
sift=cv2.SIFT_create(nfeatures=20000, contrastThreshold=0.02)
kf,df=sift.detectAndCompute(prep(full),None)
for s in [0.35,0.45,0.55,0.7,0.9]:
    kv,dv=sift.detectAndCompute(prep(vc,s),None)
    m=cv2.BFMatcher().knnMatch(dv,df,k=2)
    good=[a for a,b in m if a.distance<0.8*b.distance]
    if len(good)<8: print(s,'few',len(good)); continue
    src=np.float32([kv[g.queryIdx].pt for g in good])/s
    dst=np.float32([kf[g.trainIdx].pt for g in good])
    H,inl=cv2.findHomography(src,dst,cv2.RANSAC,4.0)
    n=int(inl.sum()); print(s,len(good),n)
    if best is None or n>best[0]: best=(n,H,s)
n,H,s=best; print('best',n,s); print(H)
# also similarity estimate
corners=np.float32([[0,0],[1840,0],[1840,1072],[0,1072]]).reshape(-1,1,2)
print(cv2.perspectiveTransform(corners,H).reshape(-1,2))
json.dump(H.tolist(),open('work/H.json','w'))
