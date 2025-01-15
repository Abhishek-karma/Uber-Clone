
# **Backend API Documentation**

This document provides detailed API documentation for the user management system, including user registration, login, profile access, and logout.

## **1. User Registration API**

### **Endpoint**: `/users/register`
**Method**: `POST`

#### **Description**
This endpoint registers a new user by accepting their details, hashing the password, and returning a JWT along with the user information upon successful registration.

---

#### **Request Specification**

##### **Headers**
| Key            | Value                |
|----------------|----------------------|
| `Content-Type` | `application/json`  |

##### **Request Body**
The body must be in JSON format with the following fields:

| Field                  | Type   | Required | Description                                  |
|------------------------|--------|----------|----------------------------------------------|
| `fullname`             | Object | Yes      | Object containing the user's name details    |
| `fullname.firstname`   | String | Yes      | First name of the user (min length: 3)       |
| `fullname.lastname`    | String | No       | Last name of the user                        |
| `email`                | String | Yes      | Email address (must be unique, min length: 5)|
| `password`             | String | Yes      | Password (hashed before saving)              |

---

#### **Response Specification**

##### **Success Response**
- **Status Code**: `201 Created`
- **Body**:
    ```json
    {
      "token": "<JWT_TOKEN>",
      "user": {
        "_id": "<USER_ID>",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "johndoe@example.com",
        "createdAt": "2024-12-08T12:00:00.000Z",
        "updatedAt": "2024-12-08T12:00:00.000Z"
      }
    }
    ```

##### **Error Responses**
1. **Validation Error**  
   - **Status Code**: `400 Bad Request`
   - **Body**:
      ```json
      {
        "errors": [
          {
            "msg": "Error message",
            "param": "field_name",
            "location": "body"
          }
        ]
      }
      ```

2. **Email Already Exists**  
   - **Status Code**: `400 Bad Request`
   - **Body**:
      ```json
      {
        "error": "Email address already in use"
      }
      ```

3. **Server Error**  
   - **Status Code**: `500 Internal Server Error`
   - **Body**:
      ```json
      {
        "error": "Server Error"
      }
      ```

---

## **2. User Login API**

### **Endpoint**: `/users/login`
**Method**: `POST`

#### **Description**
This endpoint allows users to authenticate by providing their email and password. If the credentials are valid, a JSON Web Token (JWT) is returned for session authentication.

---

#### **Request Specification**

##### **Headers**
| Key            | Value                |
|----------------|----------------------|
| `Content-Type` | `application/json`  |

##### **Request Body**
The body must be in JSON format and include the following fields:

| Field      | Type   | Required | Description                                 |
|------------|--------|----------|---------------------------------------------|
| `email`    | String | Yes      | Email address of the user                   |
| `password` | String | Yes      | Password of the user (min length: 8)        |

---

#### **Response Specification**

##### **Success Response**
- **Status Code**: `200 OK`
- **Body**:
    ```json
    {
      "token": "<JWT_TOKEN>",
      "user": {
        "_id": "<USER_ID>",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "johndoe@example.com",
        "createdAt": "2024-12-08T12:00:00.000Z",
        "updatedAt": "2024-12-08T12:00:00.000Z"
      }
    }
    ```

##### **Error Responses**
1. **Validation Error**  
   - **Status Code**: `400 Bad Request`
   - **Body**:
      ```json
      {
        "errors": [
          {
            "msg": "Error message",
            "param": "field_name",
            "location": "body"
          }
        ]
      }
      ```

2. **Invalid Credentials**  
   - **Status Code**: `401 Unauthorized`
   - **Body**:
      ```json
      {
        "error": "Invalid Credentials"
      }
      ```

3. **Server Error**  
   - **Status Code**: `500 Internal Server Error`
   - **Body**:
      ```json
      {
        "error": "Server Error"
      }
      ```

---

## **3. User Profile API**

### **Endpoint**: `/profile`
**Method**: `GET`

#### **Description**
The `/profile` endpoint retrieves the authenticated user's profile data. This endpoint requires a valid JWT for authentication.

---

#### **Request Specification**

##### **Headers**
| Key            | Value                   |
|----------------|-------------------------|
| `Authorization` | `Bearer <JWT_TOKEN>`   |

