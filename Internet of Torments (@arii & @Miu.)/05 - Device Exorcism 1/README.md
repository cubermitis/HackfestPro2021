# 05 - Device Exorcism 1

Like for HAUNTED, we are given a file with no extension `spookyIoTP2`. Given the description, we are trying to file a flag text. Given most of the text seems encrypted, maybe we are lucky and can find the flag using `strings`:

```
strings spookyIoTP2
```

This gives alot of result, we can filter for `hf` using `grep`:

```
strings spookyIoTP2 | grep hf
```

This gives the a few instances of what looks like a flag over and over. If we submit one copy starting with `hf`, we get the flag. (We should keep in mind how weird it was seeing the flag multiple times though).
