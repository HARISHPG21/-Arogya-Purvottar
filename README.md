# ArogyaPurvottar — Smart Community Health Monitoring System
## SIH 2025 | Problem Code: SIH25001

<div align="center">
  <img src="https://img.shields.io/badge/SIH-2025-orange?style=for-the-badge" />
  <img src="https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js" />
  <img src="https://img.shields.io/badge/FastAPI-0.100-green?style=for-the-badge&logo=fastapi" />
  <img src="https://img.shields.io/badge/Python-3.11-blue?style=for-the-badge&logo=python" />
  <img src="https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript" />
</div>

---

## 🩺 About

**ArogyaPurvottar** is an AI-powered community health monitoring and early warning system for water-borne diseases in rural Northeast India. Built for the **Smart India Hackathon 2025** (Problem Statement SIH25001), it combines:

- 🦠 **Disease Surveillance** — Citizen symptom reporting, ASHA field surveys, PHC case logs
- 🤖 **AI Outbreak Prediction** — XGBoost/Random Forest ensemble with SHAP-style attribution
- 💧 **Water Quality Monitoring** — IoT sensor integration, H2S strip test logging, GIS mapping
- 🗺 **GIS Hotspot Mapping** — Leaflet + OpenStreetMap with risk buffer heatmaps
- 📊 **Government Analytics** — 8 NE state risk matrix, radar/pie/bar charts
- 🔔 **Multi-channel Alerts** — App, SMS, Email, IVR, WhatsApp broadcast
- 📋 **Report Generator** — PDF, CSV, Excel export for health authorities
- 🌐 **Multilingual** — English, Assamese, Bengali, Meitei, Nagamese

---

## 🚀 Tech Stack

### Frontend
| Technology | Version |
|-----------|---------|
| Next.js | 16.3 (Turbopack) |
| React | 19 |
| TypeScript | 5 |
| Tailwind CSS | 3 |
| Recharts | 2 |
| Leaflet | 1.9 |
| Framer Motion | 11 |

### Backend
| Technology | Version |
|-----------|---------|
| FastAPI | 0.100+ |
| Python | 3.11 |
| SQLAlchemy | 2 |
| Pydantic | 2 |
| SQLite / PostgreSQL | — |

---

## 📁 Project Structure

```
SIH 2025/
├── backend/
│   ├── app/
│   │   ├── api/v1/          # Route handlers (auth, citizens, asha, simulation...)
│   │   ├── core/            # Security, config, JWT
│   │   ├── db/              # Database models, session
│   │   └── ml/              # AI predictor, synthetic data generator
│   ├── seed_data.py         # Northeast India realistic dataset seeder
│   └── requirements.txt
└── frontend/
    ├── src/
    │   ├── app/             # Next.js 15 App Router pages
    │   │   ├── page.tsx         # Landing page
    │   │   ├── simulation/      # Outbreak simulation engine
    │   │   ├── water-quality/   # Water quality dashboard
    │   │   ├── analytics/       # Government analytics
    │   │   ├── ai-assistant/    # AI health chatbot
    │   │   ├── notifications/   # Alert center
    │   │   ├── reports/         # PDF/CSV report generator
    │   │   └── portal/          # 6 role-based portals
    │   ├── components/      # Reusable UI components
    │   └── lib/             # Utilities (i18n, mockApi, offlineStorage, theme)
    └── package.json
```

---

## ⚡ Getting Started

### Prerequisites
- Node.js 18+
- Python 3.11+
- Git

### 1. Clone the repository
```bash
git clone https://github.com/HARISHPG21/arogya-purvottar.git
cd arogya-purvottar
```

### 2. Start the Backend
```bash
cd backend
pip install -r requirements.txt
python seed_data.py          # Seeds the database with NE India data
uvicorn app.main:app --reload --port 8000
```
API available at: http://localhost:8000
Swagger docs: http://localhost:8000/docs

### 3. Start the Frontend
```bash
cd frontend
npm install
npm run dev
```
App available at: http://localhost:3000

---

## 🔐 Demo Logins

Use the **"Demo Role Switch"** button in the top navbar to instantly switch between roles:

| Role | Portal | Access |
|------|--------|--------|
| 👤 Citizen | `/portal/citizen` | Report symptoms, view alerts |
| 🏥 ASHA Worker | `/portal/asha` | Field surveys, water tests, offline sync |
| 🩺 PHC Medical Officer | `/portal/phc` | Case management, lab results |
| 🏛 District Officer | `/portal/district` | GIS command center, RRT dispatch |
| 🏢 Government Admin | `/portal/government` | State-level analytics |
| ⚙ System Admin | `/portal/admin` | User management, system health |

---

## 🌟 Key Features

### 🦠 Outbreak Simulation Engine (`/simulation`)
Day-by-day environmental cascade: Rainfall → Turbidity spike → E.Coli detection → Symptom surge → AI alert

### 💧 Water Quality Dashboard (`/water-quality`)
Real-time IoT sensor + field test results with Leaflet geo-tagged markers

### 📊 Government Analytics (`/analytics`)
All 8 Northeast states: risk index, active cases, water safety score, radar charts

### 🤖 AI Health Assistant (`/ai-assistant`)
Expert knowledge base: Cholera, Typhoid, ORS dosage, H2S field testing, alert protocols

### 🔔 Notification Center (`/notifications`)
Multi-channel alerts with SMS broadcast simulation and channel status dashboard

### 📋 Report Generator (`/reports`)
PDF (government-styled print), CSV, Excel download with date range and region filters

---

## 🗺 Coverage Area

Northeast India — All 8 states:
Assam | Meghalaya | Tripura | Manipur | Nagaland | Mizoram | Arunachal Pradesh | Sikkim

---

## 📜 License

MIT License — Built for Smart India Hackathon 2025

---

<div align="center">
  Built with ❤️ for Rural Northeast India's Public Health
  <br/>
  <strong>Ministry of Development of North Eastern Region (MDoNER)</strong>
</div>
