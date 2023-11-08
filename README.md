
<div align="center">
<img width="20%" src="./public/logo.png ">

# 客家糕粿店 - 網站全端專案
</div>

> ⚠ 測試請同時下載前、後台資料包 : <br>
Frontend --> https://github.com/Jam-Peng/hakka_cake_shop_frontend <br>
Server --> https://github.com/Jam-Peng/hakka_cake_shop_server

###  Preview :

<table width="100%"> 
<tr>
<td width="50%">      
&nbsp; 
<br>
<p align="center">
  Backend | Login
</p>
<center>
<img src="./public/back_login.png">
</td>

<td width="50%">
<br>
<p align="center">
  Backend | Dashboard
</p>
<center>
<img src="./public/back_dashboard.png">
</td>
</tr>
</table>

#

## 設計動機
- 幫舅舅的客家手作糕點設計一個網路商店與後台管理系統。
- 使用 Django 撰寫 API 將前、後端做資料的整合與應用。
- <a href="https://drive.google.com/file/d/1MIN3X9e8rf6s-wNaw6T52tyrQcTn7GsT/view?usp=sharing" target="_blank">開啟線上完整專案介紹</a>


#
### 使用環境
- `JavaScript`。

---
### 使用技術
- 以 `React` 框架開發。
- 使用 `Tailwind CSS` 框架與手刻 `CSS` 進行切版。
- 使用 `React` 的 `createContext`，作為狀態管理工具。
- 透過 `echarts` 套件統計訂單資料其繪製成圖表。

### 使用套件
- `react`
- `react-dom`
- `react-router-dom`
- `react-icons`
- `Tailwind`
- `jwt-decode`
- `echarts`


## 如何執行 - `前、後台`
--> 使用 Zip 下載專案或使用下面的指令下載
```bash
git clone https://github.com/Jam-Peng/hakka_cake_shop_frontend

git clone https://github.com/Jam-Peng/hakka_cake_shop_backend
```

--> 進入前台資料包
```bash
cd frontend
```

--> 或進入後台資料包
```bash
cd backendend
```

--> 安裝專案需求 dependencies
```bash
npm install
```

--> 執行專案
```bash
npm run start
```

## 如何執行 - `伺服器`
--> 使用 Zip 下載專案或使用下面的指令下載
```bash
git clone https://github.com/Jam-Peng/hakka_cake_shop_server.git
```

--> 進入server資料包
```bash
cd server
```

--> 建立虛擬環境
```bash
conda create --name venv python=3.9
```

--> 執行虛擬環境
```bash
conda activate venv
```

--> 安裝套件
```bash
pip install -r requirements.txt
```

--> 數據庫遷移
```bash
python manage.py makemigrations
python manage.py migrate
```

--> 運行伺服器
```bash
python manage.py runserver
```
