import { create } from "zustand";

export interface Product {
  _id: string;
  name: string;
  price: string;
  image: string;
}
export interface NewProduct {
  name: string;
  price: string;
  image: string;
}

interface ProductStore {
  products: Product[]; 
  setProducts: (products: Product[]) => void;
  createProduct: (newProduct: NewProduct) => Promise<{ success: boolean; message: string }>;
  fetchProducts: () => Promise<void>;
  deleteProduct: (productId: string) => Promise<{ success: boolean; message: string }>;
  updateProduct: (productId: string, updatedProduct: NewProduct) => Promise<{ success: boolean; message: string }>;
}

export const useProductStore = create<ProductStore>((set) => ({
  products: [],
  setProducts: (products) => set({ products }),
  createProduct: async (newProduct) => {
    if(!newProduct.name || !newProduct.price || !newProduct.image) {
        return { success: false, message: "Please fill in all fields."}
    }

    try {
        const res = await fetch("/api/products", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newProduct),
        });
  
        if (!res.ok) {
          throw new Error("Failed to create the product. Please try again.")
        }
  
        const data = await res.json()
  
        set((state) => ({
          products: [...state.products, data.data],
        }));
  
        return { success: true, message: "Product created successfully." }
      } catch (error) {
        console.error("Error creating product:", error)
        return { success: false, message: "An error occurred. Please try again." }
      }
    },
    fetchProducts: async () => {
      try {
        const res = await fetch("/api/products")

        if (!res.ok) {
          throw new Error("Failed to fetch the products. Please try again.");
        }

        const data = await res.json()

        set({ products: data.data })
      }catch (error) {
        console.error("Error fetching products:", error)
      }

    },
    deleteProduct: async (productId) => {
      try {
        const res = await fetch(`/api/products/${productId}`, {
          method: "DELETE",
        });
    
        if (!res.ok) {
          throw new Error("Failed to delete the product.")
        }
    
        const data = await res.json()
    
        if (!data.success) {
          return { success: false, message: data.message }
        }
    
        set((state) => ({
          products: state.products.filter((product) => product._id !== productId),
        }))
    
        return { success: true, message: data.message }
      } catch (error) {
        console.error("Error deleting product:", error)
        return { success: false, message: "An error occurred. Please try again." }
      }
    },
    updateProduct: async (productId, updatedProduct) => {
      try {
        const res = await fetch(`/api/products/${productId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(updatedProduct)
        })

        if(!res.ok) {
          throw new Error("Failed to update the product.");
        }

        const data = await res.json()

        if (!data.success) {
          return { success: false, message: data.message }
        }

        set ((state) => ({
          products: state.products.map(product => product._id === productId ? data.data: product)
        }))

        return { success: true, message: "Product updated successfully." }
      } catch (error) {
        console.error("Error updating product:", error)
        return { success: false, message: "An error occurred. Please try again." }
      }
    }
  }));
  