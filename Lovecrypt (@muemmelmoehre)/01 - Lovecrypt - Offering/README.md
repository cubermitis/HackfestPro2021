# 01 - Lovecrypt - Offering

This challenge opens up to a website. It seems to be a cult around `Cthulhu`. The links of the page points to various resources, one of which is the `Nug-Soth` alphabet. We can try to base64 decode the string at the end of the page using `CyberChef`. This gives pure mess, therefore we can't directly translate from the alphabet. We can try looking at the contents of the website. 

If we open devtools, we see that there is comment script. From the syntax, it appears to be a cipher of a Python script. Given the mention of the alphabet, we thought it could be based off of that. This said, there was no tools that allowed to easily convert it. Given we could guess the decrypted text in sections (given we knew it's Python), we could try to do a substiution:

```python
# script.enc is the Python script from the webpage.
import open("script.enc") as h:
    scr = h.read()

enc = "vzcbeg onfr64|vs __anzr__ == \"__znva__\""
dec = "import base64|if __name__ == \"__main__\""

dec_dict = {}
for e, d in zip(enc, dec):
    dec_dict[e] = d

raw = ""
for c in scr:
    if c in dec_dict:
        raw += dec_dict[c]
    else:
        raw += c

print(raw)
```

During the competition, we wrote something similar to the prior but saw that some characters didn't map correctly. Given at this point we really thought it could still be the `Nug-Soth` alphabet, we attempted to search a random snippet of the text: `clguba`. This was mostly luck because this gave the following Tweet: https://twitter.com/esolangs/status/1092457775198801921. ROT13, how could we have overlooked it..? If we put the Python script in `CyberChef`, we get the raw Python script.

The Python script contains an `encrypt` method, which points us towards having to write a `decrypt` method. This is a fairly simple and reversible algorithm (well, if you don't forget to decode from UTF8):

```python
def decrypt(payload):
    unb64 = base64.b64decode(payload).decode()

    key = "r'lyeh" * 13
    key = key[:len(unb64)]

    secret = "nyarlathotep"
    forbidden_chars = []
    for letter in secret:
        if letter not in forbidden_chars:
            forbidden_chars.append(letter)

    data = []
    for b, k in zip(unb64, key):
        x = ord(b) ^ ord(k)
        d = x >> 2

        if d in [ord(c) - 13 for c in forbidden_chars]:
            d += 13

        data.append(d)
    data = data[::-1]

    return bytes(data).decode('utf-8')
```

If we pass the `base64` on the website, we get the flag.