#### **Authentication**
The endpoint uses the `authUser` middleware to verify the user's authentication token. If the token is invalid, missing, or blacklisted, access is denied.

---

#### **Response Specification**

##### **Success Response**
- **Status Code**: `200 OK`
- **Body**:
    ```json
    {
      "_id": "<USER_ID>",
      "fullname": {
        "firstname": "John",
        "lastname": "Doe"
      },
      "email": "johndoe@example.com",
      "createdAt": "2024-12-08T12:00:00.000Z",
      "updatedAt": "2024-12-08T12:00:00.000Z"
    }
    ```

##### **Error Responses**

1. **Unauthorized Access**  
   - **Status Code**: `401 Unauthorized`
   - **Body**:
      ```json
      {
        "message": "Unauthorized"
      }
      ```

2. **Invalid Token**  
   - **Status Code**: `401 Unauthorized`
   - **Body**:
      ```json
      {
        "message": "Invalid token",
        "error": "<Error details>"
      }
      ```

---

## **4. User Logout API**

### **Endpoint**: `/logout`
**Method**: `GET`

#### **Description**
The `/logout` endpoint logs the user out by blacklisting the current authentication token and clearing the token cookie, ensuring the token cannot be reused.

---

#### **Request Specification**

##### **Headers**
| Key            | Value                   |
|----------------|-------------------------|
| `Authorization` | `Bearer <JWT_TOKEN>`   |

#### **Authentication**
The endpoint uses the `authUser` middleware to verify the user's authentication token before proceeding with the logout process.

---

#### **Response Specification**

##### **Success Response**
- **Status Code**: `200 OK`
- **Body**:
    ```json
    {
      "message": "Logged Out Successfully"
    }
    ```

##### **Error Responses**

1. **Unauthorized Access**  
   - **Status Code**: `401 Unauthorized`
   - **Body**:
      ```json
      {
        "message": "Unauthorized"
      }
      ```

2. **Invalid Token**  
   - **Status Code**: `401 Unauthorized`
   - **Body**:
      ```json
      {
        "message": "Invalid token",
        "error": "<Error details>"
      }
      ```

---

# Captain Management API

This API is designed to manage captains, including registration, login, profile access, and logout. It uses Express.js for routing, `express-validator` for request validation, and JSON Web Tokens (JWT) for authentication.

---

## **Routes**

### **1. Register a New Captain**

**Endpoint**: `/register`  
**Method**: `POST`  

#### **Validation Rules**
- `email`: Must be a valid email address.
- `fullname.firstname`: Must be at least 3 characters long.
- `password`: Must be at least 8 characters long.
- `vehicle.color`: Must be at least 3 characters long.
- `vehicle.plate`: Must be at least 3 characters long.
- `vehicle.capacity`: Must be at least 1.
- `vehicle.vehicleType`: Must be one of `car`, `motorcycle`, or `auto`.

#### **Request Body**
```json
{
  "fullname": {
    "firstname": "John",
    "lastname": "Doe"
  },
  "email": "johndoe@example.com",
  "password": "password123",
  "vehicle": {
    "color": "red",
    "plate": "ABC123",
    "capacity": 4,
    "vehicleType": "car"
  }
}
```

#### **Response**
- **Success (201)**:
    ```json
    {
      "captain": {
        "_id": "64b1f9f95d5c9e8f70db6c76",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "johndoe@example.com",
        "vehicle": {
          "color": "red",
          "plate": "ABC123",
          "capacity": 4,
          "vehicleType": "car"
        },
        "status": "inactive",
        "createdAt": "2024-12-08T12:00:00.000Z",
        "updatedAt": "2024-12-08T12:00:00.000Z"
      },
      "token": "<JWT_TOKEN>"
    }
    ```
- **Validation Errors (400)**:
    ```json
    {
      "errors": [
        {
          "msg": "Error message",
          "param": "field_name",
          "location": "body"
        }
      ]
    }
    ```

---

### **2. Login a Captain**

**Endpoint**: `/login`  
**Method**: `POST`  

#### **Validation Rules**
- `email`: Must be a valid email address.
- `password`: Must be at least 8 characters long.

#### **Request Body**
```json
{
  "email": "johndoe@example.com",
  "password": "password123"
}
```

