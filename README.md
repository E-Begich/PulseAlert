# PulseAlert
📖 Overview

The PulseAlert – Hospital Alert Management System is a web application designed to digitalize, automate, and optimize patient alert and reminder management within healthcare environments.

The system helps medical staff efficiently track patient-related alerts, manage reminders, and ensure timely response to important medical events.

Key features include:

Centralized patient alert management

Automated reminders and notifications

Secure authentication and protected routes

Real-time monitoring of active alerts

Structured data handling and validation

Scalable architecture suitable for healthcare systems

The system improves workflow efficiency, reduces manual tracking, and enhances patient care responsiveness.

📸 Screenshots
Login	Dashboard	Alerts

	
	
Patients	Alert Details	Reminder Management

	
	
⚙️ Technologies

Frontend: React + React Router + TailwindCSS

Backend: Node.js + Express

Database: MySQL via Sequelize ORM

Authentication: JWT (JSON Web Tokens)

Security: bcrypt password hashing

Other: dotenv environment configuration

🛠 Features

Secure user authentication and authorization

Patient alert creation and tracking

Automated reminder management

CRUD operations for alerts and patient records

Data validation for medical data integrity

Protected API routes

Scalable modular backend structure

🏗 System Architecture

Frontend communicates with backend via REST API

Backend handles authentication, business logic, and alert processing

Database stores patient data, alerts, and reminders

Sequelize ORM manages database interaction

Modular design allows independent frontend and backend development

💻 Installation (Local)

Configure database credentials before running the project.

1️⃣ Clone the repository
git clone <your-repository-url>

2️⃣ Install backend dependencies
cd backend
npm install

3️⃣ Configure environment variables

Create a .env file inside the backend folder:

DB_HOST=your_host
DB_USER=your_user
DB_PASS=your_password
DB_NAME=your_database
DB_PORT=3306
PORT=8080
JWT_SECRET=your_secret_key

4️⃣ Seed initial data (optional)
npm run seed

5️⃣ Start backend server
npm run dev


or

npm start


Server runs on the port defined in .env (default 8080).

6️⃣ Navigate to frontend folder
cd frontend
npm install

7️⃣ Start frontend application
npm start


Application runs at:

👉 http://localhost:3000

⚠️ Make sure the backend server is running before starting the frontend.

🔗 API Endpoints (Example)
Method	Endpoint	Description
POST	/auth/login	User login
POST	/auth/register	User registration
GET	/patients	Retrieve patients
POST	/patients	Add new patient
GET	/alerts	Retrieve alerts
POST	/alerts	Create alert
PUT	/alerts/:id	Update alert
DELETE	/alerts/:id	Remove alert
▶️ Usage

Access backend API locally via http://localhost:8080

Login through frontend interface

Manage patients, alerts, and reminders

Monitor active alerts in real time

📝 Notes

Intended primarily for local development and testing

Can be deployed to cloud platforms (Render, Railway, etc.)

Requires MySQL database connection

Ensure environment variables are configured correctly

Initial data can be seeded using provided script
