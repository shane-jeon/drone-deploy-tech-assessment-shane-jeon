# Drone Deploy Technical Assessment - Shane Jeon

This is Shane Jeon's technical assessment for Drone Deploy. Frontend was built with the React framework using TypeScript while the Backend was built with the Python framework Flask. The user will be able to see a table containing the contents of the sample drone metadata. A user input box is available below the table, where the user can query for information related to the table. The user will then receive an AI response from OpenAI's API.

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

2. Activate virtual environment:
   `source venv/bin/activate` # Linux/Mac
   `venv/Scripts/activate` # Windows

3. Install required dependencies:
   `pip install -r requirements.txt`

4. Create `.env` file in `backend` folder and add your [OpenAI API Key](https://help.openai.com/en/articles/4936850-where-do-i-find-my-openai-api-key)

5. Start Flask backend server:
   `python3 server.py`

Backend server will run on `http://localhost:5000/` by default

### Frontend Setup

1. In new terminal, navigate to `frontend` directory:
   `cd frontend`

2. Install frontend dependencies
   `npm install`

3. Start React development server:
   `npm start`

Frontend server will run on `http://localhost:3000`

## Technologies Used:

- Frontend: React, TypeScript, TailwindCSS
- Backend: Flask, Python, OpenAI API
- Languages: Python, TypeScript

### Additional Notes:

- Recommended Dataset included as `drone_data.json` in `backend`

### Known Issues & Limitations

- While table is "sortable", some columns may not sort appropriately due to issues in sorting logic that I was unable to address within the given timeframe. With more time, I would have revisited and addressed these inconsistencies.
- Sorting arrows displayed in table headers are not displaying correctly as there are incomplete styling adjustments when transitioning from CSS to TailwindCSS.
- As responses from OpenAI needed to be formatted in a structured manner for TypeScript, I implemented specific conditions to handle what I hypothesized would be the most common queries. For queries that generate responses that don't fit the defined frontend types, a fallback option is in place to display raw JSON data. This will ensure that the requested information will be displayed accurately, but will lack styling.
- I have replicated cloning the project onto my local computer. I ran into an issue where there was a conflict between the version of `typescript` installed in this assessment and the `typescript` version expected by `react-scripts`. Included a workaround in package.json file, but in off chance errors still arise please reference this [page](https://github.com/facebook/create-react-app/issues/13080) I originally used to debug the error.
