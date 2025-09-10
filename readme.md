# 🛒 MiniMarket API

A Node.js + Express + MongoDB backend API for managing users, authentication, and products.  
Includes JWT authentication, role-based authorization (admin/user), error handling, secure password management, and image upload with optimization.

---

## 🚀 Features

- **User Authentication**
  - Signup & Login with JWT
  - Password hashing using `bcrypt`
  - Token-based authentication middleware
- **Role-Based Authorization**
  - `admin` vs `user`
  - Restrict routes to admins only
- **Users**
  - CRUD operations (Admin only)
  - Profile image upload
- **Products**
  - CRUD operations with image upload
- **File Uploads**
  - Image upload with `multer`
  - Image resizing & optimization with `sharp`
- **Security**
  - Passwords hashed before saving
  - Sensitive fields (password) excluded from responses
- **Error Handling**
  - Centralized error handler with custom `AppError` class
  - Handles duplicate keys, validation errors, and auth errors

---

## 🛠️ Tech Stack

- [Node.js](https://nodejs.org/)
- [Express.js](https://expressjs.com/)
- [MongoDB](https://www.mongodb.com/)
- [Mongoose](https://mongoosejs.com/)
- [bcryptjs](https://www.npmjs.com/package/bcryptjs) (for password hashing)
- [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken) (for auth)
- [validator](https://www.npmjs.com/package/validator) (for email validation)
- [multer](https://www.npmjs.com/package/multer) (for handling file uploads)
- [sharp](https://www.npmjs.com/package/sharp) (for image processing)

## API Endpoints

Auth

- POST /api/v1/users/signup → Register new user

- POST /api/v1/users/login → Login user & get JWT

- Users (Admin Only)

- GET /api/v1/users/ → Get all users

- POST /api/v1/users/ → Create new user (with image upload)

- GET /api/v1/users/:id → Get user by ID

- PATCH /api/v1/users/:id → Update user (with image upload)

- DELETE /api/v1/users/:id → Delete user

- Products

- GET /api/v1/products/ → Get all products

- POST /api/v1/products/ → Create product (with image upload, Admin only)

- GET /api/v1/products/:id → Get product by ID

- PATCH /api/v1/products/:id → Update product (with image upload, Admin only)

- DELETE /api/v1/products/:id → Delete product (Admin only)
