# B2B CRM v5.0 — Local Network App

A B2B CRM for tracking orders, products, and shipping schedules — with live exchange rates, delivery alerts, and full cross-module sync.  
Runs on your **local office network** — no cloud, no subscription, no internet required.

---

## 📁 Files

```
b2b-crm/
├── index.html          ← Preview version (open directly, localStorage, sample data)
├── index-server.html   ← Team version (rename to index.html, run with server.js)
├── server.js           ← Local network server (Node.js, zero dependencies)
├── db.json             ← Shared team data (auto-created, add to .gitignore)
└── README.md
```

> **Tip:** Rename `index-server.html` → `index.html` before running `node server.js`

---

## 🚀 Quick Start

### Option 1 — Preview (no setup)
Open `index.html` directly in any browser. Sample data pre-loaded.  
Use **↺ Reset** to wipe sample data and start fresh with your own.

### Option 2 — Team Server (shared real-time data)

```bash
# 1. Install Node.js from https://nodejs.org (LTS version)
# 2. Rename index-server.html → index.html
# 3. Start the server:
cd path/to/b2b-crm
node server.js
```

Output:
```
🚀 B2B CRM v5.0 Server is running!

   Local  : http://localhost:3000
   Network: http://192.168.1.x:3000  ← share with your team
```

Team members open the Network URL in any browser — no install needed.

---

## ✨ Features

### Dashboard
- KPI cards: Sales Revenue (USD), Shipped Orders, On-time Rate, Delivery Alerts
- 🔴/🟡 Delivery alert cards for overdue and approaching shipments
- Revenue by Customer breakdown
- Recent Orders table — filterable by customer
- **Quick Import hub** — Smart Import + per-module import buttons
- **Live Exchange Rates** panel (💱 button) — refreshes every 30 min

### Clients
- Per-client summary: revenue (USD), orders, shipments, products
- Drill-in to see full orders, products, and shipments per client
- All data synced from other modules automatically

### Order Schedule

| Column | Description |
|--------|-------------|
| Shipping Status | Shipped / Not Yet |
| Customer | Client company name |
| Project | Project name |
| Model | Product model |
| Client PO# | Client purchase order number |
| Client PO Date | Date of client PO |
| Client RTA | Client's required time of arrival |
| Qty | Quantity |
| Unit Price (USD) | Price converted to USD at live rate |
| Sales Revenue (USD) | Auto-calculated: Unit Price × Qty |
| Sales Month | Month of sale |
| Supplier | Supplier/vendor name |
| Supplier PO# | Supplier purchase order number |
| Supplier PO Date | Date PO sent to supplier |
| Supplier Delivery Date | Expected supplier delivery |
| Planned ETD to Client | Planned estimated time of departure |
| Actual ETD | Actual departure date |
| OQC Date | Quality check date |
| OQC PIC / Date | QC inspector and date |
| Shipping Invoice# | Invoice number |
| On-time | Auto: ✓ On Time / ✗ Late (vs Planned ETD) |
| Remarks | Notes |

### Product List (auto-synced from Orders)
Customer · Project · Model · Unit Price (USD) · Supplier · Cost (USD) · Margin % · Packaging Details · MOQ · Lead Time · HS Code · Origin

### Shipping Schedule
- Fields: Alert · Client PO# · Customer · Project · Model · Qty · Total (USD) · Planned ETD · Actual ETD · Client RTA · On-time · Carrier · Tracking# · Port of Loading · Destination · Status
- Sorted by urgency: overdue first, then approaching, then normal
- **Presentation Mode** — print-ready table for client meetings

---

## 🔔 Delivery Alerts (shown on Dashboard + Shipping Schedule)

| Alert | Trigger |
|-------|---------|
| 🔴 Overdue | ETD has passed, status still "Not Yet" |
| 🟡 Due in Xd | ETD within **5 days**, not yet shipped |
| ✗ Late | Client RTA arrived after Planned ETD |
| ✓ OK | Shipped on time |

Alert count shown as red badge on sidebar Shipping nav item.

---

## 🔗 Cross-Module Sync

Every save and import automatically syncs across all modules:

| Source | → Syncs to |
|--------|-----------|
| Order saved/imported | Creates/fills Product stub + Shipping stub with ETD dates |
| Product saved/imported | Back-fills Unit Price + Supplier into matching Orders |
| Shipping saved/imported | Back-fills ETD, Actual ETD, RTA, Status into matching Orders |

Matching is done by **Client PO#** (Orders ↔ Shipping) and **Customer + Project + Model** (Orders ↔ Products).

---

## 💱 Multi-Currency

- Supported: **USD, TWD, CNY, EUR, GBP, JPY, HKD**
- Live rates fetched from open.er-api.com on load, refreshed every 30 min
- All prices stored as **USD internally**, converted at live rates on entry
- All totals and revenue displayed in USD throughout the app

---

## 📥 Import System

### Smart Import (Dashboard → 🧠)
- Upload one Excel or CSV file (single or multi-sheet)
- Auto-detects which sheet → Orders, Products, or Shipping
- Review routing, then import everything at once

### Per-module Import (⬆ Import button in each module)
- Upload Excel (.xlsx, .xls) or CSV
- Auto-maps column headers (100+ aliases supported)
- Any date format auto-converted to DD/MM/YYYY

### Merge Logic
| Situation | Action |
|-----------|--------|
| Same PO#, field is **blank** in existing | ✅ Auto-filled silently |
| Same PO#, both have **same value** | ✅ No action |
| Same PO#, **different values** | ⚠️ Dialog shows conflict — choose overwrite or keep |
| **New** PO# | ✅ Added as new record |

---

## 🗂 Column Management

- **Drag column headers** to reorder any table
- Changes saved to server — whole team sees same layout
- Right-click or use ▾ menu to rename or remove columns (server version)

---

## 📱 Responsive Design

| Screen | Layout |
|--------|--------|
| Desktop (>900px) | Full sidebar, 4×1 KPI cards |
| Tablet (≤900px) | 2×2 KPI cards |
| Mobile (≤640px) | Hamburger ☰ slide-in sidebar |
| Small mobile (≤480px) | 1×4 stacked KPI cards |

---

## 💾 Data & Backup

| Action | How |
|--------|-----|
| Export backup | Click `⬇ Export` — saves `.json` file |
| Import backup | Click `⬆ Import JSON` — restores and syncs to server |
| Reset to sample data | Click `↺ Reset` (preview version only) |
| Wipe team data | Stop server → delete `db.json` → restart |

**Keep data off GitHub:**
```
# .gitignore
db.json
```

---

## ⚙ Configuration

Change port in `server.js` line 9:
```js
const PORT = 3000;
```

---

## 🛑 Stop the Server
Press `Ctrl + C` in the terminal.

---

## 🔒 Security
Designed for **trusted local networks only**.  
Do not expose to the public internet without adding authentication.
