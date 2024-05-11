@echo off
for /R wav %%a in (*.wav) do (
rem echo %%a
rem echo %%~da
rem echo %%~pa
rem echo %%~na
rem echo %%~xa
rem echo %%~za
rem echo %%~ta
rem echo %%~dpa
rem echo %%~nxa
rem echo %%~pnxa
rem echo %%~dpna
rem echo %%~dpnxa
ffmpeg -i "%%a" -ab 128k -map_metadata 0 "mp3/%%~na."mp3
del /F /S  /Q "%%a"
)
pause