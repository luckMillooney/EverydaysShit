const http = require('http');
const fs = require('fs');
const path = require('path');
require('dotenv').config();

// const HOST_NAME = process.env.HOST_NAME;
const PORT = process.env.PORT || 3000;
// const HOST_NAME = "localhost"
// const PORT = 3000;

const server = http.createServer((req, res) => {
  let filePath;
  if (req.url === '/index' || req.url === '/') {
    filePath = path.join(__dirname, '../frontend', 'index.html');
  } else {
    filePath = path.join(__dirname,"..", req.url); 
  }

  const extname = path.extname(filePath);
  let contentType = 'text/plain';

  switch (extname) {
    case '.html':
      contentType = 'text/html';
      break;
    case '.js':
      contentType = 'application/javascript';
      break;
    case '.css':
      contentType = 'text/css';
      break;
    case '.json':
      contentType = 'application/json';
      break;
    case '.png':
      contentType = 'image/png';
      break;
    case '.jpg':
      contentType = 'image/jpg';
      break;
  }

  // Читаем файл и возвращаем его содержимое
  fs.readFile(filePath, (err, content) => {
    if (err) {
      if (err.code === 'ENOENT') {
        console.error(`File not found: ${filePath}`);
        res.writeHead(404, { 'Content-Type': 'text/plain' });
        res.end('404 - Not Found');
      } else {
        console.error(`Server error: ${err.code}`);
        res.writeHead(500, { 'Content-Type': 'text/plain' });
        res.end('Server Error');
      }
    } else {
      res.writeHead(200, { 'Content-Type': contentType });
      res.end(content, 'utf-8');
    }
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
// server.listen(PORT,HOST_NAME, () => {
//     console.log(`Server running at http://${HOST_NAME}:${PORT}/`);
//   });
