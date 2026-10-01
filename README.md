# HydraTrack 💧

### AI-Powered Smart Hydration & Wellness Assistant

HydraTrack is a full-stack AI-powered hydration tracking application that helps users record their daily water intake, monitor hydration progress, and receive personalized guidance through an AI assistant.

The project combines a React frontend, FastAPI backend, SQLite database, and Gemini-powered AI layer into a single application.

---

## 🚀 Features

- 💧 Track daily water intake
- 📊 Monitor progress toward a daily hydration goal
- ⚡ Quick-add water amounts
- 🗄️ Persist hydration records using SQLite
- 🤖 Generate AI-powered hydration analysis
- 📈 View hydration history
- 🔌 REST APIs using FastAPI
- 🎨 Responsive React-based dashboard
- 📝 Application logging
- 🔐 Environment-based API key configuration

---

## 🏗️ System Architecture

```text
                    ┌──────────────────────┐
                    │      React UI        │
                    │   HydraTrack Web App │
                    └──────────┬───────────┘
                               │
                               │ REST API
                               ▼
                    ┌──────────────────────┐
                    │      FastAPI         │
                    │      Backend         │
                    └───────┬───────┬──────┘
                            │       │
                  ┌─────────┘       └──────────┐
                  ▼                            ▼
        ┌──────────────────┐        ┌──────────────────┐
        │     SQLite       │        │   AI Agent Layer │
        │  Water History   │        │      Gemini      │
        └──────────────────┘        └──────────────────┘