# Healthcare Management Backend

A RESTful backend API for managing patients, doctors, and patient-doctor mappings, built with **Node.js**, **Express**, and **MongoDB**.
Features **JWT-based authentication**, **ownership-based authorization**, and secure password hashing.

---

## **Tech Stack**

* Node.js & Express.js
* MongoDB (with Mongoose)
* JWT Authentication
* bcryptjs for password hashing
* Postman for API testing

---

## **Features / API Overview**

### **Auth**

* `POST /api/auth/register` → Register a new user
* `POST /api/auth/login` → Login and get a JWT token

### **Patients**

* `POST /api/patients/` → Add a patient (**auth required**)
* `GET /api/patients/` → Get all patients
* `GET /api/patients/:id` → Get patient by ID
* `PUT /api/patients/:id` → Update patient (**auth + ownership**)
* `DELETE /api/patients/:id` → Delete patient (**auth + ownership**)

### **Doctors**

* `POST /api/doctors/` → Add a doctor (**auth required**)
* `GET /api/doctors/` → Get all doctors
* `GET /api/doctors/:id` → Get doctor by ID
* `PUT /api/doctors/:id` → Update doctor (**auth + ownership**)
* `DELETE /api/doctors/:id` → Delete doctor (**auth + ownership**)

### **Patient-Doctor Mappings**

* `POST /api/mappings/` → Assign a doctor to a patient (**auth required**)
* `GET /api/mappings/` → Get all mappings
* `GET /api/mappings/:patient_id` → Get all doctors assigned to a patient
* `DELETE /api/mappings/:id` → Remove a doctor from a patient (**auth + creator only**)

---

## **Installation / Setup**

1. Clone the repository:

```bash
git clone <repo_link>
```

2. Install dependencies:

```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:

```env
PORT=8000
MONGO_URI=<your_mongodb_connection_string>
JWT_SECRET=<your_jwt_secret>
```

4. Start the server:

```bash
npm run dev
```

Server will run at `http://localhost:8000`.

---

## **Testing APIs**

* Use **Postman** to test all endpoints.

### **Headers for Protected Routes (POST / DELETE)**

```
Authorization: <your_token>
Content-Type: application/json
```

### **Headers for Public Routes (GET)**

```
Content-Type: application/json
```

### **Example: Create Mapping**

```
POST http://localhost:8000/api/mappings
```

Body:

```json
{
  "patient": "<patient_id>",
  "doctor": "<doctor_id>",
  "mappingDate": "2025-09-21T10:30:00Z",
  "status": "scheduled"
}
```

---

## **Notes**

* The original assignment mentioned **Django** as the primary framework. However, the Job Description stated that knowledge of **Node.js or Django** was acceptable. I chose **Node.js with Express** to implement the backend for this Healthcare Management project.
* The `.env` file is **not included in GitHub**. It contains:

  * `JWT_SECRET` → for JWT authentication
  * `MONGO_URI` → MongoDB connection string
* To run the project locally, create a `.env` file in the root directory with the variables above.
* Only authenticated users can create/update/delete patients, doctors, and mappings.
* Ownership is verified for update/delete routes.

---

## **Postman Testing**

* Login first to get a JWT token.
* Use the token for all protected routes.
* Public routes (`GET /patients`, `GET /doctors`, `GET /mappings`) don’t require authentication.
