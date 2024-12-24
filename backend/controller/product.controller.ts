import mongoose from "mongoose"
import { Product } from "../models/product.model"
import { Response, Request, RequestHandler } from "express"

export const getProduct: RequestHandler = async (req: Request, res: Response) => {
    try {
        const products = await Product.find({})
        res.status(200).json( { success: true, data: products })
    } catch (error) {
        console.error("Error fetching products: " , error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const createProduct =  async (req: Request, res: Response) => {
    const product = req.body;

    if(!product.name || !product.price || !product.image) {
        res.status(400).json({ success: "false", message: "Please provide all fields" })
    }

    const newProduct = new Product(product);

    try {
        await newProduct.save()
        res.status(201).json({ success: true, data: newProduct })
    } catch (error) {
        console.error("Error creating product:", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const updateProduct = async (req: Request, res: Response) => {
    const { id } = req.params
    const product = req.body

    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: "Invalid Product Id"})
        return
    }

    try {
        const updatedProduct = await Product.findByIdAndUpdate(id, product, {new:true})
        res.status(200).json({ success: true, data: updatedProduct})
    } catch (error) {
        console.error("Error updating product:", error.message)
        res.status(500).json({ success: false, message: "Server Error" })
    }
}

export const deleteProdut = async (req: Request, res: Response) => {
    const { id } = req.params
    if (!mongoose.Types.ObjectId.isValid(id)) {
        res.status(404).json({ success: false, message: "Invalid Product Id"})
        return
    }
    try {
        await Product.findByIdAndDelete(id);
        res.status(200).json({ success: true, message: "Product deleted"})
    } catch (error) {
        console.error("Error deleting product: ", error.message)
        res.status(500).json({ success: false, message: "Server Error"})
    }
}