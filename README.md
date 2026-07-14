# 🌧️ JalSetu – Smart Rooftop Rainwater Harvesting Platform

![Next.js](https://img.shields.io/badge/Next.js-14-black?logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?logo=typescript)
![Supabase](https://img.shields.io/badge/Supabase-Backend-3ECF8E?logo=supabase)
![Tailwind CSS](https://img.shields.io/badge/TailwindCSS-Styled-38BDF8?logo=tailwindcss)
![License](https://img.shields.io/badge/License-MIT-green)

JalSetu is an intelligent web platform that helps users estimate, design, and manage **Rooftop Rainwater Harvesting (RTRWH)** systems. The platform enables homeowners, institutions, and organizations to calculate potential rainwater harvesting capacity, receive customized system recommendations, and promote sustainable water conservation practices.

---

## 📖 Overview

Water scarcity is becoming one of the world's biggest challenges. JalSetu provides an easy-to-use digital solution that assists users in planning efficient rooftop rainwater harvesting systems based on their property details.

The application combines modern web technologies with intelligent calculations to recommend suitable harvesting structures and generate useful reports.

---

## ✨ Features

- 🔐 Secure User Authentication
- 👤 User Dashboard
- 🏠 Rooftop Information Management
- 📊 Rainwater Harvesting Estimation
- 💧 Water Storage Capacity Calculation
- 📄 PDF Report Generation
- 📍 City & Location Support
- ☁️ Cloud Database using Supabase
- 📱 Responsive Design
- 🌙 Modern UI with Tailwind CSS

---

## 🛠 Tech Stack

### Frontend

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- Framer Motion
- Radix UI
- Recharts

### Backend

- Supabase
- Supabase Authentication
- PostgreSQL

### Other Libraries

- React Hook Form
- Zod
- Date-fns
- Lucide React

---

## 📂 Project Structure

```
jalsetu/
│
├── app/
│   ├── api/
│   ├── auth/
│   ├── dashboard/
│   └── ...
│
├── components/
│
├── hooks/
│
├── lib/
│
├── public/
│
├── scripts/
│
├── styles/
│
├── middleware.ts
├── package.json
└── README.md
```

---

## 🚀 Getting Started

### Clone the Repository

```bash
git clone https://github.com/yourusername/jalsetu.git
```

```bash
cd jalsetu
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env.local` file.

Example:

```env
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url

NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
```

---

## ▶ Run Development Server

```bash
npm run dev
```

Visit

```
http://localhost:3000
```

---

## 📄 Build for Production

```bash
npm run build
```

Start the production server

```bash
npm start
```

---

## 🗄 Database

The project uses **Supabase PostgreSQL**.

Database setup scripts are available inside:

```
scripts/
```

These include:

- Database initialization
- Row Level Security (RLS) policies
- Seed data
- Profile triggers

---

## 📊 Core Functionalities

- User Registration & Login
- Profile Management
- Rainwater Harvesting Estimation
- Rooftop Data Collection
- Water Storage Recommendations
- Interactive Dashboard
- PDF Report Export
- Secure Database Integration

---

## 📸 Screenshots

Add screenshots here.

```
/screenshots

Home Page

Dashboard

Calculator

Authentication

PDF Report
```

---

## 🌱 Future Enhancements

- GIS-based rooftop mapping
- AI-powered harvesting recommendations
- IoT sensor integration
- Live rainfall prediction
- Mobile application
- Government scheme integration
- Analytics dashboard
- Multi-language support

---

## 🤝 Contributing

Contributions are welcome.

1. Fork the repository

2. Create your feature branch

```bash
git checkout -b feature-name
```

3. Commit your changes

```bash
git commit -m "Add new feature"
```

4. Push to your branch

```bash
git push origin feature-name
```

5. Open a Pull Request

---

## 📜 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Shelly Vats**

B.Tech CSE (IoT, Cyber Security & Blockchain)

Chandigarh Group of Colleges (CGC), Landran

GitHub: https://github.com/shellyvats

LinkedIn: https://www.linkedin.com/in/shellyvats/

---

## ⭐ Support

If you found this project useful, consider giving it a ⭐ on GitHub.
