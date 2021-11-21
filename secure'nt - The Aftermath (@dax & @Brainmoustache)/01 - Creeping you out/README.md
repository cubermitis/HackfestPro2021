# 01 - Creeping you out

This challenge was pretty cryptic. We discovered after looking at the website for a while that the glitched images contained random characters. This seemed to indicate that they were flags. There didn't seem to be an order on the page itself. If we look into Devtools `webpack://compontents/Index.vue`, we find the following array:

```python
files = [
    "/images/glitch/twelve.png",
    "/images/glitch/service2.png",
    "/images/glitch/cert3.png",
    "/images/glitch/cert1.png",
    "/images/glitch/cert2.png",
    "/images/glitch/cert4.png",
    "/images/glitch/cert5.png",
    "/images/glitch/cert6.png",
    "/images/glitch/cert7.png",
    "/images/glitch/cert8.png",
    "/images/glitch/cert9.png",
    "/images/glitch/cert10.png",
    "/images/glitch/cert11.png",
    "/images/glitch/cert12.png",
    "/images/glitch/adblock.png",
    "/images/glitch/ds9.png",
    "/images/glitch/oaa.png",
    "/images/glitch/starfleet.png",
    "/images/glitch/service1.png",
    "/images/glitch/service3.png",
    "glitch20",
    "glitch21",
    "glitch22",
    "glitch23",
    "K",
    "Y",
    "glitch26",
    "glitch27",
    "glitch28",
    "F",
]
```

This array ended up being the order for the text. For the images, we could easily read off the text from the files. The `glitch` tags were not clear how to solve. After a while of looking, we saw a reference of `glitch` in the `webpack://components/index/*.vue`. There were two types of `glitch`:

```css
.glitch21 {
  font-family: "6";
}
```

and

```css
.glitch27 {
  left: 0;
  bottom: 0;
  height: 40px;
  width: 100%;
  background-color: var(--P);
}
```

We can read off the letters of the prior (and not do the mistake we did of trying to get the hex values). For simplicity, we created a conversion table:

```python
data = {
    "adblock.png": "11",
    "cert1.png": "J",
    "cert2.png": "13",
    "cert3.png": "-",
    "cert4.png": "W",
    "cert4.png": "W",
    "cert5.png": "5",
    "cert6.png": "M",
    "cert7.png": "31",
    "cert8.png": "N",
    "cert9.png": "C",
    "cert10.png": "K",
    "cert11.png": "S",
    "cert12.png": "22",
    "ds9.png": "10",
    "oaa.png": "9",
    "service1.png": "1",
    "service2.png": "F",
    "service3.png": "8",
    "starfleet.png": "E",
    "twelve.png": "H",
    "K": "K",
    "Y": "Y",
    "F": "F",
    "glitch20": "W",
    "glitch21": "6",
    "glitch22": "E",
    "glitch23": "U",
    "glitch26": "Q",
    "glitch27": "P",
    "glitch28": "T",
}
```

We can translate the previous data using the following script:

```python
dec = ""
for url in files:
    dec += data[url.split('/')[-1]]
print(dec)
```
