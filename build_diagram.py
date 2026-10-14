# Assemble workflow-map.html from the template, the diagram data and the workflow view script.
import os
h=os.path.dirname(os.path.abspath(__file__))
t=open(os.path.join(h,'diagram_template.html'),encoding='utf-8').read()
t=t.replace('/*DATA*/',open(os.path.join(h,'diagram_data.json'),encoding='utf-8').read())
t=t.replace('/*WORKFLOW*/',open(os.path.join(h,'workflow_view.js'),encoding='utf-8').read())
open(os.path.join(h,'workflow-map.html'),'w',encoding='utf-8').write(t)
print('built workflow-map.html',len(t))