#### **Response**
- **Success (200)**:
    ```json
    {
      "captain": {
        "_id": "64b1f9f95d5c9e8f70db6c76",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "johndoe@example.com"
      },
      "token": "<JWT_TOKEN>"
    }
    ```
- **Error (400)**: Invalid email or password.

---

### **3. Get Captain Profile**

**Endpoint**: `/profile`  
**Method**: `GET`  
**Authentication**: Requires a valid JWT token.

#### **Response**
- **Success (200)**:
    ```json
    {
      "captain": {
        "_id": "64b1f9f95d5c9e8f70db6c76",
        "fullname": {
          "firstname": "John",
          "lastname": "Doe"
        },
        "email": "johndoe@example.com",
        "vehicle": {
          "color": "red",
          "plate": "ABC123",
          "capacity": 4,
          "vehicleType": "car"
        },
        "status": "inactive"
      }
    }
    ```
- **Error (401)**: Unauthorized.

---

### **4. Logout a Captain**

**Endpoint**: `/logout`  
**Method**: `GET`  
**Authentication**: Requires a valid JWT token.

#### **Response**
- **Success (200)**:
    ```json
    {
      "message": "Logout Successfully"
    }
    ```
- **Error (401)**: Unauthorized.

---

## **Authentication Middleware**

### `authCaptain`
This middleware verifies the JWT token and checks if the token is blacklisted.

- If the token is valid and not blacklisted, the middleware adds the `captain` object to the `req` object.
- If the token is invalid, missing, or blacklisted, it returns a `401 Unauthorized` response.

---

## **Models**

### `CaptainModel`
- Stores captain information, including name, email, hashed password, and vehicle details.
- Implements methods for password hashing (`hashPassword`) and comparison (`comparePassword`).

### `BlacklistedToken`
- Tracks blacklisted JWT tokens to ensure logged-out users cannot reuse their tokens.

---

## **Services**

### `captainService`
Handles business logic for creating and managing captains.

---

## **Error Handling**

Validation and authentication errors are captured and returned in a structured JSON format. Server errors are logged and return a `500 Internal Server Error` response.

---


### 1. **GET /coordinates**
#### Description:
Fetches the geographical coordinates (latitude and longitude) for a given address.

#### Request Parameters:
- `address`: The address to get coordinates for.

#### Response:
- **200 OK**: Returns an object with the coordinates (lat, lng).
  ```json
  {
    "lat": 40.712776,
    "lng": -74.005974
  }
  ```
- **400 Bad Request**: If validation fails.
  ```json
  {
    "errors": [
      { "msg": "Address is required", "param": "address", "location": "query" }
    ]
  }
  ```
- **404 Not Found**: If the coordinates cannot be fetched.
  ```json
  {
    "message": "Coordinates not found"
  }
  ```

### 2. **GET /distance-time**
#### Description:
Fetches the distance and time between two locations (origin and destination).

#### Request Parameters:
- `origin`: The starting point address.
- `destination`: The destination address.

#### Response:
- **200 OK**: Returns an object with distance and duration details.
  ```json
  {
    "distance": {
      "text": "10 km",
      "value": 10000
    },
    "duration": {
      "text": "20 mins",
      "value": 1200
    }
  }
  ```
- **400 Bad Request**: If validation fails.
  ```json
  {
    "errors": [
      { "msg": "Origin and destination are required", "param": "origin", "location": "query" }
    ]
  }
  ```
- **500 Internal Server Error**: If the server encounters an issue.
  ```json
  {
    "message": "Internal server error"
  }
  ```

### 3. **GET /autocomplete-suggestions**
#### Description:
Provides autocomplete suggestions for a given input (e.g., address or place name).

#### Request Parameters:
- `input`: The input string to search for.

#### Response:
- **200 OK**: Returns an array of predictions for autocomplete.
  ```json
  [
    {
      "description": "New York, NY, USA",
      "place_id": "ChIJOwg_06VPYzAR6Yfu3j5g3uw",
      "types": ["geocode"]
    },
    {
      "description": "New Jersey, USA",
      "place_id": "ChIJyQ64KiVZt4kRZ2XGtsYkF9w",
      "types": ["geocode"]
    }
  ]
  ```
- **400 Bad Request**: If validation fails.
  ```json
  {
    "errors": [
      { "msg": "Input is required", "param": "input", "location": "query" }
    ]
  }
  ```
