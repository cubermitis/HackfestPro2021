# 01 - HAUNTED

This challenge was an extensionless file. From the track name, we would expect some type of ROM or equivalent. We can confirm our hypothesis by checking the raw file. We see a magic number `MIPS OpenWrt Linux-4.14.81`. If we look online, we see that OpenWTF is a Linux OS for embedded system. This is often used for routers. We can try to dump the contents using `binwalk`:

```
binwalk -e spookyIoTP1
```

This tool will try finding common files "hidden" in a file. The tool finds a SquashFS. If you have `unsquash` or equivalent, binwalk will automatically dump the contents. You can also manually decompress the file:

```
unsquash 18A1E6.squashfs
```

If you look at the root of the Linux FS, you'll find a `boo` file which contains the flag.
