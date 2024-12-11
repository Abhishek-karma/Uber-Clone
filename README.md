
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

## **5. Captain Registration API**

### **Endpoint**: `/captains/register`
**Method**: `POST`

#### **Description**
This endpoint registers a new captain by providing personal and vehicle details.

---

#### **Request Specification**

##### **Headers**
| Key            | Value                |
|----------------|----------------------|
| `Content-Type` | `application/json`  |

##### **Request Body**
The request body must be in JSON format with the following structure:

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

**Field Descriptions**
- `fullname.firstname`: Captain's first name (required, minimum 3 characters)
- `fullname.lastname`: Captain's last name (optional)
- `email`: Captain's email address (required)
- `password`: Captain's password (required, minimum 8 characters)
- `vehicle.color`: Vehicle color (required)
- `vehicle.plate`: Vehicle plate number (required)
- `vehicle.capacity`: Vehicle capacity (required)
- `vehicle.vehicleType`: Vehicle type (required, allowed values: car, motorcycle, auto)

---

#### **Response Specification**

##### **Success Response**
- **Status Code**: `201 Created`
- **Body**:
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
      "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
    }
    ```

##### **Error Responses**

1. **Validation Errors**
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

2. **Captain Already Exists**  
   - **Status Code**: `400 Bad Request`
   - **Body**:
      ```json
      {
        "message": "Captain already exists"
      }
      ```

3. **Server Error**  
   - **Status Code**: `500 Internal Server Error`
   - **Body**:
      ```json
      {
        "message": "An error occurred"
      }
      ```

---

### Notes:
- Ensure that the `JWT_SECRET` environment variable is set for token generation.
- Passwords are hashed before being stored in the database.

