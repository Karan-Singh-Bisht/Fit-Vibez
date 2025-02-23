# User Authentication API

## Overview

This documentation provides an overview of the API endpoints for user authentication, including registration, login, logout, and profile retrieval. The backend is built using **Node.js and Express**, and it uses **JWT** for authentication.

## Table of Contents

- [Endpoints](#endpoints)
  - [Register User](#1-register-user)
  - [Login User](#2-login-user)
  - [Logout User](#3-logout-user)
  - [Get User Profile](#4-get-user-profile)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [License](#license)

## Endpoints

### 1. **Register User**

- **Endpoint:** `/api/v1/user/register`
- **Method:** `POST`
- **Description:** Registers a new user.
- **Request Body:**
  ```json
  {
    "userName": {
      "firstName": "string", // First name of the user
      "lastName": "string" // Last name of the user
    },
    "email": "string", // Email address of the user
    "password": "string" // Password for the user account
  }
  ```
- **Responses:**
  - **201 Created:** User registered successfully.
    ```json
    {
      "token": "string", // JWT token
      "newUser": {
        "_id": "string",
        "userName": {
          "firstName": "string",
          "lastName": "string"
        },
        "email": "string"
      }
    }
    ```
  - **400 Bad Request:** Missing or invalid parameters.
    ```json
    {
      "message": "string" // Error message
    }
    ```
  - **500 Internal Server Error:** Error registering the user.
    ```json
    {
      "error": "string" // Error message
    }
    ```

### 2. **Login User**

- **Endpoint:** `/api/v1/user/login`
- **Method:** `POST`
- **Description:** Logs in an existing user.
- **Request Body:**
  ```json
  {
    "email": "string", // Email address of the user
    "password": "string" // Password for the user account
  }
  ```
- **Responses:**
  - **200 OK:** User logged in successfully.
    ```json
    {
      "token": "string", // JWT token
      "userDetails": {
        "_id": "string",
        "userName": {
          "firstName": "string",
          "lastName": "string"
        },
        "email": "string"
      }
    }
    ```
  - **400 Bad Request:** Missing or invalid parameters.
    ```json
    {
      "message": "string" // Error message
    }
    ```
  - **401 Unauthorized:** Invalid email or password.
    ```json
    {
      "message": "string" // Error message
    }
    ```
  - **500 Internal Server Error:** Error logging in the user.
    ```json
    {
      "error": "string" // Error message
    }
    ```

### 3. **Logout User**

- **Endpoint:** `/api/v1/user/logout`
- **Method:** `GET`
- **Description:** Logs out the current user.
- **Headers:**
  ```http
  Authorization: Bearer <token> // JWT token
  ```
- **Responses:**
  - **200 OK:** User logged out successfully.
    ```json
    {
      "message": "Logged out successfully"
    }
    ```
  - **401 Unauthorized:** User is not authenticated.
    ```json
    {
      "message": "Unauthorized"
    }
    ```
  - **500 Internal Server Error:** Error logging out the user.
    ```json
    {
      "message": "Unauthorized"
    }
    ```

### 4. **Get User Profile**

- **Endpoint:** `/api/v1/user/profile`
- **Method:** `GET`
- **Description:** Retrieves the profile of the current user.
- **Headers:**
  ```http
  Authorization: Bearer <token> // JWT token
  ```
- **Responses:**
  - **200 OK:** User profile retrieved successfully.
    ```json
    {
      "user": {
        "_id": "string",
        "userName": {
          "firstName": "string",
          "lastName": "string"
        },
        "email": "string"
      }
    }
    ```
  - **403 Forbidden:** User is not authorized.
    ```json
    {
      "message": "Unauthorized"
    }
    ```
  - **404 Not Found:** User not found.
    ```json
    {
      "message": "User not found"
    }
    ```
  - **500 Internal Server Error:** Error retrieving the user profile.
    ```json
    {
      "message": "string" // Error message
    }
    ```

## Environment Variables

Ensure the following environment variables are set in the `.env` file for the application to function correctly:

```
JWT_SECRET=your-jwt-secret
DB_URI=your-database-uri
PORT=your-server-port
```

## Running the Application

To start the application, use the following command:

```
node app.js
```

The server will start and listen on the port specified in the environment variables or default to port 3000.

# Tracking Activities API

## Overview

This documentation provides an overview of the API endpoints for tracking user activities such as curls, push-ups, and squats. The backend is built using **Node.js and Express**, and it interacts with an **Ethereum smart contract** to mark goals as completed and claim rewards.

## Table of Contents

- [Endpoints](#endpoints)
  - [Track Curls](#1-track-curls)
  - [Track Push-ups](#2-track-push-ups)
  - [Track Squats](#3-track-squats)
- [Environment Variables](#environment-variables)
- [Running the Application](#running-the-application)
- [License](#license)

## Endpoints

### 1. Track Curls

- **Endpoint:** `/api/v1/track/curls`
- **Method:** `POST`
- **Description:** Tracks the number of curls performed by a user and marks the goal as completed if the count is 5 or more.
- **Request Body:**
  ```json
  {
    "userAddress": "string", // Ethereum address of the user
    "curlCount": "number" // Number of curls performed
  }
  ```
- **Responses:**
  - **200 OK:** Goal marked as completed.
    ```json
    {
      "status": 200,
      "success": true,
      "txHash": "string" // Transaction hash of the Ethereum transaction
    }
    ```
  - **400 Bad Request:** Missing or invalid parameters.
    ```json
    {
      "error": "User address and curl count are required"
    }
    ```
  - **500 Internal Server Error:** Error setting the goal.
    ```json
    {
      "error": "string" // Error message
    }
    ```

### 2. Track Push-ups

- **Endpoint:** `/api/v1/track/pushups`
- **Method:** `POST`
- **Description:** Tracks the number of push-ups performed by a user and marks the goal as completed if the count is 5 or more.
- **Request Body:**
  ```json
  {
    "userAddress": "string", // Ethereum address of the user
    "pushupCount": "number" // Number of push-ups performed
  }
  ```
- **Responses:**
  - **200 OK:** Goal marked as completed.
    ```json
    {
      "status": 200,
      "success": true,
      "txHash": "string" // Transaction hash of the Ethereum transaction
    }
    ```
  - **400 Bad Request:** Missing or invalid parameters.
    ```json
    {
      "error": "User address and push-up count are required"
    }
    ```
  - **500 Internal Server Error:** Error setting the goal.
    ```json
    {
      "error": "string" // Error message
    }
    ```

### 3. Track Squats

- **Endpoint:** `/api/v1/track/squats`
- **Method:** `POST`
- **Description:** Tracks the number of squats performed by a user and marks the goal as completed if the count is 5 or more.
- **Request Body:**
  ```json
  {
    "userAddress": "string", // Ethereum address of the user
    "squatCount": "number" // Number of squats performed
  }
  ```
- **Responses:**
  - **200 OK:** Goal marked as completed.
    ```json
    {
      "status": 200,
      "success": true,
      "txHash": "string" // Transaction hash of the Ethereum transaction
    }
    ```
  - **400 Bad Request:** Missing or invalid parameters.
    ```json
    {
      "error": "User address and squat count are required"
    }
    ```
  - **500 Internal Server Error:** Error setting the goal.
    ```json
    {
      "error": "string" // Error message
    }
    ```

## Environment Variables

Ensure the following environment variables are set in the `.env` file for the application to function correctly:

```
RPC_URL=your-rpc-url
CONTRACT_ADDRESS=your-smart-contract-address
PRIVATE_KEY=your-private-key
```
