# FashionStore - Full-Stack E-Commerce Application 🛍️

FashionStore is a modern full-stack fashion shopping web application inspired by Myntra and Ajio.

The project allows users to browse products, shop by category, add items to cart, place orders, and manage their profile.

This project was built as a beginner-friendly academic/sample project using React, Spring Boot, and MySQL.

---

# 🌟 Features

## 👤 User Features
- User Signup
- User Login
- Logout Functionality
- User Profile Page

## 🛒 Shopping Features
- Browse Products
- Shop by Categories
- Trending Products Section
- Product Detail View
- Add to Cart
- Remove from Cart
- Quantity Update
- Order Placement
- Order History

---

# 🛠️ Tech Stack

## Frontend
- React.js
- HTML5
- CSS3
- JavaScript
- Axios

## Backend
- Java
- Spring Boot
- Spring Data JPA

## Database
- MySQL

## Tools
- IntelliJ IDEA
- MySQL Workbench
- Git & GitHub
- VS Code

---

# 📁 Project Structure

## Frontend Structure

```bash
fashion-frontend/
│
├── src/
│   ├── assets/
│   ├── components/
│   ├── pages/
│   ├── services/
│   ├── styles/
│   ├── App.js
│   └── index.js
```

## Backend Structure

```bash
backend/
│
├── src/main/java/com/fashionstore/backend/
│   ├── controller/
│   ├── model/
│   ├── repository/
│   ├── service/
│   └── BackendApplication.java
```

---

# 🚀 Getting Started

# Step 1: Clone the Repository

Open terminal and run:

```bash
git clone <your-github-repository-url>
```

Example:

```bash
git clone https://github.com/yourusername/fashion-store.git
```

Move into the project folder:

```bash
cd fashion-store
```

---

# Step 2: Open Project

## Backend
Open backend folder in IntelliJ IDEA.

## Frontend
Open frontend folder in VS Code or IntelliJ IDEA.

---

# Step 3: Database Setup (MySQL)

Open MySQL Workbench and run:

```sql
CREATE DATABASE fashion_store;

USE fashion_store;
```

---

# Step 4: Configure Backend

Open:

```bash
src/main/resources/application.properties
```

Add:

```properties
spring.application.name=backend

spring.datasource.url=jdbc:mysql://localhost:3306/fashion_store
spring.datasource.username=root
spring.datasource.password=YOUR_PASSWORD

spring.jpa.hibernate.ddl-auto=update
spring.jpa.show-sql=true
```

Replace:

```properties
YOUR_PASSWORD
```

with your MySQL password.

---

# Step 5: Install Backend Dependencies

IntelliJ will automatically download Maven dependencies.

If not, open terminal in backend folder and run:

```bash
mvn clean install
```

---

# Step 6: Run Backend

Run:

```bash
BackendApplication.java
```

Backend runs on:

```bash
http://localhost:8080
```

---

# Step 7: Install Frontend Dependencies

Open terminal inside frontend folder and run:

```bash
npm install
```

---

# Step 8: Run Frontend

Start React app:

```bash
npm start
```

Frontend runs on:

```bash
http://localhost:3000
```

---

# 🔌 API Endpoints

## User APIs

```http
POST /api/users/signup
POST /api/users/login
```

## Product APIs

```http
GET /api/products
GET /api/products/category/{category}
```

## Cart APIs

```http
GET /api/cart/{userId}
POST /api/cart/add
PUT /api/cart/update/{cartItemId}
DELETE /api/cart/remove/{cartItemId}
```

## Order APIs

```http
POST /api/orders/checkout/{userId}
GET /api/orders/{userId}
```

---

# 🎨 Home Page Sections

- Hero Banner
- Shop Now Button
- Shop By Category
- Trending Products
- Footer

---

# 📱 Responsive Design

Supports:
- Desktop
- Tablet
- Mobile

---

# 📌 Future Improvements

- Payment Gateway
- Wishlist
- Admin Dashboard
- JWT Authentication

---

