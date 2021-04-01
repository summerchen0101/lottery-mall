#!/bin/bash

#環境變數
export API_BASE_URL=https://mall-api.ms5149514.com
#安裝套件
npm i
#編譯
npm run build
#啟動
/home/laradock/.nvm/versions/node/v13.13.0/bin/pm2 restart "lottery-mall-mobile"