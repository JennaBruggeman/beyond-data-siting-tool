import json,os,shutil
S='/tmp/claude-0/-home-claude/82c630bc-5b47-5e5a-a9e1-cf3abcc90b3b/scratchpad/v6/'
for nm,src in [('intro','src_intro'),('demo','src_demo')]:
    K=json.load(open(S+nm+'.knots.json')); fr=sorted(os.listdir(S+src)); os.makedirs(S+nm,exist_ok=True)
    def warp(t):
        for i in range(1,len(K)):
            if t<=K[i][0]:
                a,b=K[i-1];c,d=K[i]; return b+(d-b)*(t-a)/max(1e-6,c-a)
        return K[-1][1]
    for n in range(round(K[-1][0]*30)):
        shutil.copy(S+src+'/'+fr[min(len(fr)-1,int(round(warp(n/30)*30)))],S+nm+'/f%05d.jpg'%n)
print('vidwarp ok')
