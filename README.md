
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

## **Installation**

1. Clone the repository:
   ```bash
   git clone <repository_url>
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set environment variables:
   - `JWT_SECRET`: Secret key for JWT.
   - `DB_URI`: MongoDB connection string.

4. Start the server:
   ```bash
   npm start
   ```

---

## **License**

This project is licensed under the MIT License.
```
