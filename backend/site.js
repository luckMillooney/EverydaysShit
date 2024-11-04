const http = require('http');
const fs = require('fs');
const path = require('path');

const hostname = '';
// const hostname = 'localhost';
const port = 3000;

const server = http.createServer((req, res) => {
  // Путь к файлу в зависимости от URL
  let filePath;
  if (req.url === '/index' || req.url === '/') {
    filePath = path.join(__dirname, '../frontend', 'index.html');
  } else {
    filePath = path.join(__dirname,"..", req.url); // путь к запрашиваемому файлу
  }

  // Определяем content-type
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

server.listen(port, hostname, () => {
    console.log(`Server running at http://${hostname}:${port}/`);
  });

// const server = http.createServer((req, res) => {
//     switch (req.url){   
//     case '/api':
//         res.writeHead(200, { 'Content-Type': 'application/json' });
//         res.end(JSON.stringify({ message: 'Hello from backend!' }));
//     break;
//     case '/index':
//         const indexMain = path.resolve(__dirname + '/frontend/index.html');
//         fs.readFile(indexMain, (err, html) => {
//             if (err) {
//               console.error(err);
//               res.writeHead(500, { 'Content-Type': 'text/plain' });
//               res.end("Something went wrong");
//               return;
//             }
            
//             res.writeHead(200, { 'Content-Type': 'text/html' });
//             res.end(html);  // Здесь мы вызываем res.end() с html
//           });
//         break;
//     default:
//         res.writeHead(404, { 'Content-Type': 'text/plain' });
//         res.end('Not Found');
//     break;
//   }
// });

// server.listen(3000, () => {
//   console.log('Server is running on http://localhost:3000');
// });
