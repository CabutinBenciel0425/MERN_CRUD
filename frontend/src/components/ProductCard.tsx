import { Card, Image, Text } from "@chakra-ui/react";
import type { ProductType } from "../sharedTypes/types";
import { useProductStore } from "../store/product";
import { toaster } from "../components/ui/toaster";
import { useState } from "react";

import CardFooter from "./CardFooter";
import EditProductModal from "./EditProductModal";

function ProductCard({ product }: { product: ProductType }) {
  const { deleteProduct } = useProductStore();
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  async function handleDeleteProduct(id: string) {
    const { success, message } = await deleteProduct(id);
    if (!success) {
      toaster.create({
        title: "Error",
        description: message,
        type: "error",
        closable: true,
      });
    } else {
      toaster.create({
        title: "Success",
        description: message,
        type: "success",
        closable: true,
      });
    }
  }

  return (
    <Card.Root maxW="sm" overflow="hidden">
      <Image
        src={typeof product.image === "string" ? product.image : ""}
        alt={product.name}
        maxH="180px"
      />
      <Card.Body gap="2">
        <Card.Title>{product.name}</Card.Title>
        <Card.Description>{product.description}</Card.Description>
        <Text textStyle="2xl" fontWeight="medium" letterSpacing="tight" mt="2">
          ${product.price}
        </Text>
      </Card.Body>
      <EditProductModal
        key={product._id}
        product={product}
        isModalOpen={isEditModalOpen}
        setIsModalOpen={setIsEditModalOpen}
      />
      <CardFooter
        onDeleteProduct={handleDeleteProduct}
        id={product._id}
        setIsDeleteModalOpen={setIsDeleteModalOpen}
        isDeleteModalOpen={isDeleteModalOpen}
        setIsEditModalOpen={setIsEditModalOpen}
      />
    </Card.Root>
  );
}

export default ProductCard;
