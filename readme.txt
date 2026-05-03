# B2B CRM — Local Network App

A lightweight B2B CRM for tracking orders, products, and shipping schedules.  
Runs entirely on your local network — **no cloud, no subscription, no internet required.**

---

## 📁 Files

```
b2b-crm/
├── index.html   ← The CRM app (runs in any browser)
├── server.js    ← Local network server (Node.js, no dependencies)
├── db.json      ← Your data (auto-created on first run)
└── README.md
```

---

## 🚀 Quick Start (Host Machine)

### Step 1 — Install Node.js
Download and install from [https://nodejs.org](https://nodejs.org)  
Choose the **LTS** version. Default settings are fine.

### Step 2 — Download the files
Click **Code → Download ZIP** on this GitHub page, then unzip it anywhere (e.g. your Desktop).

### Step 3 — Start the server
Open **Terminal** (Mac/Linux) or **Command Prompt / PowerShell** (Windows):

```bash
cd path/to/b2b-crm
node server.js
```

You'll see:
```
🚀 B2B CRM Server is running!

   Local  : http://localhost:3000
   Network: http://192.168.1.x:3000  ← share this with your team
```

### Step 4 — Open the app
- **On the host machine:** open `http://localhost:3000`
- **Team members on the same network:** open `http://192.168.1.x:3000` (use the IP shown in Step 3)

> 💡 Everyone on the same Wi-Fi or office network can access it simultaneously.  
> All changes sync to the shared `db.json` file on the host machine.

---

## 👥 Team Usage

| Who | What to do |
|-----|-----------|
| **Host (you)** | Run `node server.js` once. Keep the terminal open while the team is working. |
| **Team members** | Open the network URL in any browser. No install needed. |

The app **auto-refreshes every 30 seconds** to show changes made by other team members.  
You can also click **↻ Refresh** in the top bar to pull the latest data instantly.

---

## 💾 Data & Backup

- All data is stored in `db.json` on the host machine.
- **Export** — Click `⬇ Export` to download a JSON backup to your computer.
- **Import** — Click `⬆ Import` to restore from a backup file (syncs to the server immediately).
- **Back up regularly** — copy `db.json` to a safe location (USB, Google Drive, etc.).

---

## 🛑 Stopping the Server

Press `Ctrl + C` in the terminal window.

---

## ⚙️ Changing the Port

Edit line 13 of `server.js`:
```js
const PORT = 3000; // change to any available port, e.g. 8080
```

---

## 📋 Features

- **Dashboard** — KPI cards, revenue by customer, recent orders (filterable by customer)
- **Clients** — per-client view with total revenue, orders, products, shipments
- **Order Schedule** — full order tracking with 19 fields, filter by customer/status/month
- **Product List** — product catalog with margin %, MOQ, HS code, lead time
- **Shipping Schedule** — manage view + presentation mode (print-ready for client meetings)

---

## 🔒 Security Note

This app is designed for **trusted local networks only** (your office Wi-Fi or LAN).  
Do not expose `server.js` to the public internet without adding authentication.
