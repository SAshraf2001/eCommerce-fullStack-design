import urllib.request

try:
    req = urllib.request.Request("https://ecommerce-fullstack-design-wfp9.onrender.com/", headers={'User-Agent': 'Mozilla/5.0'})
    with urllib.request.urlopen(req) as response:
        pass
except Exception as e:
    print(e.headers)
