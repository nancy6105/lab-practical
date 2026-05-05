const http = require("http");
const fs = require("fs");
const os = require("os");
const path = require("path");

const logFile = path.join(__dirname, "visitors.log");
const backupFile = path.join(__dirname, "backup.log");

function toGB(bytes) {
  return (bytes / (1024 ** 3)).toFixed(2);
}

function formatUptime(seconds) {
  const h = Math.floor(seconds / 3600);
  const m = Math.floor((seconds % 3600) / 60);
  const s = Math.floor(seconds % 60);
  return `${h}h ${m}m ${s}s`;
}


const server = http.createServer((req, res) => {

  if (req.method === "GET" && req.url === "/visit") {
    const timestamp = new Date().toISOString() + "\n";

    fs.appendFile(logFile, timestamp, (err) => {
      if (err) {
        res.writeHead(500);
        return res.end("Error writing log");
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Visit logged");
    });
  }

  else if (req.method === "GET" && req.url === "/logs") {
    fs.readFile(logFile, "utf-8", (err, data) => {
      if (err) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        return res.end("No logs found");
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end(data);
    });
  }

  else if (req.method === "GET" && req.url === "/copy-logs") {
    fs.copyFile(logFile, backupFile, (err) => {
      if (err) {
        res.writeHead(500);
        return res.end("Error copying logs");
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Logs copied to backup.log");
    });
  }

  else if (req.method === "GET" && req.url === "/clear-logs") {
    fs.unlink(logFile, (err) => {
      if (err) {
        res.writeHead(200, { "Content-Type": "text/plain" });
        return res.end("No log file to delete");
      }
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("Logs cleared");
    });
  }

  else if (req.method === "GET" && req.url === "/system-info") {
    const cpus = os.cpus();

    const info = {
      hostname: os.hostname(),
      platform: os.platform(),
      cpuModel: cpus[0].model,
      cpuCores: cpus.length,
      totalMemoryGB: toGB(os.totalmem()),
      freeMemoryGB: toGB(os.freemem()),
      uptime: formatUptime(os.uptime())
    };

    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify(info, null, 2));
  }

  else {
    res.writeHead(404, { "Content-Type": "text/plain" });
    res.end("404 Not Found");
  }
});

// Start server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});