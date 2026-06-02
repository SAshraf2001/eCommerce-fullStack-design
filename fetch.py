import urllib.request
import json

try:
    req = urllib.request.Request("https://ecommerce-fullstack-design-wfp9.onrender.com/api/products/featured/", headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        html = response.read()
        print("DATA:", html.decode('utf-8'))
except Exception as e:
    print("ERROR:", str(e))
    if hasattr(e, 'read'):
        print(e.read().decode('utf-8'))
