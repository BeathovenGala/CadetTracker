## Cadet Tracker

## A Project for Students, by a Student

## 📄 What I Am

Cadet Tracker is a modern, secure, and intuitive attendance and event management system designed to replace manual record-keeping for cadet units. It is built to be a practical tool for administrators to track attendance in real-time and an educational blueprint for other developers to learn from its architecture and development journey.

## 🌟 The Spark: Solving a Real-World Problem

**Cadet Tracker** was born from a frustrating, real-world problem I faced every week.[1] In an organization with over 1.7 million cadets, a manual system with a pen and paper was used to track attendance. Every Saturday, around 120 cadets would come for training, and the process was slow and tedious. Taking roll call, transferring data to a ledger, and then manually verifying attendance records for eligibility—it was inefficient and error-prone. What's more, there was no real-time way to give a total count before a parade could start.

The idea for Cadet Tracker was simple: replace this outdated, manual process with a modern, secure, and intuitive digital platform. This project isn't just about building an application; it's a blueprint of my development journey, from identifying a genuine need to architecting a functional solution that tackles the practical challenges head-on.[1]

## 💻 The Tech: A Deep Dive into the Code's Value

This project was a full-stack challenge, designed to be both robust and scalable in the future. Here’s a look under the hood at the technical decisions that matter most for a Minimum Viable Product (MVP).[1]

### Architecture & Technology Stack

This is a full-stack application with a clear separation between the frontend and backend. We chose a Node.js backend because it's lightweight and efficient for building the RESTful API.[2] The database is MongoDB, a flexible NoSQL database that's perfect for a project where the data schema might evolve.[2] The frontend is built with vanilla HTML, CSS, and JavaScript, ensuring a low-overhead, fast user interface.

  * **Backend:** Node.js with Express.js for a robust and scalable API.
  * **Database:** MongoDB, with Mongoose for schema management.
  * **Security:** JSON Web Tokens (JWT) for secure user sessions and `bcrypt` for one-way password hashing.[1]
  * **QR Codes:** The `uuid` library for generating unique, single-use identifiers for attendance.

### Why this stack?

Choosing the right technology stack is crucial for building a project that can scale and evolve. For a real-world application like this, we focused on security first because we're handling sensitive user data. We chose `bcrypt` for password hashing and JSON Web Tokens (JWT) for authentication to make sure user data is protected and only authenticated users can access certain parts of the app. The architecture was built to handle growth and future features. This was a strategic decision to ensure the app is a secure foundation, not just a basic implementation.

## Features & API

The application is architected as a full-stack system with a clear separation between the frontend and backend, providing distinct but interconnected functionalities for each user role.

### Frontend Features

  * **Modular UI Components:** The frontend is built with React and uses a modular file structure, with separate files for pages and reusable UI components.
  * **Role-Based Login:** A single login page can be used by both cadets and administrators, with the UI and API calls dynamically changing based on the user's role.
  * **Registration Form:** A complete registration form allows new cadets to sign up with all the required details, such as name, regimental number, unit, and college.
  * **Dashboard UI:** The frontend includes a basic dashboard for both cadets and administrators, displaying information and providing tools based on their roles.
  * **API Integration:** The frontend is set up to communicate with all the backend APIs for login, registration, and dashboard data using fetch requests.

### Backend Features 

  * **Project Structure:** The project uses a modular architecture with a clear separation of concerns, organized into models, routes, utils, and server directories.
  * **Database Management:** A single User model handles both cadets and administrators in a unified MongoDB collection, improving scalability and simplifying data management. The Parade model stores event-specific data and uses database references for attendees.
  * **Secure Authentication:** Passwords are not stored in plain text. Instead, `bcryptjs` is used to create one-way, irreversible password hashes. User sessions are managed with secure JSON Web Tokens (JWTs).
  * **Middleware:** The application uses custom middleware to protect routes. The `protect` middleware ensures that only authenticated users can access specific endpoints, while `adminProtect` enforces role-based access control by checking for the 'admin' role.
  * **RESTful API:** The backend provides a set of well-defined API endpoints: `/register` and `/login` for user authentication; `/admin/parades` for creating new parade events (admin-only); `/api/cadet/dashboard` for fetching a cadet's personalized attendance data; and `/api/admin/parades/:id` for retrieving detailed parade statistics.
  * **Error Handling:** The code includes `try...catch` blocks to gracefully handle potential errors during database operations and API requests.
  * **Environment Variables:** Sensitive information like the database connection string and JWT secret are stored in a `.env` file, a critical security practice for deployment.

## 🚀 Getting Started

To set up and run the "Cadet Tracker" project locally, follow these steps.

### Prerequisites

Ensure the following software is installed on your system:

  * Node.js
  * MongoDB

### Installation

Clone the repository and install the dependencies for both the frontend and backend.

