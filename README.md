# RapidApply Resume Builder

A modern, full-stack resume builder application.

## Project Structure

This project is divided into two main parts:

- **/client**: Next.js frontend application.
- **/server**: Express/Node.js backend application with MongoDB.

## Getting Started

### Prerequisites

- Node.js (v16+)
- MongoDB (running locally or a connection string)

### Installation

From the root directory, install all dependencies:

```bash
npm run install:all
```

### Configuration

#### Backend
1. Go to the `server` directory: `cd server`
2. Create or update the `.env` file based on the template.

#### Frontend
1. Go to the `client` directory: `cd client`
2. (Optional) Configure any frontend environment variables if needed.

### Running the Application

You can run both the client and server concurrently from the root directory:

```bash
npm run dev
```

The frontend will be available at `http://localhost:3000` and the backend at `http://localhost:5000`.

## Features

- **Dynamic Resume Creation**: Build professional resumes with multiple templates.
- **Cover Letter Builder**: Create and manage tailored cover letters.
- **Interactive Dashboard**: Track total resumes, favorites, and recent activity.
- **User Settings**: Customize preferences like default templates and layout.
- **Real-time Preview**: See changes as you type.
- **Export Options**: Download documents in PDF and DOCX formats.
- **Authentication**: Secure user accounts with JWT, including password recovery.
- **Persistent Storage**: Save your data securely to MongoDB.

## Development

- **Client**: Built with Next.js, Tailwind CSS, and Framer Motion.
- **Server**: Built with Express, Mongoose (MongoDB), and TypeScript.
