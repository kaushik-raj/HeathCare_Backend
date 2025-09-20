# Healthcare Management Backend

A RESTful backend API for managing patients, doctors, and patient-doctor mappings, built with Node.js, Express, and MongoDB. Features JWT-based authentication and ownership-based authorization.

## Tech Stack

- Node.js & Express.js
- MongoDB (with Mongoose)
- JWT Authentication
- bcryptjs for password hashing
- Postman for API testing

## Features

### Auth
- POST /api/auth/register → Register a new user
- POST /api/auth/login → Login and get a token

### Patients
- POST /api/patients/ → Add patient (auth required)
- GET /api/patients/ → Get all patients
- GET /api/patients/:id → Get patient by ID
- PUT /api/patients/:id → Update patient (auth + ownership)
- DELETE /api/patients/:id → Delete patient (auth + ownership)

### Doctors
- POST /api/doctors/ → Add doctor (auth required)
- GET /api/doctors/ → Get all doctors
- GET /api/doctors/:id → Get doctor by ID
- PUT /api/doctors/:id → Update doctor (auth + ownership)
- DELETE /api/doctors/:id → Delete doctor (auth + ownership)

### Patient-Doctor Mappings
- POST /api/mappings/ → Assign doctor to patient (auth required)
- GET /api/mappings/ → Get all mappings
- GET /api/mappings/:patient_id → Get all doctors for a patient
- DELETE /api/mappings/:id → Remove a doctor from a patient (auth + creator only)


## Testing APIs

- Use Postman to test all endpoints.
- For protected routes, add header:

## Headers
Authorization: <your_token>
Content-Type: application/json

## Deployment

- Deployed on Vercel (Backend)
- API Base URL: 


## Notes
- Only authenticated users can create/update/delete patients, doctors, and mappings.
- Ownership is verified for update/delete routes.
- JWT expires in 1 hour.