```bash
# Clone the repository
git clone <repository_url>

# Navigate to the project directory
cd CadetTracker

# Install backend dependencies
cd backend
npm install

# Install frontend dependencies
cd../frontend
npm install
```

### Running the Project

The project requires both the database and the backend server to be running before launching the frontend.

1.  Start your MongoDB server. You need to run `mongod` and then `mongosh`.
2.  Start the backend server by running `node index.js` from the backend directory.
3.  Start the frontend application by running `npm start` from the frontend directory.
4.  Fourth and foremost follow the Log of learnings

## 🧠 The Journey: How to Learn from This Project

A project's true value isn't just in the final code, but in the lessons learned along the way. This project is an opportunity for you to follow along with my development journey. I took notes on the challenges I faced and the solutions I found.

Below is a detailed `Log of Learnings` that chronicles my journey. You can also use the `git` commit history to see how the project evolved over time.[3] A good `git` log can guide you by including bug fixes and upgrades as they happened. You can compare different versions of the code to see what changed at each step, and by looking at the messages, you can understand the reasoning behind each change, as a `git` commit is a snapshot of the files at a specific moment.[4]

Here is a log of each step, including the functionality added, what I learned, and how I resolved errors.

| Serial No. | Git Message | Functionality Added | What We Learned | Errors & Resolutions |
|:---|:---|:---|:---|:---|
| 1 | server setup | made basic | | |
| 2 | basic routes login n register | added routes for login and register | | |
| 3 | route for mongodb | added route for mongoose and install | | |
| 4 | Cadet module added basic | made module for cadet registration | install Mongoose using powershell, npm installer choco, can increase default time of downloading in windows e.g. 7200ms | |
| 5 | Added funtion to loginnRegister Routes | enhance functionality of the routes, like handling a login request by checking if a cadet with the given credentials exists in the database.server | Async and await, mongoose.model('name\_of\_model', 'schema') | at Object. (C:\\Users\\nseg.lcl\\Documents\\CadetTracker models\\Cadet.js: |
| 6 | hashing pass before save | hashing before saving to cadet.js model | there is something as pre save | |
| 7 | route corrected for hasing | check hashed password in db to pass being entered | | |
| 8 | JWT | building a security | Tokens and sessions | |
| 9 | utils token and auth | utils token and auth | abstraction implemented, middleware functionality | |
| 10 | admin model | admin o | we can abstract the schema DRY | |
| 11 | admin working | admin middleware and jwt admin | | |
| 12 | adminProtect/admin Route | Role based authentication admin can login | | |
| 13 | parade Route | | we can use create or create instance of the model | |
| 14 | qrcode, attendance route, funcutils, | UUID implementation, able to see gender | | |
| 15 | college sdsw | and college data on dashboard | | |
| 16 | env & paths & frontend setup | want to seperate frontend and relative paths are backend so have to make the env something as pathintelisense set we need to use relative paths | | |
| 17 | first run | for frontend then node inex for backend | need to run mongod then npm start | |
| 18 | errorDebug ps | | | mongo\_url instead of URI, distance function defined twice |
| 19 | Login Succes-jwtFix, DataType istmatch | | | need to run mongosh also make dataToSend type mismatch, problem setting admin can change role so update via mongodb |
| 20 | user Route | db.users.updateOne({ regimentalNo: ""your\_cadet's\_regimental\_number"", $set: role: ""admin"") });use cadet-tracker | dashboard rolebased correct ui | |

## 🔭 The Future: A Strategic Roadmap

The vision for Cadet Tracker extends far beyond its current state. I believe this project has the potential for real-world adoption, and a strong roadmap is essential for making that happen.[1]

  * **Dynamic Attendance:** We plan to implement a dynamic, one-time scannable QR code for each cadet with auto-scroll to prevent sharing and GPS spoofing. This would be a major leap in security and data integrity.[1]
  * **Email Verification:** Implement a system to send a verification email to new registrants via their unit's official mail.[1]
  * **Automated Verification:** The system could automatically determine a cadet's enrollment year and eligibility based on their entry date and exam schedule.[1]
  * **Wider Adoption:** Expand the application to support schools in addition to colleges.
  * **Communication Channel:** The cadet dashboard will include a real-time communication channel to deliver messages about ongoing parades and events.[1]
  * **Rank Holder Display:** Display a list of college rank holders with their explicit consent.[1]
  * **Camps Attendance:** The system could be expanded to handle large events where hundreds of cadets attend and attendance needs to be taken twice a day.

## 🤝 How to Contribute

We welcome contributions to this project\! If you're interested in helping, here's how you can get started:

  * **Fork the repository:** Fork this repository to your own GitHub account.
  * **Clone the repository:** Clone your forked repository to your local machine.
  * **Make your changes:** Create a new branch, add your new features or bug fixes, and ensure your code follows the existing style.
  * **Create a Pull Request (PR):** Submit a pull request to the main repository for review. Please provide a clear description of the changes in your PR.