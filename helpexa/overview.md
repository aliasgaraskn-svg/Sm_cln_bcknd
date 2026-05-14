## 🎯 Goal
Provide a unified API layer that abstracts multiple internal systems:
- HRMS
- ITSM
- Learning
- Expense & Travel
 
Backend should act as an **aggregation + orchestration layer**, not replace existing systems.
 
---
 
## 🧑‍💻 Tech Stack (Suggested)
 
- Node.js (Express / NestJS)
- API Gateway Layer
- Database: Postgres / MongoDB
- Auth Integration: SSO (Azure AD / IAM)
- Messaging: Kafka / RabbitMQ (optional)
- Cache: Redis
 
---
 
## 🏗 Architecture
 
Client (Mobile App)
        ↓
API Gateway
        ↓
Service Layer (Microservices / Modular APIs)
        ↓
Adapters / Connectors
        ↓
Existing Systems (HRMS, ITSM, etc.)
 
---
 
## 🔐 Authentication
 
### Flow
1. User logs in via SSO
2. Backend validates token
3. Issues JWT for app session
 
### APIs
- POST /auth/login
- POST /auth/refresh
- POST /auth/logout
 
---
 
## 📦 Core Services
 
---
 
### 👤 User Service
 
#### APIs
- GET /user/profile
 
#### Model
```json
{
  "id": "string",
  "name": "string",
  "email": "string",
  "role": "string"
}