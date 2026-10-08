import json, urllib.request, urllib.error
class NoRedirect(urllib.request.HTTPRedirectHandler):
 def redirect_request(self,*args): return None
opener=urllib.request.build_opener(NoRedirect)
def get(path,headers={}):
 try: r=opener.open(urllib.request.Request('http://localhost:3128'+path,headers=headers))
 except urllib.error.HTTPError as e:r=e
 return r.status,{k.lower():v for k,v in r.headers.items()},r.read().decode()
results=[]
for path,headers,expected in [('/',{'Accept-Language':'es-CO'},307),('/',{'Accept-Language':'en-US','x-vercel-ip-country':'CO'},200),('/',{'Cookie':'em_lang=en','Accept-Language':'es'},200),('/',{'Cookie':'em_lang=es'},307),('/',{'User-Agent':'Googlebot','Accept-Language':'es'},200),('/pricing',{'Accept-Language':'es'},200)]:
 status,h,b=get(path,headers);assert status==expected,(path,status,expected)
 if path=='/':
  assert 'Accept-Language' in h.get('vary',''),h
  assert 'no-store' in h.get('cache-control',''),h
 results.append({'path':path,'headers':headers,'status':status,'vary':h.get('vary')})
for en,es in [('starter','arranque'),('growth','crecimiento'),('local-presence','presencia-local'),('all-in','todo-incluido')]:
 for path in ['/pricing/'+en,'/es/precios/'+es]:
  status,h,b=get(path);assert status==200,(path,status)
  assert 'hrefLang="en-US"' in b and 'hrefLang="es-US"' in b
  assert '/pricing/'+en in b and '/es/precios/'+es in b
  results.append({'path':path,'status':status,'hreflang':True})
open('.ai/evidence/http-results.json','w').write(json.dumps(results,indent=2))
print('HTTP language behaviour and all package routes: PASS')
