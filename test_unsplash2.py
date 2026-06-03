import urllib.request

urls = {
    2: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46", # laptop stand (Wait, this is keyboard/mouse)
    2.1: "https://images.unsplash.com/photo-1516321497487-e288fb19713f", # Laptop
    4: "https://images.unsplash.com/photo-1613524673199-a1fc16cc07ac", # USB cable? (404?)
    4.1: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0", # Cable
    10: "https://images.unsplash.com/photo-1495474472205-51f750c07c47", # Coffee maker 404
    10.1: "https://images.unsplash.com/photo-1517686469429-8bdb88b9f907", # Dough
    10.2: "https://images.unsplash.com/photo-1520004434532-668416a08753", # Coffee?
    10.3: "https://images.unsplash.com/photo-1509042239860-f550ce710b93", # Coffee maker?
}

for k, url in urls.items():
    try:
        req = urllib.request.Request(url + "?w=500&q=80", headers={'User-Agent': 'Mozilla/5.0'})
        res = urllib.request.urlopen(req)
        print("OK:", k, url)
    except Exception as e:
        pass
