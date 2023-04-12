1. Khởi tạo project : npm init
name: là tên project
version: 1.0.0
main server.js
keywords: fullstack nodejs express
author: SPG-One

2. Cài đặt package

"body-parser" : "^1.19.0",   // hỗ trợ viết API
"dotenv": "^8.2.0",          // Lấy các tham số khai báo trong file .env vd process.env
"ejs":"^3.1.5",              // view-engine 
"express":"^4.17.1"          // frame work

--> npm install body-parser@1.19.0 dotenv@8.2.0 ejs@3.1.5 express@4.17.1

"@babel/core":"^7.12.10",         //  3 cái package đầu tiên chính là trình compiler của nodejs
"@babel/node":"^7.12.10",         //
"@babel/preset-env":"^7.12.11"    //
"nodemon":"^2.0.7"                // Mỗi khi thay đổi file thì server sẽ tự động restart mà không cần nhập câu lệnh để restart

--> npm install --save-dev @babel/core@7.12.10 @babel/node@7.12.10 @babel/preset-env@7.12.10 nodemon@2.0.7
   
thêm file và folder vào thư mục gốc

thêm dòng này: "start": "nodemon --exec babel-node src/server.js"
vào sau "test" của "scripts"(sau dòng 7)

src > config > viewEngine.js
    > controllers
    > public
    > route > web.js
    > services
    > viwes
    > server.js
.babelrc   // cấu hình trình biên dịch
.env       // file môi trường --> Không đưa lên github
.env.example  // giống hệt file .env chỉ là các tham số không có giá trị --> file này đưa lên github thay thế file .env
.gitignore   // nơi các thư mục hoặc file không được đưa lên github

3. Cài đặt sequelize và sequelize-cli là thư viện ORM để kết nối với Database MySql
- Tại thư mục root tạo file .sequelizerc với nội dung sau:

const path = require('path');
module.exports = {
    'config': path.resolve('./src/config', 'config.json'),   // điều hướng file config.json vào trong folder ./src/config --> Cấu hình 
                                                             // làm sao để kết nối với database
    'migrations-path': path.resolve('./src', 'migrations'),  // điều hướng folder migrations vào ./src       --> Tạo các bảng trong database
    'models-path': path.resolve('./src', 'models'),          // điều hướng models vào ./src   --> Tạo model trong mô hình MVC
    'seeders-path': path.resolve('./src', 'seeders')         // điều hướng seesers vào ./src  --> Tạo dữ liệu face cho mình
}

- Cài đặt sequelize ở đây version: 6.6.2 tại root
  npm install --save sequelize@6.6.2
- Cài đặt sequelize-cli ở đây version 6.2.0 tại root
  npm install --save-dev sequelize-cli@6.2.0
- Khởi tạo sequelize bằng câu lệnh tại root
  npx sequelize-cli init
- Cài đặt mysql2 version 2.2.5 tại root
  npm install --save mysql2@2.2.5

- Tạo một cơ sở dữ liệu mới trên phpmyadmin vd test(không tạo bảng)
- Kết nối và render 1 bảng mẫu như sau
  npx sequelize-cli db:migrate
