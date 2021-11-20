# 1 - Spa Login Failed

This challenge was a typical JS client-side mangled code. The best approach is doing like John Hammond's virus analysis, beautify the code and break it down section by section. There are many ways to beautify, but in my opinion the easiest is going straight into the browser. In chromium:

```
DevTools > Source > /path/to/code.js
```

In the tab there is a `{}` button that will beautify for you. You can copy the result into a local JS file for analysis.

At the end of the file, we notice that there is a fetch for the `flag` input which is then checked:

```
j(0x129) == transf ? alert(j(0x130)) : alert(j(0x12d));
```

Given that checking the input gave a popup, we can safely assume that we are testing `j(0x129)`. We can check the value by running the code:

```
j(0x129) = {@8:?r=:6?E$:56xDt2DJ%@rC24<o974E7]42
```

We also noticed the `r()` method that seemed to reverse the operation. Therefore using it with the previous output gave us:

```
r("{@8:?r=:6?E$:56xDt2DJ%@rC24<o974E7]42") = LoginClientSideIsEasyToCrack@hfctf.ca
```

If we test the input again in the validator, we get a success message, which indicates that this was the flag.
