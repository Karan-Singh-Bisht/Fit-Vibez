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
