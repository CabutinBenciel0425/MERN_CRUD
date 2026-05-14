import mongoose from "mongoose";
import Product from "../models/product.model.js";

export const getProducts = async (req, res) => {
  try {
    const products = await Product.find({});

    const productsWithUrls = products.map((p) => ({
      ...p.toObject(),
      image: `${req.protocol}://${req.get("host")}/${p.image}`,
    }));

    res.status(200).json({
      success: true,
      data: productsWithUrls,
    });
  } catch (error) {
    console.error(`Error in fetching products - ${error.message}`);
    return res.status(500).json({ success: false, message: "Server Error" });
  }
};

export const createProduct = async (req, res) => {
  const { name, price, description } = req.body;

  if (!name || !price || !description || !req.file) {
    return res.status(400).json({
      success: false,
      message: "Please provide all fields",
    });
  }

  const newProduct = new Product({
    name,
    price,
    description,
    image: req.file.path,
  });

  try {
    await newProduct.save();
    const fullUrl = `${req.protocol}://${req.get("host")}/${newProduct.image}`;
    res.status(201).json({
      success: true,
      data: { ...newProduct.toObject(), image: fullUrl },
    });
  } catch (error) {
    console.error(`Error in creating product - ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};

export const deleteProduct = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  try {
    await Product.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Product successfully deleted",
    });
  } catch (error) {
    console.error(`Error in deleting product - ${error.message}`);
    return res.status(500).json({
      success: true,
      message: "Server Error",
    });
  }
};

export const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, price, description, image } = req.body;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  try {
    let imagePath;
    if (req.file) {
      imagePath = req.file.path;
    } else if (image) {
      const url = new URL(image);
      imagePath = url.pathname.replace(/^\//, "");
    }

    const updatedFields = { name, price, description, image: imagePath };

    const updatedProduct = await Product.findByIdAndUpdate(id, updatedFields, {
      new: true,
    });

    const fullUrl = `${req.protocol}://${req.get("host")}/${updatedProduct.image}`;

    res.status(200).json({
      success: true,
      data: { ...updatedProduct.toObject(), image: fullUrl },
    });
  } catch (error) {
    console.error(`Error updating the product - ${error.message}`);
    return res.status(500).json({
      success: false,
      message: "Server Error",
    });
  }
};
