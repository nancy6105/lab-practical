# Node.js Core HTTP Server

A simple HTTP server built using only Node.js core modules (`http`, `fs`, `os`, `path`).
No external libraries or frameworks like Express are used.

---

## 🚀 Features

* Log visitor timestamps
* View logs
* Backup logs
* Clear logs
* View system information (CPU, memory, uptime, etc.)

---

## 📁 Project Structure

```
project/
│── server.js
│── visitors.log       (auto-created)
│── backup.log         (auto-created)
│── README.md
```

---

## ⚙️ Modules Used

* `http` → Create HTTP server
* `fs` → File system operations
* `os` → System information
* `path` → Handle file paths

---

## ▶️ Getting Started

### 1. Clone the repository

```bash
git clone <your-repo-link>
cd <project-folder>
```

### 2. Run the server

```bash
node server.js
```

Server will start at:

```
http://localhost:3000
```

---

## 🌐 API Routes

### 🔹 1. Visit Log

```
GET /visit
```

* Appends current timestamp to `visitors.log`
* Response: `Visit logged`

---

### 🔹 2. View Logs

```
GET /logs
```

* Reads and displays all logs
* Content-Type: `text/plain`

---

### 🔹 3. Copy Logs

```
GET /copy-logs
```

* Copies `visitors.log` → `backup.log`

---

### 🔹 4. Clear Logs

```
GET /clear-logs
```

* Deletes the log file

---

### 🔹 5. System Info

```
GET /system-info
```

Returns JSON:

```json
{
  "hostname": "your-system",
  "platform": "win32",
  "cpuModel": "Intel(R) Core...",
  "cpuCores": 8,
  "totalMemoryGB": "15.87",
  "freeMemoryGB": "10.23",
  "uptime": "2h 10m 5s"
}
```

* Content-Type: `application/json`

---

## ❌ Error Handling

* Invalid routes → `404 Not Found`
* File errors handled gracefully

---

## 🧠 Concepts Covered

* Node.js core modules
* File handling (CRUD)
* HTTP routing
* System-level data using OS module
* Path handling with `__dirname`

---

## 📌 Notes

* Log files are stored in the same directory (`__dirname`)
* `visitors.log` is created automatically on first visit
* Uptime is formatted as: `Xh Ym Zs`
* Memory is shown in GB (2 decimal places)
