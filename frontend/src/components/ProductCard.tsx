import { Box, Button, Heading, HStack, IconButton, Image, Input, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, Text, useColorModeValue, useDisclosure, useToast, VStack } from "@chakra-ui/react";
import { useState } from "react";
import { NewProduct, Product, useProductStore } from "../store/product";
import { DeleteIcon, EditIcon } from "@chakra-ui/icons";

interface ProductCardProps {
    product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
    const { deleteProduct, updateProduct } = useProductStore()
    const toast = useToast()
    const { isOpen, onOpen, onClose } = useDisclosure()
    const [updatedProduct, setUpdatedProduct] = useState({
        name: product.name,
        price: product.price,
        image: product.image
    })

    const textColor = useColorModeValue("gray.600", "gray.200")
    const bg = useColorModeValue("white", "gray.800")

    async function handleDeleteProduct(productId: string) {
        const { success, message } = await deleteProduct(productId)
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
    }

    async function handleUpdateProduct(productId: string, updatedProduct: NewProduct) {
        const { success, message } = await updateProduct(productId, updatedProduct)
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
        onClose()
    }

    return (
        <Box
            shadow={"lg"}
            rounded={"lg"}
            overflow={"hidden"}
            transition={"all 0.3s"}
            _hover={{ transform: "translaeY(-5px)", shadow: "xl" }}
            bg={bg}
        >
            <Image src={product.image} alt={product.name} h={48} w={"full"} objectFit={"cover"} />

            <Box p={4}>
                <Heading as={"h3"} size={"md"} mb={2}>
                    {product.name}
                </Heading>

                <Text fontWeight={"bold"} fontSize={"xl"} color={textColor} mb={4}>
                    ${product.price}
                </Text>

                <HStack spacing={2}>
                    <IconButton 
                    icon={<EditIcon />} 
                    onClick={onOpen} 
                    colorScheme={"blue"} 
                    aria-label={""}
                />
                    <IconButton 
                    icon={<DeleteIcon />} 
                    onClick={() => handleDeleteProduct(product._id)} 
                    colorScheme={"red"} 
                    aria-label={""}
                />
                </HStack>
            </Box>

            <Modal isOpen={isOpen} onClose={onClose}>
                <ModalOverlay />
                <ModalContent>
                    <ModalHeader>Update Product</ModalHeader>
                    <ModalCloseButton />

                    <ModalBody>
                    <VStack spacing={4}>
                        <Input
                            placeholder={"Product Name"}
                            name={"name"}
                            value={updatedProduct.name}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, name: e.target.value })}
                        />
                        <Input
                            placeholder={"Product Price"}
                            name={"price"}
                            value={updatedProduct.price}
                            type={"number"}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, price: e.target.value })}
                        />
                        <Input
                            placeholder={"Product URL"}
                            name={"image"}
                            value={updatedProduct.image}
                            onChange={(e) => setUpdatedProduct({...updatedProduct, image: e.target.value })}
                        />
                    </VStack>
                    </ModalBody>

                    <ModalFooter>
                        <Button colorScheme={"blue"} mr={3} onClick={() => handleUpdateProduct(product._id, updatedProduct)}>
                            Update
                        </Button>
                        <Button variant={"ghost"} onClick={onClose}>
                            Cancel
                        </Button>
                    </ModalFooter>
                </ModalContent>
            </Modal>
        </Box>
    )
}