[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)
# PeerPrep

## Table of Contents
- [Introduction](#introduction) 
- [Prerequisites](#prerequisites) 
- [Getting Started](#getting-started) 
	- [Environment variables](#environment-variables)
	- [Frontend](#frontend) 
	- [Backend](#backend) 
- [Usage](#usage) 

## Introduction
PeerPrep is designed to assist students in their technical interview preparation. It offers a platform for finding peers to collaborate and practice whiteboard-style interview questions together.

## Prerequisites
Before getting started with PeerPrep, make sure you have the following prerequisites installed: 
- Node.js 
- npm (Node Package Manager)

## Getting Started
To run the PeerPrep project, you'll need to set up and run both the frontend and backend components.

### Environment variables 
To configure and run the frontend of this project, you'll need to set up environment variables. These variables are stored in a `.env` file.
1.  **Create the `.env` File**
- In the `frontend/` directory, create a file named `.env`

2.  **Define Environment Variables**
- In the `.env` file, define the required environment variables in the following format:
	- VITE_DATABASE_URL=http://localhost:example
	
### Frontend
1. Open a terminal and navigate to the frontend directory: `cd frontend`
2. Install the required dependencies: `npm install`
3. Start the development server: `npm run dev`
4. The frontend will be accessible at the link provided in the terminal.

### Backend
1. Open a terminal and navigate to the backend directory: `cd peerprep-backend`
2. Build the backend server: `mvn clean install`
3. Start the backend server: `mvn spring-boot:run`
4. Detailed information on running the backend can be found [here](https://github.com/CS3219-AY2324S1/ay2324s1-course-assessment-g49/tree/master/peerprep-backend#peerprep-backend)

## Usage

With Peerprep, you can:
- Create questions (title, complexity, category, descrption)
- View details of each question (by clicking on the title)
- View all questions
- Update questions
- Delete questions
