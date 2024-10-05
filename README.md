# Drone Deploy Technical Assessment - Shane Jeon

## Getting Started

### Prerequisites

Ensure you have the following installed on your system:

- [Node.js](https://nodejs.org/) (Version 14 or higher)
- [Python](https://www.python.org/downloads/) (Version 3.8 or higher)
- [npm](https://www.npmjs.com/)
- [pip](https://pip.pypa.io/en/stable/installation/)

### Clone the Repository

```bash
git clone https://github.com/shane-jeon/drone-deploy-tech-assessment-shane-jeon.git
```

Navigate into main project directory:
`cd drone_deploy_technical_assessment_shane_jeon`

### Backend Setup

1. Navigate to `backend` directory:
   `cd backend`

2. Create virtual environment and activate:
   `python3 -m venv venv`
   `source venv/bin/activate` # Linux/Mac
   `venv/Scripts/activate` # Windows

3. Install required dependencies:
   `pip install -r requirements.txt`

4. Create `.env` file in `backend` folder and add your (OpenAI API Key)[https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key]

5. Start Flask backend server:
   `python3 server.py`

Backend server will run on `http://localhost:5000/` by default

### Frontend Setup

1. Navigate to `frontend` directory:
   `cd ../frontend`

2. Install frontend dependencies
   `npm install`

3. Start React development server:
   `npm start`

Frontend server will run on `http://localhost:3000`

## Technologies Used:

- Frontend: React, TypeScript, TailwindCSS
- Backend: Flask, Python, OpenAI API
- Languages: Python, TypeScript
