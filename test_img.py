import urllib.request

try:
    url = "https://loremflickr.com/400/400/laptop"
    req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
    response = urllib.request.urlopen(req)
    print("URL returned:", response.geturl())
except Exception as e:
    print(e)
