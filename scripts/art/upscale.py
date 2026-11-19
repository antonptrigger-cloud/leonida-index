#!/usr/bin/env python3
"""Real-ESRGAN (realesr-general-x4v3, SRVGGNetCompact) x4 upscaler on CPU, tiled. No basicsr dependency.
usage: upscale.py in.jpg out.png [--tile 128] [--pad 10]"""
import os
import sys, numpy as np, torch, torch.nn as nn
from PIL import Image
class SRVGG(nn.Module):
    def __init__(s, nf=64, nconv=32, up=4):
        super().__init__(); s.up=up
        s.body=nn.ModuleList([nn.Conv2d(3,nf,3,1,1), nn.PReLU(num_parameters=nf)])
        for _ in range(nconv): s.body += [nn.Conv2d(nf,nf,3,1,1), nn.PReLU(num_parameters=nf)]
        s.body.append(nn.Conv2d(nf,3*up*up,3,1,1)); s.shuf=nn.PixelShuffle(up)
    def forward(s,x):
        o=x
        for l in s.body: o=l(o)
        return s.shuf(o)+nn.functional.interpolate(x,scale_factor=s.up,mode='nearest')
def load(w):
    m=SRVGG(); sd=torch.load(w,map_location='cpu'); sd=sd.get('params',sd); m.load_state_dict(sd,strict=True); return m.eval()
def run(m,img,tile=128,pad=10):
    x=torch.from_numpy(np.asarray(img.convert('RGB'),dtype=np.float32)/255).permute(2,0,1)[None]
    _,_,H,W=x.shape; out=torch.zeros(1,3,H*4,W*4)
    with torch.no_grad():
        for y in range(0,H,tile):
            for xx in range(0,W,tile):
                y0,x0=max(0,y-pad),max(0,xx-pad); y1,x1=min(H,y+tile+pad),min(W,xx+tile+pad)
                o=m(x[:,:,y0:y1,x0:x1])
                ys,xs=(y-y0)*4,(xx-x0)*4; h,w=min(tile,H-y)*4,min(tile,W-xx)*4
                out[:,:,y*4:y*4+h,xx*4:xx*4+w]=o[:,:,ys:ys+h,xs:xs+w]
    a=(out[0].clamp(0,1).permute(1,2,0).numpy()*255).round().astype(np.uint8)
    return Image.fromarray(a)
if __name__=='__main__':
    torch.set_num_threads(8)
    m=load(os.path.join(os.environ.get('LVG_WEIGHTS','weights'),'realesr-general-x4v3.pth'))
    run(m,Image.open(sys.argv[1])).save(sys.argv[2]); print('ok')
