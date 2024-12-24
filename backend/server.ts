import express, { Request, Response } from "express"
import { connectDB } from "./config/db";
import productRoutes from "./routes/product.route"

const app = express();
const PORT = process.env.PORT || 5000
app.use(express.json())


app.use("/api/products", productRoutes)

app.listen(PORT, () => {
    connectDB()
    console.log("Server started at port:", PORT)
})