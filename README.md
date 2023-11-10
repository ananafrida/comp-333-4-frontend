# COMP333 Assignment 4

This README provides information on our React-Native Frontend for Assignment 4 for COMP 333: Software Engineering at Wesleyan University.

## Project Overview

In this assignment, we have developed a a React-Native frontend for that seamlessly integrates with our PHP/MySQL backend created in Assignment 3, via a REST API. The app allows users to manage a list of songs, including creating, reading, updating, and deleting songs. The frontend provides a user-friendly interface to interact with the database.

### Learning Goals Achieved

In this project, we have achieved the following learning goals:

1. Designed and implemented a cross-platform app using JavaScript and React-Native.
2. Utilized the Model-View-Controller (MVC) design pattern to create a Representational State Transfer (REST) API for frontend-backend communication.
3. Gained experience with build tools, package managers, and integrating third-party code.

## Setup and Run the Frontend

Follow the instructions below to set up and run the frontend of our app in a local development environment.

1. **Clone the Repository**: Clone this repository to your local machine:

   ```shell
   git clone https://github.com/ananafrida/comp-333-4-frontend.git
2. **Navigate to the Frontend Directory:** 
    cd comp-333-4-frontend
3. **Install Dependencies: Install the required dependencies using npm:** npm install
4. **Run the Backend Development Server:** Make sure you have [The REST Backend](https://github.com/n-aggarwal/comp-333-3-backend), and have set it up as per the instructions in the Readme.
5. **Change the IP address in the requests to query YOUR backend:** Find your laptop's IP address and change the given IP address in requests to your IP address.
5. **Start the development server for the frontend:** npm start
5. **Accessing the app** There are multiple different options for this, you can access it using an android emulator (a), ios emulator (i), or scan the QR code using the expo go app on your phone.

## MVC Architecture and REST API

Our app follows the Model-View-Controller (MVC) design pattern, which separates the software's business logic, display, and controlling logic.

- **Model**: Manages data (e.g., SongModel.js, UserModel.js).
- **View**: Handles layout and display (e.g., React components).
- **Controller**: Routes commands to the model and view, handles business logic (REST API via index.php).

## Feature Implementation

In addition to the required CRUD operations, we have implemented **Search functionality**. The search functionality allows the users to search for songs and artists by using fuzzy search.

## Team Contribution

Assuming all the tasks are completed by the assigned member, the contribution for this project is as follows:
<br />
<br />
Nishant Aggarwal ([@n-aggarwal](https://github.com/n-aggarwal)): 50% <br />
Anan Afrida ([@ananafrida](https://github.com/ananafrida)): 50%