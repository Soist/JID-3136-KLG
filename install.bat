@ECHO OFF
ECHO [INFO] Starting respository download.
git clone https://github.com/AndrewLi8779/JDF-3136-KLG.git
ECHO [INFO] Download complete.
cd JDF-3136-KLG
ECHO [INFO] Starting package installation.
npm install
ECHO [INFO] Installation complete.
ECHO [INFO] Setup complete.
PAUSE