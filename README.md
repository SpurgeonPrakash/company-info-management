# Company Information Management Web App

This project is a React web application for managing company and office information. The application allows users to create new companies, add offices to existing companies, and view details about each company and its offices.

## Table of Contents
- [Company Information Management Web App](#company-information-management-web-app)
  - [Table of Contents](#table-of-contents)
  - [Setup and Running](#setup-and-running)
  - [Project Structure](#project-structure)
  - [System Design](#system-design)
  - [Company Overview Page](#company-overview-page)
  - [Company Offices Page](#company-offices-page)
  - [Functionality](#functionality)
  - [Implementation](#implementation)
  - [Contributing](#contributing)
  - [License](#license)

## Setup and Running

Before running the app, make sure you install node js and mongodb in your machine or have an account for mongodb.
1. Clone the repository.
2. In your cloned project directory open a terminal and navigate to server directory `cd server`
3. Install dependencies using `npm install`.
4. Replace your env variables with the provided env file.
5. Start the NodeJS server using `npm start`.
6. In another terminal, Navigate to the client directory `cd client`.
7. Install dependencies using `npm install`.
8. Replace your env variables with the provided env file.
9. Start the React app using `npm run dev`.

## Project Structure

The project is structured to maintain cleanliness and clarity. Key directories include:

- `client/src/components`: Contains Shared React components.
- `client/src/pages`: Contains Shared React components.
- `client/src/context`: Manages global state using Context API.
- `client/src/hooks`: Custom hooks for reusable functionality.
- `client/src/util`: Utility functions.

- `server/src/models`: Contains Database Schema Models.
- `server/src/routes`: Contains all the server routes
- `server/src/controllers`: Contains all the core logic to communicate to mongodb and and esend it back to client
- `server/src/middlewares`: Contains all the server middlewares
- `server/src/database`: Contains all the db connection logic using mongoose
- `server/src/app.js`: This is the root server file(Server starts here)

## System Design

This project frontend includes two main pages: "Company Overview" and "Company Offices".
- So, these two pages and their non sharable internal components were located at `client/src/pages/`. 
- For "Comapany Overview" page, all the components were located at `client/src/pages/companies`.
- For "Company Offices" page, all the components were located at `client/src/pages/companyOffices`.
- All the reusable and sharable components like uiElements, formFields, etc., were located at `client/src/components`.
- All the global State managemant logic with context api will be available at `client/src/context`
- All the Custom hooks created by me will be located at `client/src/hooks`.

I used this folder structure, to seperate the **reusable components accross entire app** and **reusable components in individual pages**.  

The system follows a modular design with clear data workflow management using the Context API for state management. The React components are organized to enhance readability, maintainability and reusability.

## Company Overview Page

The "Overview" page allows users to create new companies and view a list of existing companies. Each company widget displays the company's profile information. Users can click on a company widget to view its offices or delete the company by clicking on cross icon.

## Company Offices Page

The "Offices" page displays information about a specific company, including its offices. Users can create new offices for the selected company, and each office widget displays relevant details. Users can delete individual offices by clicking the delete button.

## Functionality

- **Create Company**: Users can create a new company by providing necessary information and clicking the "Create" button. Form validations include checking for empty input fields, positive floor number for revenue, and positive integer values for phone numbers.

- **Create Office**: Users can create a new office for a selected company. Form validations ensure no empty or unselected fields, positive float numbers for location, and a calendar pop-up for selecting the office start date.

- **View Company Details**: Each company widget on the "Company Overview" page is clickable. Clicking on a widget redirects the user to the "Offices" page for that specific company.

- **Delete Company or Office**: Users can delete a company or office by clicking the delete button on the respective widget. A confirmation pop-up appears before deletion.

## Implementation

- **React Stack**: The application is built using the React stack, including React for the UI components and Context API for global state management and used react hooks like useState, useEffect, useCallback, useReducer, useContext, etc.,. All the code will be in latest and greatest functional components only.

- **Modular Components**: Components are designed to be modular to avoid code duplication. Generic components are extracted for reusability.

- **NodeJS Server**: A simple NodeJS server with MongoDB is employed for better data persistence.

## Contributing

Contributions are welcome! Feel free to submit issues or pull requests.

## License

This project is licensed under the [MIT License](LICENSE).
