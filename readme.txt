# B2B CRM v3.0 — Local Network App

A lightweight B2B CRM for tracking orders, products, and shipping schedules.  
Runs on your **local office network** — no cloud, no subscription, no internet required.

---

## 📁 Files

```
b2b-crm/
├── index.html            ← Preview version (open directly, uses localStorage, sample data)
├── index-server.html     ← Team version (rename to index.html, run with server.js)
├── server.js             ← Local network server (Node.js, zero dependencies)
├── db.json               ← Shared team data (auto-created on first run, add to .gitignore)
└── README.md
```

> **Tip:** Rename `index-server.html` → `index.html` before running `node server.js`

---

## 🚀 Two Ways to Use

### Option 1 — Preview (no setup, open instantly)
Just open `index.html` in any browser — no install, no server needed.
- ✅ Sample data pre-loaded so you can explore all features immediately
- ✅ Data persists in your browser via localStorage
- ✅ Export/Import JSON backups
- ✅ Reset to sample data with one click
- ❌ Data is local to your browser — not shared with teammates

### Option 2 — Team Server (shared real-time data)

**Step 1 — Install Node.js**  
[https://nodejs.org](https://nodejs.org) — choose the **LTS** version.

**Step 2 — Rename the server HTML**
```
Rename: index-server.html → index.html
```

**Step 3 — Start the server**
```bash
cd path/to/b2b-crm
node server.js
```

Output:
```
🚀 B2B CRM Server is running!

   Local  : http://localhost:3000
   Network: http://192.168.1.x:3000  ← share with your team
```

**Step 4 — Open in browser**

| Who | URL |
|-----|-----|
| Host machine | `http://localhost:3000` |
| Team members (same Wi-Fi/LAN) | `http://192.168.1.x:3000` |

---

## ✨ Features

### Dashboard
- KPI cards: Total Revenue, Shipped Orders, Total Products/Shipments, On-time Rate
- Responsive: **4×1** desktop → **2×2** tablet → **1×4** mobile
- Revenue by Customer — horizontal cards with orders, shipments, products count
- Recent Orders — filterable by customer
- **Quick Import hub** — Smart Import + per-module import buttons

### Clients
- Per-client summary: revenue, orders, shipments, products
- Drill into full order, product, and shipment history per client

### Order Schedule
- Fields: PO, dates, customer, product, currency, pricing, OQC, incoterms, ETD, RTA, on-time, remarks
- Filter by customer, status, or month
- **⚙ Custom Columns** — add/remove columns per module (team-wide)
- **⬆ Bulk Import** from Excel (.xlsx, .xls) or CSV

### Product List
- Fields: product, category, customer, vendor, currency, price, cost, auto margin %, MOQ, lead time, HS code, origin
- Filter by customer or category
- **⚙ Custom Columns** + **⬆ Bulk Import**

### Shipping Schedule
- Fields: PO, customer, product, qty, currency, total, ETA, ETD, RTA, on-time (auto), carrier, tracking, port, destination, status
- **Manage** view + **Presentation Mode** (print-ready for client meetings)
- **⚙ Custom Columns** + **⬆ Bulk Import**

---

## 🆕 v3.0 Features

### 💱 Multi-currency
- Supports **USD, TWD, CNY, EUR**
- Live exchange rates fetched automatically from open.er-api.com
- Currency selector in topbar — switches all displayed prices instantly
- All values stored as USD internally; displayed with exactly **2 decimal places**
- Each record stores the currency it was entered in

### ⚙ Custom Columns
- Add custom columns (text, number, date, money) to any module
- Remove any custom column at any time
- Saved to the server — **whole team sees the same layout**

### 🧠 Smart Import (one file → all modules)
- Upload one Excel or CSV file (single or multi-sheet)
- App **auto-detects** which sheet belongs to Orders, Products, or Shipping
- Shows a routing review screen — adjust if needed
- Imports everything at once, updating all modules and dashboard simultaneously

### 📥 Smart Merge Logic (all import types)
| Situation | What happens |
|-----------|-------------|
| Same PO/product, field is **blank** in existing record | ✅ Auto-filled silently |
| Same PO/product, both have the **same value** | ✅ No action |
| Same PO/product, **different values** | ⚠️ Shows conflict dialog with old vs new — you choose overwrite or keep |
| **New** PO/product | ✅ Added as new record |

Import summary shows: added / blanks filled / conflicts overwritten / conflicts kept

### ✓ Auto On-time Detection
- **RTA** (Real Time of Arrival) field added to Orders and Shipping
- Compared against **ETD** automatically:
  - RTA ≤ ETD → **✓ On Time** (green)
  - RTA > ETD → **✗ Late** (red)
  - RTA missing → **—**
- Updates live in the form as you enter dates

### 📅 Date Format
- All dates display and store as **DD/MM/YYYY**
- Date inputs use the browser's native date picker and convert automatically

### Status
- Simplified to **Shipped** / **Not Yet** across all modules

---

## 💾 Data & Backup

| Action | How |
|--------|-----|
| Export backup | Click `⬇ Export` — downloads `.json` |
| Import backup | Click `⬆ Import JSON` — restores and syncs to server |
| Reset to sample data | Click `↺ Reset` (preview version only) |
| Wipe team data | Stop server → delete `db.json` → restart |

**Keep data off GitHub:**
```
# .gitignore
db.json
```

---

## 📱 Responsive Design

| Screen | Layout |
|--------|--------|
| Desktop (>900px) | Full sidebar, 4×1 KPI cards |
| Tablet (≤900px) | 2×2 KPI cards, single-column forms |
| Mobile (≤640px) | Hamburger ☰ slide-in sidebar |
| Small mobile (≤480px) | 1×4 stacked KPI cards |

---

## ⚙ Configuration

Change port in `server.js` line 13:
```js
const PORT = 3000;
```

---

## 🛑 Stop the Server
Press `Ctrl + C` in the terminal.

---

## 🔒 Security Note
Designed for **trusted local networks only**.  
Do not expose `server.js` to the public internet without adding authentication.
