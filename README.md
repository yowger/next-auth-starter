**Next.js Authorization Starter Kit**

Starter code for future projects, It handles most authorization so you can start a project right.

tech: Next.js, postgres with prisma, typescript

#will update read me soon

# API endpoints

## GET

`official client only` [/api/users/:id](#get-apiusersid) <br/>

## POST

`official client only` [/api/users](#post-apiusers) <br/>

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
        "id": 1,
        "name": "John Doe",
        "email": "john@example.com"
    }
    ```
