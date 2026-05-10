/**
 * B2B CRM - Local Network Server v2.0
 * ─────────────────────────────────────────────────────
 * Requirements : Node.js (https://nodejs.org)  — no npm install needed
 * Run          : node server.js
 * Access       : http://localhost:3000           (host machine)
 *                http://<host-ip>:3000           (team on same network)
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT    = 3000;
const DB_FILE = path.join(__dirname, 'db.json');
const HTML    = path.join(__dirname, 'index.html');

// ── Empty seed — users start fresh ───────────────────────────────────────────
const SEED = {
  orders:   [],
  products: [],
  shipping: [],
  nextId: { orders: 1, products: 1, shipping: 1 }
};

// ── Initialise db.json if it doesn't exist ────────────────────────────────────
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify(SEED, null, 2));
  console.log('✅ db.json created (empty database ready).');
}

function readDB()      { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); }
function writeDB(data) { fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2)); }

// ── Get local IP for easy sharing ─────────────────────────────────────────────
function getLocalIP() {
  const os   = require('os');
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name]) {
      if (net.family === 'IPv4' && !net.internal) return net.address;
    }
  }
  return 'localhost';
}

// ── HTTP Server ───────────────────────────────────────────────────────────────
const server = http.createServer((req, res) => {
  const { method, url } = req;

  // CORS — allow any origin on the local network
  res.setHeader('Access-Control-Allow-Origin',  '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  // Serve index.html
  if (method === 'GET' && (url === '/' || url === '/index.html')) {
    fs.readFile(HTML, (err, data) => {
      if (err) { res.writeHead(404); return res.end('index.html not found — make sure it is in the same folder as server.js'); }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
    return;
  }

  // GET /api/data — return full database
  if (method === 'GET' && url === '/api/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(readDB()));
  }

  // POST /api/data — save full database
  if (method === 'POST' && url === '/api/data') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        writeDB(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch (e) {
        res.writeHead(400);
        res.end(JSON.stringify({ ok: false, error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // 404 fallback
  res.writeHead(404);
  res.end('Not found');
});

server.listen(PORT, '0.0.0.0', () => {
  const ip = getLocalIP();
  console.log('\n🚀 B2B CRM Server is running!\n');
  console.log(`   Local  : http://localhost:${PORT}`);
  console.log(`   Network: http://${ip}:${PORT}  ← share this with your team\n`);
  console.log('   Press Ctrl+C to stop the server.\n');
});
