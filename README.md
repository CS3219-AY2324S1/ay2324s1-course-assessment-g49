[![Review Assignment Due Date](https://classroom.github.com/assets/deadline-readme-button-24ddc0f5d75046c5622901739e7c5dd533143b0c8e959d652212380cedb1ea36.svg)](https://classroom.github.com/a/6BOvYMwN)
# PeerPrep

## Table of Contents
- [Introduction](#introduction) 
- [Features](#features)
- [Prerequisites](#prerequisites) 
- [Getting Started](#getting-started) 
	- [Environment variables](#environment-variables)
	- [Frontend](#frontend) 
	- [Backend](#backend) 

## Introduction
PeerPrep is designed to assist students in their technical interview preparation. It offers a platform for finding peers to collaborate and practice whiteboard-style interview questions together.

PeerPrep is deployed and can be visited online at: https://frontend-dot-peerprep-399116.as.r.appspot.com/

## Features
With Peerprep, you can:
- View coding questions from the Questions Repository
- Update, Delete or Edit the questions with admin account
- Match with another peer based on selected question type and complexity
- Edit and run code with peer in a collaborative code editor
- Communicate with peer using chat or video in the collaboration space 


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
	
### Running the application

Run all at once
```
cd backend/peerprep-api-gateway
mvn clean package
cd ../..
cd backend/peerprep-question-service
mvn clean package
cd ../..
cd backend/peerprep-session-service
mvn clean package
cd ../..
cd backend/peerprep-matching-service
mvn clean package
cd ../..
docker compose up
```

Stop application:
```
docker compose down --rmi all
```

## Using Peerprep on production
Website: https://frontend-dot-peerprep-399116.as.r.appspot.com/
We have provided an admin account on production for testing purposes
```
username: admin
password: password
```