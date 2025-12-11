# React Finance Tracker – Personal Finance Management App

A modern personal finance tracker built with **React.js** and **Firebase**, designed to help users manage income, expenses, and overall balance in real time.  
The app provides an intuitive dashboard with financial visualizations, CSV import/export support, and category-wise filters — all tied to a secure Firebase backend.

---

## 🚀 Features

### 🔐 Authentication
- Sign Up / Login using **Firebase Authentication**
- Google Sign-In supported
- Automatic session persistence

### 📊 Finance Dashboard
- Displays **Total Balance**, **Total Income**, and **Total Expenses**
- Visualized with **line charts** (balance over time) and **pie charts** (expense breakdown)
- Fully responsive layout using **Ant Design**

### 💵 Transactions Management
- Add **Income** or **Expense** with:
  - Name / Title
  - Amount
  - Date
  - Category Tag
- Real-time updates using **Firestore onSnapshot**
- Sort by **amount**, **date**, or **default**
- Search and filter transactions by **name** or **category**

### 📁 CSV Import / Export
- Export all transactions as CSV using **PapaParse**
- Import user-edited CSV files back into Firestore

### 🛠 Additional Capabilities
- React Toastify for instant success/error alerts
- Clean reusable components for inputs, buttons, layouts
- Centralized state handling via Firestore fetch rather than Redux (simple architecture)
- Hosted & deploy-ready (Netlify recommended)

---

## 🧠 Logic & Architecture Overview

### 🔸 Authentication Flow
- Firebase `createUserWithEmailAndPassword` and `signInWithPopup` for Google auth  
- After signup, a Firestore document is created:
```

users → userId → { name, email, photoURL, transactions }

```

### 🔸 Firestore Structure
```

/users
/{userId}
name: string
email: string
photoURL: string | null
transactions: [ ... ]

```

Each transaction contains:
```

{
name: string,
amount: number,
date: timestamp,
tag: string,
type: "income" | "expense"
}

```

### 🔸 Transactions Logic
- When the user adds a transaction, it is appended to `/users/{id}/transactions`.
- Balance is recomputed as:
```

balance = totalIncome - totalExpenses

```
- Charts update automatically based on the Firestore snapshot.

### 🔸 CSV Handling
- Export: Convert transactions array → CSV using PapaParse  
- Import: Parse CSV → validate → push into Firestore → re-render

---

## 📂 Project Structure

```

src/
├── components/
│   ├── Header/
│   ├── Input/
│   ├── Button/
│   ├── AddExpenseModal/
│   ├── AddIncomeModal/
│   └── TransactionsTable/
│
├── pages/
│   ├── Signup/
│   └── Dashboard/
│
├── firebase.js
├── App.js
├── index.js
└── utils/
├── calculateBalance.js
└── csvHandler.js

```

---

## 🧰 Tech Stack

### **Frontend**
- React.js  
- React Router  
- Ant Design  
- React Toastify  
- PapaParse  
- Moment.js  

### **Backend / Database**
- Firebase Authentication  
- Firebase Firestore (NoSQL real-time database)

### **Deployment**
- Netlify / Vercel

---

## 🔧 Getting Started

### 1️⃣ Clone the Repo
```

git clone [https://github.com/nirvair09/React-Finance-Tracker-Using-FireBase.git](https://github.com/nirvair09/React-Finance-Tracker-Using-FireBase.git)
cd React-Finance-Tracker-Using-FireBase

```

### 2️⃣ Install Dependencies
```

npm install

````

### 3️⃣ Firebase Setup
Create a **firebase.js** file with:
```js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "...",
  authDomain: "...",
  projectId: "...",
  storageBucket: "...",
  messagingSenderId: "...",
  appId: "..."
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
````

### 4️⃣ Run App Locally

```
npm start
```

---

## 🌐 Live Demo

Coming soon (add your Netlify/Vercel link here once deployed)

---

## 🔗 GitHub

[https://github.com/nirvair09/React-Finance-Tracker-Using-FireBase](https://github.com/nirvair09/React-Finance-Tracker-Using-FireBase)
