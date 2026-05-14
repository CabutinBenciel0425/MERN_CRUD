import {
  Button,
  CloseButton,
  Field,
  Fieldset,
  FileUpload,
  Flex,
  Input,
  InputGroup,
  Stack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useProductStore } from "../store/product";
import type { ProductFormType } from "../sharedTypes/types";
import { toaster } from "../components/ui/toaster";
import { LuFileUp } from "react-icons/lu";

function CreatePage() {
  const [newProduct, setNewProduct] = useState<ProductFormType>({
    name: "",
    price: "",
    image: "",
    description: "",
  });
  const [fileKey, setFileKey] = useState(0);
  const { createProduct } = useProductStore();

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    const { success, message } = await createProduct(newProduct);
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
      setNewProduct({ name: "", price: "", image: "", description: "" });
      setFileKey((prev) => prev + 1);
    }
  }

  return (
    <Flex
      h="100%"
      w="100vw"
      alignItems="center"
      justifyContent="center"
      mt={100}
    >
      <form
        onSubmit={handleSubmit}
        style={{ width: "100%", maxWidth: "500px", height: "100%" }}
      >
        <Fieldset.Root size="lg" maxW="md">
          <Stack>
            <Fieldset.Legend as="h1" fontSize="2xl">
              Add new Product
            </Fieldset.Legend>
            <Fieldset.HelperText>
              Please provide all details of the product
            </Fieldset.HelperText>
          </Stack>

          <Fieldset.Content>
            <Field.Root>
              <Field.Label>Name</Field.Label>
              <Input
                name="name"
                value={newProduct.name}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, name: e.target.value })
                }
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Price</Field.Label>
              <Input
                name="price"
                type="number"
                className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
                value={newProduct.price === 0 ? "" : newProduct.price}
                onChange={(e) =>
                  setNewProduct({
                    ...newProduct,
                    price: Number(e.target.value),
                  })
                }
              />
            </Field.Root>

            <Field.Root>
              <Field.Label>Description</Field.Label>
              <Input
                name="description"
                value={newProduct.description}
                onChange={(e) =>
                  setNewProduct({ ...newProduct, description: e.target.value })
                }
              />
            </Field.Root>

            <FileUpload.Root
              key={fileKey}
              gap="1"
              maxWidth="300px"
              onFileChange={(details) => {
                const file = details.acceptedFiles[0];
                if (file) {
                  setNewProduct({ ...newProduct, image: file });
                }
              }}
            >
              <FileUpload.HiddenInput />
              <FileUpload.Label>Upload Image</FileUpload.Label>
              <InputGroup
                startElement={<LuFileUp />}
                endElement={
                  <FileUpload.ClearTrigger asChild>
                    <CloseButton
                      me="-1"
                      size="xs"
                      variant="plain"
                      focusVisibleRing="inside"
                      focusRingWidth="2px"
                      pointerEvents="auto"
                      onClick={() =>
                        setNewProduct({ ...newProduct, image: "" })
                      }
                    />
                  </FileUpload.ClearTrigger>
                }
              >
                <Input asChild>
                  <FileUpload.Trigger>
                    <FileUpload.FileText lineClamp={1} />
                  </FileUpload.Trigger>
                </Input>
              </InputGroup>
            </FileUpload.Root>
          </Fieldset.Content>

          <Button
            type="submit"
            w={"100%"}
            alignSelf="flex-start"
            fontSize={"xl"}
          >
            Submit
          </Button>
        </Fieldset.Root>
      </form>
    </Flex>
  );
}

export default CreatePage;
