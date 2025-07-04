Transaction App

This is a full-stack web application designed to simulate a transaction platform, featuring secure user authentication, atomic operations, and a user directory with search functionality. Users can sign up, sign in, view dummy account balances, and discover other users on the platform.

✨ Features
User Authentication:

Sign Up: New users can create an account.

Sign In: Registered users can securely log in.

JWT Authentication: Secure token-based authentication for protecting routes and user data.

Atomicity: Ensures that all transactions are processed reliably, either completing entirely or failing completely, maintaining data integrity.

User Directory & Search:

Logged-in users can view a list of other registered users.

Powerful search functionality to find desired users quickly.

Dummy Account Amounts: Users can view a simulated amount in their account, providing a basic representation of funds.

Responsive Design: (Assuming this is true, common for modern web apps) The application is designed to be accessible and user-friendly across various devices and screen sizes.

🚀 Technologies Used
This project leverages a modern full-stack architecture:

Frontend
React.js: A declarative, component-based JavaScript library for building interactive user interfaces.

Tailwind CSS: (Assuming you used it, as in your previous project) A utility-first CSS framework for rapid and flexible UI development.

Backend
Node.js with Express: A powerful JavaScript runtime and a fast, unopinionated, minimalist web framework for building robust APIs.

Custom JWT Implementation: Secure token-based authentication handled with a custom implementation.

Database
MongoDB: A NoSQL, document-oriented database used for flexible and scalable data storage.

⚙️ Installation & Setup
To get this project running on your local machine, follow these steps:

Clone the repository:

git clone https://github.com/MehranKhn/Fullstack-transaction-app.git
cd Fullstack-transaction-app

Frontend Setup:

cd frontend 
npm install 

The frontend will typically run on http://localhost:3000.

Backend Setup:

Navigate to the backend directory:

cd ../backend 

Install backend dependencies:

npm install
