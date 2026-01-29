# 🧾 Pastebin-Lite (Serverless)

A lightweight **Pastebin-style** application built using **Next.js (App Router)** and **AWS Serverless**.  
Users can create text pastes, generate shareable links, and optionally restrict access using **time-to-live (TTL)** or **maximum view limits**.

> ⚡ Fully Serverless • ☁️ Scalable • 🔒 Secure • 🧼 Minimal UI

---

## ✨ Features

- 📝 Create and share text pastes
- 🔗 Public, shareable URLs
- ⏳ Optional auto-expiry using TTL
- 👀 Optional maximum view count
- ⚙️ Atomic view count updates
- 🚫 Automatic 404 for expired or exhausted pastes

---

## 🧱 Tech Stack

### Frontend
- **Next.js** (App Router)
- **React**
- **Formik + Yup** (Form handling & validation)
- **Tailwind CSS**

### Backend
- **Node.js**
- **Serverless Framework**
- **AWS Lambda**
- **Amazon API Gateway**

### Persistence
- **Amazon DynamoDB**
  - TTL enabled for automatic expiry
  - Atomic operations for view-count handling

---

## 🔁 Application Flow

### 1. Create Paste
- User enters paste content (**required**)
- Optional constraints:
  - TTL (in seconds)
  - Maximum number of views
- Frontend validation using **Formik + Yup**
- Request sent to `POST /api/pastes`

---

### 2. Store Paste
- Backend generates a **unique paste ID**
- Paste stored in **DynamoDB**
- TTL calculated and stored (if provided)
- View limit stored (if provided)

---

### 3. Share Link
- Backend returns a public URL:


- User can share this link with others

---

### 4. View Paste
- Paste is fetched from DynamoDB
- Each successful view atomically decrements remaining views
- If TTL has expired or views are exhausted → **404 Not Found**

---

## ☁️ Deployment

| Component | Platform |
|---------|----------|
| Frontend | Vercel |
| Backend  | AWS Lambda (Serverless Framework) |
| Database | Amazon DynamoDB |

- Fully stateless architecture
- No background jobs or cron tasks required

---

## 🔐 Security & Reliability

- No secrets committed to the repository
- Safe rendering of paste content (no script execution)
- No global mutable state
- Concurrent-safe DynamoDB operations
- Validation on both frontend and backend

---

## 🧩 Design Decisions

- Serverless architecture for simplicity and scalability
- DynamoDB TTL used instead of background jobs
- Minimal UI to prioritize functional correctness
- Clear separation of frontend and backend responsibilities

---

## 🚀 Running Locally

### Frontend
```bash
npm install
npm run dev

### Backend
```bash
npm install
npm run dev
serverless deploy