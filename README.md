# node-mongo



Create Procfile and add 
web: node services/auth.js & node services/files.js & node services/filmovi.js

heroku create
npm install http-proxy --save
https://codeforgeek.com/reverse-proxy-using-expressjs/

git status
git add Procfile config.jso services/proxy.js
git commit -am 'preparing for a heroku deployment'
git push heroku master
heroku logs --tail