import urllib.request
import json

def get_unsplash_id(query):
    try:
        url = f"https://unsplash.com/napi/search/photos?query={query}&per_page=1"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            return data['results'][0]['id']
    except Exception as e:
        return str(e)

print("Laptop Stand:", get_unsplash_id("laptop%20stand"))
print("USB Cable:", get_unsplash_id("usb%20cable"))
print("Python Book:", get_unsplash_id("python%20book"))
