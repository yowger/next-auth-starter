**Next.js Authorization Starter Kit**

This project is a Next.js authentication system developed using modern web technologies, including Next.js, TypeScript, and PostgreSQL with Prisma. It aims to provide secure and reliable user authentication features for web applications.

### Technologies Used

-   **Next.js**
-   **TypeScript**
-   **PostgreSQL with Prisma**
-   **Next-Auth**
-   **Zod**

### Key Features

-   **Authentication System**: The core focus of this project is to implement a robust authentication system. It handles user registration, login, password management, and session management.

-   **Next-Auth Authentication**: The project integrates Next-Auth for seamless and customizable authentication workflows. Next-Auth simplifies the process of implementing various authentication providers, including email/password, social logins, and more.

-   **Zod Type Safety**: The project benefits from Zod type safety, ensuring that data input and validation are consistently handled with strong typing, reducing the likelihood of type-related errors.runtime errors.

# API Endpoints

## Login

### GET

-   [/api/users/:id](#get-apiusersid)

## Register

### POST

-   [/api/register](#post-apiregister)

---

### GET /api/users/:id

Get user information by their unique ID.

**Responses**

-   `200 OK` - Successful retrieval with user data.

    ```json
    {
        "user": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com"
        }
    }
    ```

-   `404 OK` - Successful retrieval with user data.
    ```json
    {
        "error": "User not found"
    }
    ```

---

### POST /api/register

Register a new user.

**Parameters**

| Name | Required |  Type  | Description                        |
| ---- | :------: | :----: | ---------------------------------- |
| `id` | required | number | The unique identifier of the user. |

**Request Body**

    {
    "name": "Alice",
    "email": "alice@example.com",
    "password": "securePassword"
    }

**Responses**

-   `200 OK` - Successful retrieval with user data.

    ```json
    {
        "user:": {
            "id": 1,
            "name": "John Doe",
            "email": "john@example.com"
        }
    }
    ```

---
