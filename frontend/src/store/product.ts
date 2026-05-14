import type {
  ProductFormType,
  ProductType,
  ProductUpdateType,
} from "./../sharedTypes/types";
import { create } from "zustand";

type ProductStore = {
  products: ProductType[];
  setProducts: (products: ProductType[]) => void;
  createProduct: (
    newProduct: ProductFormType,
  ) => Promise<{ success: boolean; message: string }>;
  fetchProducts: () => Promise<{ success: boolean; message: string }>;
  deleteProduct: (id: string) => Promise<{ success: boolean; message: string }>;
  updateProduct: (
    updatedProduct: ProductUpdateType,
  ) => Promise<{ success: boolean; message: string }>;
  getProduct: (id: string) => Promise<{ success: boolean; message: string }>;
};

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    try {
      const formData = new FormData();
      formData.append("name", newProduct.name);
      formData.append("price", String(newProduct.price));
      formData.append("description", String(newProduct.description));
      if (newProduct.image instanceof File) {
        formData.append("image", newProduct.image);
      }

      const res = await fetch("/api/products", {
        method: "POST",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || "Failed to create product",
        };
      }

      let data;
      try {
        data = await res.json();
      } catch {
        return { success: false, message: "Invalid server response" };
      }
      set((state) => ({ products: [...state.products, data.data] }));

      return {
        success: true,
        message: "Product created successfully",
      };
    } catch (error) {
      console.error("Error creating product:", error);
      return {
        success: false,
        message: "Network or server error",
      };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();

      if (!data) {
        throw new Error("No data fetched");
      }

      set({ products: data.data });
      return { success: true, message: "Products fetched successfully" };
    } catch (error) {
      console.error(`Something wrong with fetching the products - ${error}`);
      return { success: false, message: "Failed to fetch the products" };
    }
  },

  deleteProduct: async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, {
        method: "DELETE",
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || "Failed to delete product",
        };
      }
      set((state) => ({
        products: state.products.filter((p) => p._id !== id),
      }));
      return {
        success: true,
        message: "Product deleted successfully",
      };
    } catch (error) {
      console.error(`Something wrong with deleting the product - ${error}`);
      return { success: false, message: "Failed to delete the product" };
    }
  },

  updateProduct: async (updatedProduct) => {
    try {
      const formData = new FormData();
      formData.append("name", updatedProduct.name);
      formData.append("price", String(updatedProduct.price));
      formData.append("description", updatedProduct.description);

      if (updatedProduct.image instanceof File) {
        formData.append("image", updatedProduct.image);
      } else if (typeof updatedProduct.image === "string") {
        formData.append("image", updatedProduct.image);
      }

      const res = await fetch(`/api/products/${updatedProduct._id}`, {
        method: "PUT",
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || "Failed to update product",
        };
      }

      const data = await res.json();

      set((state) => ({
        products: state.products.map((p) =>
          p._id === updatedProduct._id ? data.data : p,
        ),
      }));

      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      console.error("Error updating product:", error);
      return { success: false, message: "Network or server error" };
    }
  },

  getProduct: async (id: string) => {
    try {
      const res = await fetch(`/api/products/${id}`, { method: "GET" });

      if (!res.ok) {
        const errorData = await res.json();
        return {
          success: false,
          message: errorData.message || "Failed to fetch product",
        };
      }

      const data = await res.json();
      return {
        success: true,
        message: "Product fetched successfully",
        product: data.data,
      };
    } catch (error) {
      console.error("Error fetching product:", error);
      return { success: false, message: "Network or server error" };
    }
  },
}));
