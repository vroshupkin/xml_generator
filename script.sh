@ -0,0 +1,17 @@
#!/bin/bash

# ИСПОЛЬЗОВАТЬ WSL

sudo apt install p7zip-full 

7z x ./libs.7z
7z x ./wx_lib.7z


[ ! -d "./x64" ] && mkdir x64
 cp ./wx_lib/lib/vc14x_x64_dll/wxbase32ud_vc14x_x64.dll ./x64/ 
 cp ./wx_lib/lib/vc14x_x64_dll/wxmsw32ud_core_vc14x_x64.dll ./x64/ 
 cp ./libs/FreeImage.dll ./x64 
 cp ./libs/potrace.exe ./x64 
