# Backend API Documentation

This document provides the API documentation for the `/users/register` endpoint, which is part of a backend system for user management. The API allows users to register a new account and receive an authentication token upon successful registration.

---

## **Endpoint: `POST /users/register`**

### **Description**
The `/users/register` endpoint is used to create a new user account. It accepts user details, hashes the password securely, and stores the user in the database. Upon successful registration, a JSON Web Token (JWT) and user details are returned.

---

### **Request Specification**

#### **Headers**
| Key            | Value                |
|----------------|----------------------|
| `Content-Type` | `application/json`  |

#### **Request Body**
The body must be in JSON format and include the following fields:

| Field                  | Type   | Required | Description                                  |
|------------------------|--------|----------|----------------------------------------------|
| `fullname`             | Object | Yes      | Object containing the user's name details    |
| `fullname.firstname`   | String | Yes      | First name of the user (min length: 3)       |
| `fullname.lastname`    | String | No       | Last name of the user                        |
| `email`                | String | Yes      | Email address (must be unique, min length: 5)|
| `password`             | String | Yes      | Password (hashed before saving)              |

---

### **Response Specification**

#### **Success Response**
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

#### **Error Responses**

1. **Validation Error**  
   Occurs when the required fields are missing or invalid.  
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
   Occurs if the provided email is already registered.  
   - **Status Code**: `400 Bad Request`
   - **Body**:
     ```json
     {
       "error": "Email address already in use"
     }
     ```

3. **Server Error**  
   A general error during processing.  
   - **Status Code**: `500 Internal Server Error`
   - **Body**:
     ```json
     {
       "error": "Server Error"
     }
     ```

---

### **Implementation Details**

#### **Key Functionalities**
1. **Input Validation**:  
   Validates the request body using `express-validator` to ensure all required fields are correctly formatted.

2. **Password Hashing**:  
   Uses `bcrypt` to hash the user's password before storing it in the database.

3. **Token Generation**:  
   Generates a JWT using `jsonwebtoken` for authentication.

4. **Database Interaction**:  
   - Saves user details to MongoDB.
   - Ensures email uniqueness with proper error handling.

---

### **Example Request and Response**

#### Request:
```http
POST /users/register HTTP/1.1
Content-Type: application/json

{
  "fullname": {
    "firstname": "Jane",
    "lastname": "Doe"
  },
  "email": "janedoe@example.com",
  "password": "securepassword123"
}
```
# User Login API Documentation

## `POST /users/login`

### **Description**
The `/users/login` endpoint allows users to authenticate by providing their email and password. If the credentials are valid, a JSON Web Token (JWT) is returned for session authentication.

---

## **Request Specification**

### **Headers**
| Key            | Value                |
|----------------|----------------------|
| `Content-Type` | `application/json`  |

### **Request Body**
The body must be in JSON format and include the following fields:

| Field      | Type   | Required | Description                                 |
|------------|--------|----------|---------------------------------------------|
| `email`    | String | Yes      | Email address of the user                   |
| `password` | String | Yes      | Password of the user (min length: 8)        |

---

## **Response Specification**

### **Success Response**
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

### **Error Responses**

1. **Validation Error**  
   Occurs if the provided fields are missing or invalid.
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
   Occurs when the email or password does not match any user in the database.
   - **Status Code**: `401 Unauthorized`
   - **Body**:
     ```json
     {
       "error": "Invalid Credentials"
     }
     ```

3. **Server Error**  
   A general server-side error during processing.
   - **Status Code**: `500 Internal Server Error`
   - **Body**:
     ```json
     {
       "error": "Server Error"
     }
     ```

---

## **Implementation Details**

### **Key Functionalities**

1. **Validation**:
   - The request body is validated using `express-validator` to ensure the `email` is in a valid format and the `password` meets the minimum length requirement.

2. **Database Query**:
   - Fetches the user from the database by email. The password field, hidden by default, is explicitly selected using `select("+password")`.

3. **Password Verification**:
   - Uses `bcrypt` to compare the provided password with the hashed password stored in the database.

4. **Token Generation**:
   - A JWT token is generated using the `generateAuthToken` method defined in the `user` model.

5. **Error Handling**:
   - Returns specific errors for invalid inputs, missing user records, and mismatched passwords.

---

## **Example Request and Response**

### **Request**
```http
POST /users/login HTTP/1.1
Content-Type: application/json

{
  "email": "janedoe@example.com",
  "password": "securepassword123"
}
```
