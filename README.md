**Next.js Authorization Starter Kit**

Starter code for future projects, It handles most authorization so you can start a project right.

tech: Next.js, postgres with prisma, typescript

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

**Parameters**

| Name | Required |  Type  | Description                        |
| ---- | :------: | :----: | ---------------------------------- |
| `id` | required | number | The unique identifier of the user. |

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
