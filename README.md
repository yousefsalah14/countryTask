# Country & City Management API

## Overview
This project provides an API for managing countries, states, and cities. It includes functionalities for retrieving cities by country, updating countries, and handling related operations efficiently.

## API Documentation
The full API documentation is available on Postman:
[Postman API Documentation](https://documenter.getpostman.com/view/26559151/2sAYdZtZTP#43fb5948-1dc7-46ee-a352-12156749d231)

## Deployed API
The API is deployed and accessible at:
[https://country-task-lyart.vercel.app/](https://country-task-lyart.vercel.app/)

## Project Structure
The project is structured into different directories to maintain modularity and clarity.

### 1. **DB (Database Models)**
   - `models/city.model.js` - Defines the schema for cities.
   - `models/state.model.js` - Defines the schema for states.
   - `models/country.model.js` - Defines the schema for countries.
   - `models/connection.js` - Handles database connection.

### 2. **src (Main Source Directory)**

#### **Middlewares**
   - `validation.middleware.js` - Handles request validation.

#### **Modules** (Handles each model separately)
Each module contains:
   - **Controller**: Handles the business logic.
   - **Routes**: Defines API endpoints.
   - **Schema**: Validation using Joi.

##### Example: City Module
   - `modules/city/city.controller.js` - Handles city-related logic.
   - `modules/city/city.routes.js` - Defines city-related API endpoints.
   - `modules/city/city.schema.js` - Validates city data using Joi.

##### Other Modules
   - `modules/state/` - Handles state-related operations.
   - `modules/country/` - Handles country-related operations.

#### **Utils (Reusable Utility Code)**
   - `asyncHandler.js` - A wrapper function to handle async errors efficiently.
   - `cloud.js` - Manages cloud-related functionalities like file uploads.
   - `fileUpload.js` - Manages file upload configurations.

## Features
- Fetch cities based on a country ID.
- Update country details (name, flag, etc.).
- Efficient error handling using `asyncHandler.js`.
- Modular structure for scalability and maintainability.

## Getting Started
1. Clone the repository.
2. Install dependencies: `npm install`
3. Configure environment variables for database and cloud setup.
4. Run the server: `npm start`

## Summary
This API allows efficient management of countries, states, and cities with proper validation, error handling, and modular design, making it scalable and maintainable.

