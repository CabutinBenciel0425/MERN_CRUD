## 🛒 MERN Product Management Dashboard

🚀 Features
Create Product: Add new products with name, price, description, and image.

View Products: Dashboard displays all products with details and images.

Edit Product: Update product information and optionally replace the image.

Delete Product: Remove products with confirmation dialogs.

Image Uploads: Supports file uploads and previews.

Toasts & Feedback: Success/error notifications using Chakra UI’s toaster.

🛠️ Tech Stack
Frontend: React + TypeScript, Chakra UI (v3), Zustand for state management

Backend: Node.js, Express

Database: MongoDB

Other: FormData for file uploads, REST API integration

Project Structure

frontend/
src/
components/
ProductCard.tsx
EditProductModal.tsx
CardFooter.tsx
store/
product.ts
sharedTypes/
types.ts
pages/
HomePage.tsx
CreatePage.tsx
App.tsx
backend/
routes/
products.js
models/
Product.js
server.js

🧪 API Endpoints
GET /api/products → fetch all products

GET /api/products/:id → fetch single product

POST /api/products → create product

PUT /api/products/:id → update product

DELETE /api/products/:id → delete product

📸 Screenshots

![alt text](image.png)

![alt text](image-1.png)

![alt text](image-2.png)

![alt text](image-3.png)

![alt text](image-4.png)

📌 Notes
Editing a product keeps the existing image unless a new file is uploaded.

The backend must return the updated product object (including image URL) for the frontend to reflect changes correctly.

Uses Chakra UI v3’s Dialog for confirmation and edit modals.
