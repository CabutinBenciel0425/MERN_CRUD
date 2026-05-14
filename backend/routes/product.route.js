import express from "express";
import mongoose from "mongoose";
import Product from "../models/product.model.js";
import multer from "multer";

import {
  getProducts,
  createProduct,
  deleteProduct,
  updateProduct,
} from "../controllers/product.controller.js";

const router = express.Router();

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, "uploads/"),
  filename: (req, file, cb) => cb(null, Date.now() + "-" + file.originalname),
});

const upload = multer({ storage });

//GET PRODUCTS
router.get("/", getProducts);

//CREATE PRODUCT
router.post("/", upload.single("image"), createProduct);

//DELETE PRODUCT
router.delete("/:id", deleteProduct);

//UPDATE PRODUCT
router.put("/:id", upload.single("image"), updateProduct);

export default router;
