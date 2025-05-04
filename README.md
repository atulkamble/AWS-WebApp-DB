Here’s a complete **AWS Web App with Database Connectivity Project** setup — including steps, architecture, and code.

---

## ✅ **Project Title:**

**WebApp with MySQL DB Connectivity on AWS (Node.js + Express + MySQL)**

---

## 📌 **Overview:**

Deploy a full-stack Node.js web application with MySQL database on **AWS EC2** using **Nginx** as a reverse proxy and **PM2** as a process manager. The app performs CRUD operations connected to a MySQL database hosted on **RDS**.

---

## 🧱 **Architecture Overview:**

```
Client ⇨ Nginx ⇨ Node.js (Express App) ⇨ RDS (MySQL)
                 ⇧          ⇩
             EC2 Instance (Ubuntu/Amazon Linux)
```

---

## 🚀 **Implementation Steps:**

### 1️⃣ Provision AWS Infrastructure

* **Launch EC2 Instance** (Ubuntu or Amazon Linux)
* **Create RDS MySQL Instance**
* Open security group ports:

  * EC2: `22`, `80`
  * RDS: `3306` (only allow EC2's IP)

---

### 2️⃣ Install Dependencies on EC2

```bash
sudo apt update && sudo apt install -y nodejs npm mysql-client nginx
sudo npm install -g pm2
```

---

### 3️⃣ Sample Node.js + Express App Code

📁 `app.js`

```js
const express = require('express');
const mysql = require('mysql2');
const app = express();
app.use(express.json());

const db = mysql.createConnection({
  host: 'your-rds-endpoint',
  user: 'admin',
  password: 'yourpassword',
  database: 'myappdb'
});

db.connect(err => {
  if (err) throw err;
  console.log('Connected to DB');
});

app.get('/', (req, res) => {
  res.send('Welcome to WebApp!');
});

app.get('/users', (req, res) => {
  db.query('SELECT * FROM users', (err, results) => {
    if (err) throw err;
    res.json(results);
  });
});

app.listen(3000, () => console.log('Server running on port 3000'));
```

📁 `package.json`

```json
{
  "name": "aws-webapp",
  "version": "1.0.0",
  "main": "app.js",
  "scripts": {
    "start": "node app.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "mysql2": "^3.2.0"
  }
}
```

Install:

```bash
npm install
pm2 start app.js
```

---

### 4️⃣ Setup MySQL Database on RDS

```sql
-- Run this on RDS via MySQL Workbench or CLI
CREATE DATABASE myappdb;
USE myappdb;

CREATE TABLE users (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(100)
);

INSERT INTO users (name) VALUES ('Atul'), ('John Doe');
```

---

### 5️⃣ Setup Nginx as Reverse Proxy

```bash
sudo nano /etc/nginx/sites-available/default
```

Replace contents with:

```nginx
server {
    listen 80;
    server_name your-ec2-public-ip;

    location / {
        proxy_pass http://localhost:3000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
    }
}
```

Restart:

```bash
sudo systemctl restart nginx
```

---

## ✅ **Test App:**

Open `http://<EC2-Public-IP>/users` — you should get JSON list of users from RDS.

---

## 🗃️ Optional: Host Code on GitHub

```bash
git init
git remote add origin https://github.com/yourname/aws-webapp-mysql.git
git push -u origin main
```

---

## 🧪 Additional Enhancements:

* Add Docker support and deploy using ECS
* Add SSL via Let's Encrypt
* Add CI/CD via CodePipeline or GitHub Actions

---

Would you like a version of this using Docker or Terraform for infrastructure?
