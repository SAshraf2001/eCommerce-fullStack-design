import urllib.request
import json

def get_wiki_image(query):
    try:
        url = f"https://en.wikipedia.org/w/api.php?action=query&prop=pageimages&format=json&piprop=original&titles={query}"
        req = urllib.request.Request(url, headers={'User-Agent': 'Mozilla/5.0'})
        with urllib.request.urlopen(req) as response:
            data = json.loads(response.read().decode('utf-8'))
            pages = data['query']['pages']
            for page_id in pages:
                if 'original' in pages[page_id]:
                    return pages[page_id]['original']['source']
        return "No image"
    except Exception as e:
        return str(e)

print("Laptop Stand:", get_wiki_image("Laptop"))
print("USB Cable:", get_wiki_image("USB-C"))
print("Python Book:", get_wiki_image("Python_(programming_language)"))
