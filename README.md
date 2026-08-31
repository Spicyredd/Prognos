# Prognos

**Prognos** is an AI-assisted medical assessment application built for the **Himal AI Hackathon**.

The project explored the use of large language models to help medical professionals generate **quick preliminary assessments** from provided patient information.

## 🩺 How It Worked

```text
User Input
    ↓
React Frontend
    ↓
Django Backend
    ↓
LLM API
    ↓
AI-Generated Assessment
    ↓
Frontend
```

The frontend collected the required information, while the Django backend handled the API communication with the language model and returned the generated response.

## 🧠 Prompt Engineering

During development, we found that general-purpose LLMs often produced vague responses when asked about specific medical conditions.

We experimented with **prompt engineering** to make the responses more detailed and useful for the application's intended workflow.

## 🛠️ Tech Stack

* **Frontend:** React, Vite, JavaScript
* **Backend:** Django, Python
* **AI:** Large Language Model API
* **Deployment:** Vercel

## 📂 Project Structure

```text
Prognos/
│
├── backend_django/     # Django backend
├── public/             # Frontend assets
├── src/                # React application
├── index.html
├── package.json
├── requirements.txt
├── vite.config.js
└── vercel.json
```

## 🏆 Hackathon

Built as a **hackathon project for the Himal AI Hackathon**.

The project was developed as a functional prototype with a working React frontend, Django backend, LLM API integration, and deployment.

## ⚠️ Limitations

Prognos was a **hackathon prototype**, not a clinical diagnostic system. The AI-generated responses were not intended to replace professional medical judgment.

The project also highlighted the limitations of general-purpose LLMs at the time, particularly their tendency to provide vague or insufficiently specific responses for certain medical queries.

## 📌 Status

**Hackathon Project — Archived**
