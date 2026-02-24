# RapidApply Resume Builder - Backend

This is the backend server for the RapidApply Resume Builder, built with Express, Node.js, and MongoDB.

## Features

- **User Authentication**: Secure sign-up and login with JWT and password hashing (bcryptjs).
- **Resume Management**: Complete CRUD operations for resumes.
- **Data Security**: JWT-protected routes ensure users only access their own resumes.
- **TypeScript**: Typed codebase for better development experience and reliability.
- **Modern ESM**: Built using ES Modules for future-proof compatibility.

## Tech Stack

- **Framework**: Express.js
- **Database**: MongoDB with Mongoose
- **Authentication**: JSON Web Tokens (JWT)
- **Security**: Helmet, CORS
- **Logging**: Morgan
- **Language**: TypeScript

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (running locally or on Atlas)

### Installation

1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Configure environment variables:
   Create a `.env` file in the `server` directory (a template is provided as `.env`):
   ```env
   PORT=5000
   MONGODB_URI=mongodb://localhost:27017/resume-builder
   JWT_SECRET=your_jwt_secret_here
   NODE_ENV=development
   ```

### Running the Server

- **Development Mode**: runs with `ts-node-dev` for auto-restarts on changes.
  ```bash
  npm run dev
  ```

- **Production Build**: compiles TypeScript to JavaScript.
  ```bash
  npm run build
  npm start
  ```

## API Endpoints

### Auth
- `POST /api/auth/register`: Create a new user account.
- `POST /api/auth/login`: Authenticate and receive a token.

### Resumes (Protected - requires Bearer Token)
- `GET /api/resumes`: Get all resumes for the logged-in user.
- `POST /api/resumes`: Create a new resume.
- `GET /api/resumes/:id`: Get a specific resume by ID.
- `PUT /api/resumes/:id`: Update an existing resume.
- `DELETE /api/resumes/:id`: Delete a resume.

## License

ISC
