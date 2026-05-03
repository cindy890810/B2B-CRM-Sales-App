/**
 * B2B CRM - Local Network Server
 * ─────────────────────────────────────────────────────
 * Requirements : Node.js (https://nodejs.org)  — no npm install needed
 * Run          : node server.js
 * Access       : http://localhost:3000  (host machine)
 *                http://<host-ip>:3000  (other team devices on same network)
 */

const http = require('http');
const fs   = require('fs');
const path = require('path');

const PORT    = 3000;
const DB_FILE = path.join(__dirname, 'db.json');
const HTML    = path.join(__dirname, 'index.html');

// ── Seed data written to db.json on first run ─────────────────────────────────
const SEED = {
  orders: [
    {id:1,po:'PO1000627632',poDate:'2026/04/01',customer:'Oring Systems',product:'CL_Power Adapter',price:50,qty:500,total:25000,invoice:'INV-001',paymentDate:'',salesMonth:'May',custEta:'5/15',poToVendor:'',vendorShip:'04/29',oqc:'Johnny',etd:'5/1',incoterms:'FOB',status:'Shipped',onTime:'Yes',remarks:''},
    {id:2,po:'PO1000627633',poDate:'2026/04/10',customer:'TechCore Ltd',product:'USB-C Hub Pro',price:35,qty:200,total:7000,invoice:'INV-002',paymentDate:'',salesMonth:'May',custEta:'5/20',poToVendor:'',vendorShip:'05/05',oqc:'Mary',etd:'5/18',incoterms:'EXW',status:'Not Yet',onTime:'No',remarks:'Awaiting vendor'},
    {id:3,po:'PO1000627634',poDate:'2026/03/22',customer:'Global Tech',product:'HDMI Switch 4K',price:28,qty:150,total:4200,invoice:'INV-003',paymentDate:'2026/04/20',salesMonth:'April',custEta:'4/30',poToVendor:'',vendorShip:'04/18',oqc:'Johnny',etd:'4/28',incoterms:'CIF',status:'Shipped',onTime:'Yes',remarks:''},
    {id:4,po:'PO1000627635',poDate:'2026/04/15',customer:'Oring Systems',product:'CL_Power Adapter',price:50,qty:300,total:15000,invoice:'INV-004',paymentDate:'',salesMonth:'May',custEta:'5/25',poToVendor:'',vendorShip:'05/10',oqc:'Johnny',etd:'5/22',incoterms:'FOB',status:'In Transit',onTime:'Yes',remarks:'Rush order'}
  ],
  products: [
    {id:1,product:'CL_Power Adapter',category:'Power',customer:'Oring Systems',vendor:'PowerTech Co.',price:50,cost:30,moq:100,leadTime:14,size:'10x6x4cm',weight:'250g',hsCode:'8504.40',origin:'Taiwan'},
    {id:2,product:'USB-C Hub Pro',category:'Connectivity',customer:'TechCore Ltd',vendor:'ConnectPro',price:35,cost:18,moq:50,leadTime:21,size:'12x4x2cm',weight:'180g',hsCode:'8473.30',origin:'China'},
    {id:3,product:'HDMI Switch 4K',category:'Display',customer:'Global Tech',vendor:'DisplayTech',price:28,cost:14,moq:100,leadTime:18,size:'8x5x2cm',weight:'150g',hsCode:'8536.90',origin:'Taiwan'}
  ],
  shipping: [
    {id:1,po:'PO1000627632',customer:'Oring Systems',product:'CL_Power Adapter',qty:500,total:25000,eta:'2026-05-15',etd:'2026-05-01',carrier:'Evergreen',tracking:'EVG20260501X',portLoading:'Kaohsiung',destination:'Los Angeles',status:'In Transit'},
    {id:2,po:'PO1000627634',customer:'Global Tech',product:'HDMI Switch 4K',qty:150,total:4200,eta:'2026-04-30',etd:'2026-04-28',carrier:'COSCO',tracking:'CSC20260428Y',portLoading:'Keelung',destination:'Hamburg',status:'Delivered'},
    {id:3,po:'PO1000627633',customer:'TechCore Ltd',product:'USB-C Hub Pro',qty:200,total:7000,eta:'2026-05-20',etd:'2026-05-18',carrier:'Yang Ming',tracking:'',portLoading:'Taichung',destination:'Rotterdam',status:'Pending'},
    {id:4,po:'PO1000627635',customer:'Oring Systems',product:'CL_Power Adapter',qty:300,total:15000,eta:'2026-05-25',etd:'2026-05-22',carrier:'Evergreen',tracking:'EVG20260522Z',portLoading:'Kaohsiung',destination:'Los Angeles',status:'Pending'}
  ],
  nextId: { orders: 5, products: 4, shipping: 5 }
};

// ── Initialise db.json if it doesn't exist ────────────────────────────────────
if (!fs.existsSync(DB_FILE)) {
  fs.writeFileSync(DB_FILE, JSON.stringify(SEED, null, 2));
  console.log('✅ db.json created with sample data.');
}

function readDB()  { return JSON.parse(fs.readFileSync(DB_FILE, 'utf8')); }
function writeDB(data) { fs.writeFileSync(DB_FILE, JSON.stringify(data, null, 2)); }

// ── Get local IP for easy sharing ─────────────────────────────────────────────
function getLocalIP() {
  const os = require('os');
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

  // CORS headers — allow any origin on the local network
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (method === 'OPTIONS') { res.writeHead(204); return res.end(); }

  // ── Serve index.html ──────────────────────────────────────────────────────
  if (method === 'GET' && (url === '/' || url === '/index.html')) {
    fs.readFile(HTML, (err, data) => {
      if (err) { res.writeHead(404); return res.end('index.html not found'); }
      res.writeHead(200, { 'Content-Type': 'text/html' });
      res.end(data);
    });
    return;
  }

  // ── GET /api/data — return full db ───────────────────────────────────────
  if (method === 'GET' && url === '/api/data') {
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(readDB()));
  }

  // ── POST /api/data — save full db ────────────────────────────────────────
  if (method === 'POST' && url === '/api/data') {
    let body = '';
    req.on('data', chunk => body += chunk);
    req.on('end', () => {
      try {
        const data = JSON.parse(body);
        writeDB(data);
        res.writeHead(200, { 'Content-Type': 'application/json' });
        res.end(JSON.stringify({ ok: true }));
      } catch(e) {
        res.writeHead(400);
        res.end(JSON.stringify({ ok: false, error: 'Invalid JSON' }));
      }
    });
    return;
  }

  // ── 404 fallback ──────────────────────────────────────────────────────────
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