- **500 Internal Server Error**: If the server encounters an issue.
  ```json
  {
    "message": "Internal server error"
  }
  ```

---

## Ride Management Routes

### 4. **POST /ride**
#### Description:
Creates a new ride with the given user, pickup, destination, and vehicle type.

#### Request Body:
- `userId`: ID of the user requesting the ride.
- `pickup`: The pickup location address.
- `destination`: The destination address.
- `vehicleType`: The type of vehicle requested (e.g., `auto`, `car`, `motorcycle`).

#### Response:
- **201 Created**: Returns the ride details.
  ```json
  {
    "_id": "rideId",
    "user": "userId",
    "pickup": "Pickup Location",
    "destination": "Destination Location",
    "otp": "123456",
    "fare": 200
  }
  ```
- **400 Bad Request**: If validation fails.
  ```json
  {
    "errors": [
      { "msg": "All fields are required", "param": "pickup", "location": "body" }
    ]
  }
  ```
- **500 Internal Server Error**: If there’s an issue in the process.
  ```json
  {
    "message": "An error occurred while creating the ride"
  }
  ```

### 5. **POST /ride/confirm**
#### Description:
Confirms the ride and assigns a captain (driver).

#### Request Body:
- `rideId`: The ID of the ride to confirm.

#### Response:
- **200 OK**: Returns the confirmed ride details with captain assigned.
  ```json
  {
    "_id": "rideId",
    "user": { "name": "John Doe" },
    "captain": { "name": "Captain Jack" },
    "status": "accepted"
  }
  ```
- **400 Bad Request**: If validation fails.
  ```json
  {
    "errors": [
      { "msg": "Ride ID is required", "param": "rideId", "location": "body" }
    ]
  }
  ```
- **500 Internal Server Error**: If an error occurs while confirming the ride.
  ```json
  {
    "message": "Error confirming ride"
  }
  ```

### 6. **POST /ride/start**
#### Description:
Starts the ride by validating the OTP.

#### Request Parameters:
- `rideId`: The ID of the ride.
- `otp`: The OTP to verify.

#### Response:
- **200 OK**: Returns the ride details after starting.
  ```json
  {
    "_id": "rideId",
    "status": "ongoing",
    "user": { "name": "John Doe" },
    "captain": { "name": "Captain Jack" }
  }
  ```
- **400 Bad Request**: If OTP or ride ID is missing or invalid.
  ```json
  {
    "errors": [
      { "msg": "OTP is required", "param": "otp", "location": "query" }
    ]
  }
  ```
- **500 Internal Server Error**: If an error occurs during the ride start process.
  ```json
  {
    "message": "Error starting the ride"
  }
  ```

### 7. **POST /ride/end**
#### Description:
Ends the ride.

#### Request Body:
- `rideId`: The ID of the ride to end.

#### Response:
- **200 OK**: Returns the ride details after completion.
  ```json
  {
    "_id": "rideId",
    "status": "completed",
    "user": { "name": "John Doe" },
    "captain": { "name": "Captain Jack" }
  }
  ```
- **400 Bad Request**: If validation fails.
  ```json
  {
    "errors": [
      { "msg": "Ride ID is required", "param": "rideId", "location": "body" }
    ]
  }
  ```
- **500 Internal Server Error**: If an error occurs while ending the ride.
  ```json
  {
    "message": "Error ending the ride"
  }
  ```

---

## Utility Functions

### **Fare Calculation**
The backend calculates fare based on distance, duration, and vehicle type. The fare is structured as:
- `auto`, `car`, `motorcycle`: Each vehicle type has a different base fare, per km rate, and per-minute rate.

### **OTP Generation**
An OTP is generated for each ride, which is used to validate the ride start process.

---

### Environmental Variables
Ensure to have the following environment variables set in your `.env` file:

- `GOOGLE_MAPS_API`: Your Google Maps API key.

---

## Setup & Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/your-repo
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Set up your environment variables in `.env`:
   ```bash
   GOOGLE_MAPS_API=your-google-maps-api-key
   ```

4. Start the server:
   ```bash
   npm start
   ```

---

This README provides a summary of all routes and expected behavior, making it easier for developers to understand and integrate with the backend.
```
