import { create } from "zustand";
import { produce } from "immer";

export const useProductStore = create((set) => ({
  products: [],
  
  setProducts: (products) => set({ products }),

  createProduct: async (newProduct) => {
    if (!newProduct.name || !newProduct.image || !newProduct.price) {
      return { success: false, message: "Please fill in all fields." };
    }

    try {
      const res = await fetch("/api/products", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newProduct),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to create product.");

      set(produce((state) => { state.products.push(data.data); }));
      
      return { success: true, message: "Product created successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  fetchProducts: async () => {
    try {
      const res = await fetch("/api/products");
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to fetch products.");

      set({ products: data.data });
    } catch (error) {
      console.error("Error fetching products:", error.message);
    }
  },

  deleteProduct: async (pid) => {
    try {
      const res = await fetch(`/api/products/${pid}`, { method: "DELETE" });
      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to delete product.");

      set(produce((state) => {
        state.products = state.products.filter((product) => product._id !== pid);
      }));

      return { success: true, message: "Product deleted successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },

  updateProduct: async (pid, updatedProduct) => {
    try {
      const res = await fetch(`/api/products/${pid}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedProduct),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message || "Failed to update product.");

      set(produce((state) => {
        const index = state.products.findIndex((product) => product._id === pid);
        if (index !== -1) state.products[index] = data.data;
      }));

      return { success: true, message: "Product updated successfully" };
    } catch (error) {
      return { success: false, message: error.message };
    }
  },
}));
