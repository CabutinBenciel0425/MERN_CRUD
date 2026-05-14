import {
  Button,
  CloseButton,
  Dialog,
  Field,
  FileUpload,
  Image,
  Input,
  InputGroup,
  Portal,
  Stack,
} from "@chakra-ui/react";
import { useRef, useState } from "react";
import type { ProductType, ProductUpdateType } from "../sharedTypes/types";
import { LuFileUp } from "react-icons/lu";
import { useProductStore } from "../store/product";
import { toaster } from "./ui/toaster";

function EditProductModal({
  product,
  setIsModalOpen,
  isModalOpen,
}: {
  product: ProductType;
  setIsModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isModalOpen: boolean;
}) {
  const ref = useRef<HTMLInputElement | null>(null);
  const { updateProduct } = useProductStore();

  const [formState, setFormState] = useState<ProductUpdateType>({
    _id: product._id,
    name: product.name,
    price: product.price,
    description: product.description,
    image: product.image,
  });

  async function handleUpdateProduct() {
    const { success, message } = await updateProduct(formState);
    toaster.create({
      title: success ? "Success" : "Error",
      description: message,
      type: success ? "success" : "error",
      closable: true,
    });

    if (success) {
      setIsModalOpen(false);
    }
  }

  return (
    <Dialog.Root
      initialFocusEl={() => ref.current}
      role="alertdialog"
      placement="center"
      open={isModalOpen}
      onOpenChange={(details) => {
        setIsModalOpen(details.open);

        if (details.open) {
          setFormState({
            _id: product._id,
            name: product.name,
            price: product.price,
            description: product.description,
            image: product.image,
          });
        }
      }}
      closeOnInteractOutside={true}
      closeOnEscape={true}
      preventScroll={true}
      trapFocus={true}
    >
      <Portal>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>
              <Dialog.Title>Edit Product</Dialog.Title>
            </Dialog.Header>
            <Dialog.Body pb="4">
              <Stack gap="4">
                <Field.Root>
                  <Field.Label>Name</Field.Label>
                  <Input
                    name="name"
                    value={formState.name}
                    onChange={(e) =>
                      setFormState({ ...formState, name: e.target.value })
                    }
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Price</Field.Label>
                  <Input
                    name="price"
                    type="number"
                    className="[&::-webkit-outer-spin-button]:appearance-none [&::-webkit-inner-spin-button]:appearance-none [appearance:textfield]"
                    value={formState.price}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        price: Number(e.target.value),
                      })
                    }
                  />
                </Field.Root>

                <Field.Root>
                  <Field.Label>Description</Field.Label>
                  <Input
                    name="description"
                    value={formState.description}
                    onChange={(e) =>
                      setFormState({
                        ...formState,
                        description: e.target.value,
                      })
                    }
                  />
                </Field.Root>

                <FileUpload.Root
                  //   key={fileKey}
                  gap="1"
                  maxWidth="300px"
                  onFileChange={(details) => {
                    const file = details.acceptedFiles[0];
                    if (file) {
                      setFormState({ ...formState, image: file });
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
                {typeof formState.image === "string" && (
                  <Image
                    src={formState.image}
                    alt="Current product image"
                    maxH="100px"
                    maxW="100px"
                  />
                )}
              </Stack>
            </Dialog.Body>
            <Dialog.Footer>
              <Dialog.ActionTrigger asChild>
                <Button variant="outline">Cancel</Button>
              </Dialog.ActionTrigger>
              <Button onClick={handleUpdateProduct}>Save</Button>
            </Dialog.Footer>
          </Dialog.Content>
        </Dialog.Positioner>
      </Portal>
    </Dialog.Root>
  );
}

export default EditProductModal;
