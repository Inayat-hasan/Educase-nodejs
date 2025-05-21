# Educase-nodejs

This is the Node.js backend assignment for the Educase internship. It implements a simple School Management API using Express.js and MySQL, with cloud database integration and Postman collection for testing.

---

## 📌 Features

- Add new schools with name, address, latitude, and longitude.
- Retrieve a list of all schools sorted by proximity to a user's location.
- MySQL-based database (hosted via Railway).
- RESTful APIs with proper input validation and error handling.

---

## 🚀 Tech Stack

- Node.js
- Express.js
- MySQL (hosted on Railway)
- MySQL2 (promise-based driver)
- CORS
- Postman (for testing)

---

## 🗃️ Database Schema

Table: `schools`

| Field     | Type         | Description             |
| --------- | ------------ | ----------------------- |
| id        | INT, PK      | Auto-incrementing ID    |
| name      | VARCHAR(255) | Name of the school      |
| address   | VARCHAR(255) | Address of the school   |
| latitude  | DECIMAL(9,6) | Latitude (−90 to 90)    |
| longitude | DECIMAL(9,6) | Longitude (−180 to 180) |

---

## 📫 API Endpoints

### 1. Add School

- **Endpoint:** `/api/school/addSchool`
- **Method:** `POST`
- **Body Parameters (JSON):**

  ```json
  {
    "name": "School Name",
    "address": "123 Main St",
    "latitude": 28.6139,
    "longitude": 77.209
  }
  ```

- **Response:**
  ```json
  {
    "message": "School added successfully.",
    "school": {
      "id": 1,
      "name": "School Name",
      "address": "123 Main St",
      "latitude": 28.6139,
      "longitude": 77.209
    }
  }
  ```

### 2. List Schools

- **Endpoint:** `/api/school/listSchools`
- **Method:** `GET`
- **Query Parameters:**

  ```json
  {
    "latitude": "User's latitude",
    "longitude": "User's longitude"
  }
  ```

- **Response:**
  ```json
  {
    "sorted": [
      {
        "id": 1,
        "name": "School Name",
        "address": "123 Main St",
        "latitude": 28.6139,
        "longitude": 77.209,
        "distance": 123.45
      }
    ],
    "message": "Schools listed successfully."
  }
  ```

---

## 🔁 Postman Collection

You can test both APIs using this Postman collection:

🔗 **Postman Link:** [Educase Node.js API Collection](https://warped-meteor-82888.postman.co/workspace/New-Team-Workspace~9baecabe-2084-49dc-8311-feeed65590be/collection/45168105-9abd7f9c-feb1-48dd-8d68-3ee91273c27e)

> Click the link above and import it into Postman to test the endpoints easily.

---

## 🌐 Deployment

This API is deployed and accessible at:

🔗 **Deployment Link:** [Educase Node.js API](https://educa-nodejs.onrender.com)
