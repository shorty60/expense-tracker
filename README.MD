# 天天來記帳

使用者可以使用這個簡單的記帳應用程式來追蹤自己的支出

## Features 功能描述

- 使用者可以選擇註冊我們的網站或是使用google、FB註冊和登入
- 使用者登入後可以看到自己的支出明細
- 使用者可以依照類別來檢視自己哪個類別支出最多
- 使用者可以新增、編輯和刪除支出紀錄



## Screen Photos 專案畫面

#### 登入

![登入](https://github.com/shorty60/expense-tracker/blob/main/public/images/login.jpg)

#### 首頁

![首頁](https://github.com/shorty60/expense-tracker/blob/main/public/images/index.jpg)

#### 編輯

![詳細資料](https://github.com/shorty60/expense-tracker/blob/main/public/images/edit.jpg)

## Getting Started 開始

### Prerequisites 環境建置與需求

如果您是 windows 使用者，但尚未安裝 git bash，請先安裝 git bash 以進行下面指令列操作

- [git](https://git-scm.com/) - click 'Download for windows'

### Installing 專案安裝

1.開啟您的終端機(Terminal)或 git-bash(for Windows) 將此專案 clone 到本機位置並執行:

```
git clone https://github.com/shorty60/expense-tracker.git
```

2.移動至專案資料夾

```
cd expense-tracker 
```

3.安裝專案 npm 套件

```
npm install  //安裝套件
```

4.設定環境變數，請參考.env.example範例新增一個.env檔案

```
MONGODB_URI = mongodb://localhost/expense-tracker
SECRET="UYE&uo(#&%7"
FACEBOOK_APP_ID=SKIP
FACEBOOK_APP_SECRET=SKIP
FACEBOOK_CALLBACK="http://localhost:3000/auth/facebook/callback"
GOOGLE_CLIENT_ID=SKIP
GOOGLE_CLIENT_SECRET=SKIP
GOOGLE_CALLBACK="http://localhost:3000/auth/google/callback"
PORT = 3000

```

5.寫入種子資料

```
npm run seed
```

6.開啟程式

```
npm run start  //執行程式
```

7.若終端機(for Mac OS)或 git bash(for windows)顯示

```
Expense tracker is listening on http://localhost:3000
```

即啟動完成，請至[http://localhost:3000](http://localhost:3000)開啟網站

8.可使用下面兩個使用者帳號測試

```
User1
email: father@example.com
password: 12345678
-----

User2
email: shin@example.com
password: 12345678

```

9.中斷伺服器連線，請按

```
ctrl + c
```

## Built With 開發環境及套件

- [Node.js](https://nodejs.org/zh-tw/download/) - 版本 16.17.0
- [Express](https://www.npmjs.com/package/express) - Node.js Web 應用程式架構，版本 4.16.4
- [Mongoose](https://mongoosejs.com/) - MongoDB ODM，版本 6.6.3

## Authors 開發人員

- [開發者](https://github.com/shorty60) - Shorty Lin
