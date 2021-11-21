# 03 - Tricks

This challenge uses the decompressed FS from HAUNTED. Given the description of the challenge, we thought that the challenge was flashing lights on the actual device (could be an interesting challenge for the future?). We investigated the ROM and found interesting `led` drivers. This said, after some research, we determined that most of the OS was vanilla. 

We backtracked to the website we found in `/www`. We figured after a while that the hint was probably referring to the changing colors of the background due to `/www/OnionOS/static/app.blink.css`:

```css
    0% {
      background: #543465;
    }
    15% {
      background: #736543;
    }
    30% {
      background: #306c30;
    }
    45% {
      background: #727368;
    }
    60% {
      background: #f97274;
    }
    75% {
      background: #696e67;
    }
    90% {
       background: #6d7945;
    }
    100% {
       background: #794573;
    }
```

If we convert the hex values to ASCII using a tool like `CyberChef`, we get an l33t text. If we add the `HF-` header, this is our flag.
