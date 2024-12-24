import { Box, Button, Container, Heading, Input, useColorModeValue, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { useProductStore } from "../store/product";

export function CreatePage() {
    const  [newProduct, setNewProduct] = useState({
        name: "",
        price: "",
        image: ""
    })
    const { createProduct } = useProductStore()
    const toast = useToast()

    async function handleAddProduct() {
        const { success, message } = await createProduct(newProduct);
        if(!success) {
            toast({
                "title": "Error",
                description: message,
                status: "error",
                isClosable: true
            })
        } else {
            toast({
                "title": "Sucess",
                description: message,
                status: "success",
                isClosable: true
            })
        }

        setNewProduct({name: "", price: "", image: ""})
    }

    return (
        <Container maxW={"container.sm"}>
            <VStack
                spacing={8}
            >
                <Heading as={"h1"} size={"2xl"} textAlign={"center"} mb={8}>
                    Create New Product
                </Heading>

                <Box
                    w={"full"} bg={useColorModeValue("white", "gray.800")}
                    p={6} rounded={"lg"} shadow={"md"}
                >
                    <VStack>
                        <Input
                            placeholder={"Product Name"}
                            name={"name"}
                            value={newProduct.name}
                            onChange={(e) => setNewProduct({...newProduct, name: e.target.value })}
                        />
                        <Input
                            placeholder={"Product Price"}
                            name={"price"}
                            value={newProduct.price}
                            type={"number"}
                            onChange={(e) => setNewProduct({...newProduct, price: e.target.value })}
                        />
                        <Input
                            placeholder={"Product URL"}
                            name={"image"}
                            value={newProduct.image}
                            onChange={(e) => setNewProduct({...newProduct, image: e.target.value })}
                        />
                        <Button colorScheme={"blue"} onClick={handleAddProduct} w={"full"}>
                            Add Product
                        </Button>
                    </VStack>
                </Box>
            </VStack>
        </Container>
    )
}