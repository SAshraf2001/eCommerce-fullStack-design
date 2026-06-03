import urllib.request

urls = [
    "https://images.unsplash.com/photo-1498050108023-c5249f4df085?w=500&q=80", # web dev
    "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=500&q=80", # python
    "https://images.unsplash.com/photo-1495474472205-51f750c07c47?w=500&q=80", # coffee
]

for url in urls:
    try:
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req)
        print("OK:", url)
    except Exception as e:
        print("FAIL:", url, str(e))
