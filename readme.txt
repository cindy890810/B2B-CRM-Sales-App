# B2B CRM — Local Network App

A lightweight B2B CRM for tracking orders, products, and shipping schedules.  
Runs on your **local office network** — no cloud, no subscription, no internet required.

---

## 📁 Files

```
b2b-crm/
├── index.html          ← Preview version (open directly in browser, localStorage)
├── index-server.html   ← Team version (rename to index.html, run with server.js)
├── server.js           ← Local network server (Node.js, zero dependencies)
├── db.json             ← Your shared data (auto-created on first run)
└── README.md
```

> **Tip:** Rename `index-server.html` → `index.html` before running `node server.js`

---

## 🚀 Two Ways to Use

### Option 1 — Preview (no setup)
Just open `index.html` in any browser.  
- ✅ Works instantly, no install needed  
- ✅ Sample data pre-loaded so you can explore all features  
- ✅ Data saves in your browser via localStorage  
- ❌ Data is private to your browser — not shared with teammates  
- Use the **↺ Reset** button to wipe sample data and start fresh

### Option 2 — Team Server (shared data)
Everyone on the same network sees and edits the same data in real time.

**Step 1 — Install Node.js**  
Download from [https://nodejs.org](https://nodejs.org) — choose the **LTS** version.

**Step 2 — Rename the server HTML**
```
Rename: index-server.html → index.html
```

**Step 3 — Start the server**
Open Terminal (Mac/Linux) or Command Prompt (Windows):
```bash
cd path/to/b2b-crm
node server.js
```

You will see:
```
🚀 B2B CRM Server is running!

   Local  : http://localhost:3000
   Network: http://192.168.1.x:3000  ← share this with your team
```

**Step 4 — Open in browser**

| Who | URL |
|-----|-----|
| Host machine | `http://localhost:3000` |
| Team members (same Wi-Fi/LAN) | `http://192.168.1.x:3000` |

---

## 👥 Team Usage

| Role | Action |
|------|--------|
| **Host (you)** | Run `node server.js` and keep the terminal open |
| **Team members** | Open the network URL in any browser — no install needed |

- App **auto-refreshes every 30 seconds** to show teammates' changes
- Click **↻** in the top bar to pull the latest data instantly
- The **save indicator dot** (top-right) shows sync status in real time

---

## ✨ Features

### Dashboard
- KPI cards: Total Revenue, Shipped Orders, Active Shipments, On-time Rate
- **Responsive layout**: 4×1 on desktop → 2×2 on tablet → 1×4 on mobile
- Revenue by Customer — horizontal cards
- Recent Orders — filterable by customer
- **Quick Import hub** — import Excel/CSV to any module directly from dashboard

### Clients
- Per-client summary: revenue, orders, shipments, products
- Click any client to drill into their full history

### Order Schedule
- 19 fields including PO, pricing, OQC, incoterms, on-time tracking
- Filter by customer, status, or month
- **Bulk Import** from Excel (.xlsx, .xls) or CSV

### Product List
- Tracks price, cost, auto-calculated margin %, MOQ, lead time, HS code, origin
- Filter by customer or category
- **Bulk Import** from Excel (.xlsx, .xls) or CSV

### Shipping Schedule
- Full shipment tracking: carrier, tracking no., port, destination
- **Manage** view + **Presentation Mode** (print-ready for client meetings)
- Filter by customer or status
- **Bulk Import** — smart auto-mapping for old schedules with different column names

### Bulk Import (all modules)
1. **Upload** — drag & drop or pick `.xlsx`, `.xls`, or `.csv`
2. **Map Columns** — auto-detects 100+ common header aliases; adjust manually if needed
3. **Preview** — review rows before committing
4. **Duplicates** — asks overwrite or skip individually per duplicate record

---

## 📱 Responsive Design

| Screen size | Layout |
|-------------|--------|
| Desktop (>900px) | Full sidebar, 4×1 KPI cards |
| Tablet (≤900px) | 2×2 KPI cards, single-column forms |
| Mobile (≤640px) | Hamburger menu ☰, slide-in sidebar |
| Small mobile (≤480px) | 1×4 stacked KPI cards |

---

## 💾 Data & Backup

| Action | How |
|--------|-----|
| **Export backup** | Click `⬇ Export` — downloads a `.json` file |
| **Import backup** | Click `⬆ Import` — restores from backup (server version syncs to server) |
| **Reset to sample data** | Click `↺ Reset` (preview version only) |
| **Wipe team data** | Stop server → delete `db.json` → restart |
| **Manual backup** | Copy `db.json` to USB / cloud storage regularly |

---

## ⚙️ Configuration

**Change port** — edit line 13 of `server.js`:
```js
const PORT = 3000;
```

**Keep your data off GitHub** — add `db.json` to `.gitignore`:
```
db.json
```

---

## 🛑 Stopping the Server
Press `Ctrl + C` in the terminal window.

---

## 🔒 Security Note
Designed for **trusted local networks only** (office Wi-Fi or LAN).  
Do **not** expose `server.js` to the public internet without adding authentication.
