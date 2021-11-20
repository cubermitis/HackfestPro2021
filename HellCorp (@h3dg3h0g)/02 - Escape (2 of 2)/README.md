# 02 - Escape (1 of 2)

We get a pcap file containing a lot of encrypted wifi traffic and what appears to be a deauthentication attack to capture wifi traffic handshakes. We also get a wordlist that the challenge description says needs to be reversed.

I started by reversing the wordlist:
```console
$ rev ~/Downloads/rockyou_hellcorp.txt > ~/Downloads/rockyou_hellcorp_rev.txt
```

I then loaded the pcap file into wireshark. I then pressed `Wireless -> WLAN Traffic` to get the wireless traffic inspection window in wireshark. I was able to see that the HellCorp SSID was using now using WPA encryption which can be cracked with a word list.

I then started `aircrack-ng` using the pcap file and the reversed word list:

```console
$ aircrack-ng -w ~/Downloads/rockyou_hellcorp_rev.txt ~/Downloads/hellcorp_2.pcap
                              Aircrack-ng 1.6 

      [00:00:00] 13781/20174 keys tested (44025.16 k/s) 

      Time left: 0 seconds                                      68.31%

                       KEY FOUND! [ srekcahllehnitor ]


      Master Key     : D0 5C 66 B4 F8 28 EF 98 58 A8 16 3B A1 F0 B7 AB 
                       64 E0 EE 49 70 98 65 6E F0 4F F3 A3 14 D5 41 06 

      Transient Key  : 03 CD 44 79 64 AF 85 CB 9C 5F A9 3B BD F7 61 9C 
                       7E 86 9E 42 61 A2 75 F1 B7 59 02 1A 7B 17 07 C2 
                       20 42 3D 4F C8 D6 A0 6B 63 86 9A EA FF 44 54 A1 
                       EA 82 7B A0 F6 1D 76 07 B5 5C 60 51 EA 68 71 5D 

      EAPOL HMAC     : CB 20 09 D9 54 7B 50 18 02 FB 40 B7 1E 5E 38 63
```

We got the passphrase `srekcahllehnitor`. I loaded that into wireshark as a `wpa-pwd` using the `Edit -> Preferences -> IEEE 802.11` menu to get it to decrypt the traffic.

I then filtered the traffic by `ftp` protocol and immediately found an ftp transaction transferring a backup if the HellCrop wiki in a zip file! Since ftp is cleartext, I was able to recover the username `autobackup` and password `autobackup` as well as the whole zip file. I followed the TCP stream of the ftp transaction and saved it as a raw file to get the zip out of the pcap.

I then started extracting it. The zip was password protected and the password `autobackup` worked to extract it.

```console
$ unzip wiki_backup                               
Archive:  wiki_backup
   creating: migrations/
[wiki_backup] migrations/env.py password: autobackup
  inflating: migrations/env.py       
  inflating: migrations/alembic.ini  
 extracting: migrations/README       
  inflating: migrations/script.py.mako  
   creating: migrations/versions/
  inflating: migrations/versions/9d53acb7ea19_users_table.py  
  inflating: hellcorpwiki.py         
   creating: app/
  inflating: app/routes.py           
  inflating: app/forms.py            
   creating: app/templates/
  inflating: app/templates/how_to_escape_from_hell.html  
  inflating: app/templates/index.html  
  inflating: app/templates/base.html  
  inflating: app/templates/login.html  
  inflating: app/__init__.py         
  inflating: app/models.py           
 extracting: .flaskenv               
  inflating: hellcorpwiki.wsgi       
  inflating: config.py               
  inflating: requirements.txt        
  inflating: app.db                  
  inflating: automated_backup.sh  
```

I then grepped for the flag:
```console
$ rg HF- .                                     
[...]
./app/templates/how_to_escape_from_hell.html
10:        HF-B545032E743874E554A73B2721E18C24
```

🚩