from IPython.display import HTML
from dolo import yaml_import

def process(txt):
    # model = yaml_import(None, txt=txt)
    # s = model._repr_html_()
    try:
        s = yaml_import(None, txt=txt, check_only=True)
        s = "<div>"+s+"</div>"
    except:
        s = "Failed"
    return HTML(s)