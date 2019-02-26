# sticker-server
Server-side sticker recorder.

(Tomcat configuration may not be necessary)

## Set Up Tomcat
- Please carefully read the following instructions and set up tomcat in your instance
  - https://grape.ics.uci.edu/wiki/public/wiki/cs122b-2018-spring-project1-install-tomcat-on-aws

## Set Up Sticker Server
- After successfully setting up tomcat in your instance, please change the current directory into **/webapps** inside **/tomcat**
- Then git clone this repository inside **/webapps** folder
- Chang your directory into **/sticker-server** 
- Please check out https://github.com/GoogleChrome/puppeteer/blob/master/docs/troubleshooting.md
    - To see if all dependencies for puppeteer is installed, which are listed on the top of the page
    - If not, please install all dependencies for puppeteer first
- Then run **npm install** inside **/sticker-sever** to install all required node modules.
- Then go into **/bin** folder inside **/sticker-server**, **chmod +x www** to make script **www** executable

## Run the Sticker Server with Tomcat
- (**Must**)Change your directory into **/bin** folder inside **/sticker-server**
- Run script **./www**
  - test functionality by sending request to **http://(IP address of your instance):(port used by sticker server)/clock?m=10** on your local machine's browser

## Run the Sticker Server Background Without Ternimation After exiting the Instance
- Use **nohup ./www &** to start the server
- Use **kill $(ps aux | grep node | grep www | awk '{print $2}')** to kill the process
