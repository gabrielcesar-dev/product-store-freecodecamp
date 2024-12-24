import express from "express"
import { createProduct, deleteProdut, getProduct, updateProduct } from "../controller/product.controller"

const router = express.Router()

router.get("/", getProduct )

router.post("/" , createProduct)

router.put("/:id", updateProduct)

router.delete("/:id", deleteProdut)

export default router

