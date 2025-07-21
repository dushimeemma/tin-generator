# 📌 RRA TIN Generator Microservice

This is a NestJS-based microservice for generating unique 10-digit TINs (Tax Identification Numbers) with secure password creation. It includes:

- PostgreSQL database integration
- TypeORM for data persistence
- Unique TIN generation
- API key authentication (via headers)
- Password update functionality
- Environment-based configuration

---

## 🚀 Features

- ✅ Generate a unique 10-digit TIN + password
- 🔐 Update password securely
- 🔑 Requires API key in request headers
- 🛠 Configurable via `.env` file
- 📁 Clean modular structure for scalability

---

## 📦 Installation

```bash
# 1. Clone the repository
git clone https://github.com/dushimeemma/tin-generator.git
cd tin-generator

# 2. Install dependencies
yarn

# 3. Setup environment variables
cp .env.example .env

# 4. Run the application
yarn start:dev

```

## 🧪 Environment Variables

Create a .env file in the root:

```bash
DATABASE_HOST=YOUR_DB_HOST
DATABASE_PORT=YOUR_DB_PORT
DATABASE_USER=YOUR_DB_USERNAME
DATABASE_PASSWORD=YOUR_DB_PASSWORD
DATABASE_NAME=YOUR_DB_NAME
API_KEY=YOUR_DB_API_KEY

```

## 🧰 API Endpoints

All endpoints require a valid API key passed in headers:

```bash
rra-access-key: YOUR_ACCESS_KEY
```

## ➕ Generate TIN

POST `/users/generate`

Request Body:

```json
{
  "tin": "1234567890",
  "password": "GeneratedPassword123!"
}
```

Response:

```json
{
  "tin": "1234567890",
  "password": "GeneratedPassword123!"
}
```

## 🔁 Update Password

PATCH `/users/update-password`

Request Body:

```json
{
  "tin": "1234567890",
  "newPassword": "NewSecurePass#2025"
}
```

Response:

```json
{
  "message": "Password updated successfully"
}
```

## 🗃 Project Structure

```vbnet
src/
├── users/
│   ├── users.module.ts
│   ├── users.service.ts
│   ├── users.controller.ts
│   ├── users.entity.ts
│   └── dto/
├── auth/
│   └── api-key.guard.ts
├── app.module.ts
└── main.ts
```

## 🧱 Database Table

SQL for reference:

```sql
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  tin VARCHAR(10) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

✅ Table is automatically created by TypeORM if synchronize: true.

## 🧑‍💻 Author

[Emmanuel Dushime](https://www.linkedin.com/in/dushimeemma)
