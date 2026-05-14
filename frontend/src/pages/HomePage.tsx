import { Container, SimpleGrid, Text, VStack } from "@chakra-ui/react";
import { GrCart } from "react-icons/gr";
import { Link } from "react-router-dom";

import { useEffect } from "react";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

function HomePage() {
  const { fetchProducts, products } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  return (
    <Container maxW="100vw" py="12">
      <VStack gap="10">
        <Text
          fontSize="30px"
          fontWeight="bold"
          color="blue.400"
          textAlign="center"
          className="flex flex-row items-center justify-center gap-2"
        >
          Current Products{" "}
          <span>
            <GrCart />
          </span>
        </Text>

        {products.length <= 0 && (
          <Text fontSize="xl" fontWeight="bold">
            No products found! 🙁{" "}
            <Link to="/create">
              <Text
                as="span"
                color="blue.400"
                _hover={{ textDecoration: "underline" }}
              >
                Create a new one
              </Text>
            </Link>
          </Text>
        )}

        <SimpleGrid columns={{ base: 1, md: 2, lg: 3, xl: 4 }} gap="10">
          {products.map((product) => (
            <ProductCard product={product} key={product._id} />
          ))}
        </SimpleGrid>
      </VStack>
    </Container>
  );
}

export default HomePage;
