const http = require('http');
const fs = require('fs');
const path = require('path');

const port = process.env.PORT || 3000;

console.log('🚀 Starting Nequi Credito Site...');
console.log(`📍 Port: ${port}`);

const mimeTypes = {
  '.html': 'text/html',
  '.js': 'text/javascript',
  '.css': 'text/css',
  '.json': 'application/json',
  '.png': 'image/png',
  '.jpg': 'image/jpg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.svg': 'image/svg+xml',
  '.ico': 'image/x-icon',
  '.webp': 'image/webp',
  '.woff': 'font/woff',
  '.woff2': 'font/woff2'
};

const server = http.createServer((req, res) => {
  // Parsear la URL y quitar query string
  let urlPath = req.url.split('?')[0];
  
  // Si es la raíz, servir ini.html
  if (urlPath === '/') {
    urlPath = '/ini.html';
  }
  
  // Construir ruta del archivo
  let filePath = path.join(__dirname, 'cloned-site', urlPath);

  // Verificar si el archivo existe
  fs.access(filePath, fs.constants.F_OK, (err) => {
    if (err) {
      // Si no existe, retornar 404
      res.writeHead(404, { 'Content-Type': 'text/html; charset=utf-8' });
      res.end('<h1>404 - Archivo no encontrado</h1><p>Ruta: ' + urlPath + '</p>', 'utf-8');
      console.log('❌ 404:', urlPath);
      return;
    }

    // Leer y servir el archivo
    const extname = String(path.extname(filePath)).toLowerCase();
    const contentType = mimeTypes[extname] || 'application/octet-stream';

    fs.readFile(filePath, (error, content) => {
      if (error) {
        res.writeHead(500);
        res.end(`Error del servidor: ${error.code}`, 'utf-8');
      } else {
        res.writeHead(200, { 'Content-Type': contentType });
        res.end(content, 'utf-8');
        console.log('✅ Servido:', urlPath);
      }
    });
  });
});

server.listen(port, () => {
  console.log(`✅ Servidor corriendo en puerto ${port}`);
});

process.on('SIGTERM', () => {
  console.log('Received SIGTERM, shutting down gracefully...');
  server.close(() => process.exit(0));
});

process.on('SIGINT', () => {
  console.log('Received SIGINT, shutting down gracefully...');
  server.close(() => process.exit(0));
});
