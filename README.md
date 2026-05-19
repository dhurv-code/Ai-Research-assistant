AI Research Assistant

An LLM-powered AI Research Assistant built to simplify research workflows through RAG (Retrieval-Augmented Generation), AI automation, and research paper discovery. The platform enables users to upload research papers, interact with them through AI-powered conversations, discover new papers automatically, and organize personalized research interests.

Features
📄 Research Paper Upload & Chat
Upload PDF research papers
Extract and process document content
Ask contextual questions from uploaded documents
AI-powered document interaction using LLM + RAG workflow
🔍 RAG Pipeline

Implemented a complete Retrieval-Augmented Generation pipeline:

PDF Upload
    ↓
Text Extraction
    ↓
Chunking
    ↓
Embeddings
    ↓
Vector Database
    ↓
Retrieval
    ↓
LLM Response

Supports contextual question answering over uploaded research papers.

🤖 AI Research Automation

Automated research discovery workflow:

User Topics
      ↓
Scheduled Monitoring
      ↓
arXiv Search
      ↓
AI Summaries
      ↓
Personal Research Feed

Features:

Topic-based research tracking
Automatic paper discovery
AI-generated summaries
Personalized research recommendations

Personalized Research Workspace

Each user has:

Personal uploaded papers
Research history
Saved topics
AI-generated summaries
Custom research dashboard



Tech Stack
Frontend
React
Vite
TailwindCSS
React Router
Axios
Backend
FastAPI
Python
JWT Authentication
APScheduler
AI / LLM / RAG
LLM Integration
RAG Architecture
Embeddings
ChromaDB
PDF Processing Pipeline
Database
MongoDB Atlas
APIs & Services
arXiv API
Resend API
Deployment
Vercel (Frontend)
Render (Backend)
🏗 System Architecture
Frontend (React)
        ↓
FastAPI Backend
        ↓
Authentication Layer
        ↓
Research Automation Engine
        ↓
RAG Pipeline
        ↓
Embeddings + ChromaDB
        ↓
LLM
        ↓
MongoDB + External APIs



Environment Variables

Create .env

MONGO_URL=

JWT_SECRET=

RESEND_API_KEY=

GROQ_API_KEY=

VITE_API_BASE_URL=



roject Workflow
Login
   ↓
Select Research Topics
   ↓
Automatic Paper Discovery
   ↓
AI Summary Generation
   ↓
Upload PDFs
   ↓
Ask Questions
   ↓
Build Research Knowledge Base



Author:

Dhuruv Kumar Gupta
B.Tech CSE (AI/ML) Student