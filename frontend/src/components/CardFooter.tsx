import {
  Button,
  ButtonGroup,
  Card,
  CloseButton,
  Dialog,
  Portal,
} from "@chakra-ui/react";
import type React from "react";
import { FaRegEdit } from "react-icons/fa";
import { FaRegTrashCan } from "react-icons/fa6";

function CardFooter({
  onDeleteProduct,
  id,
  setIsDeleteModalOpen,
  isDeleteModalOpen,
  setIsEditModalOpen,
}: {
  onDeleteProduct: (id: string) => void;
  id: string;
  setIsDeleteModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isDeleteModalOpen: boolean;
  setIsEditModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  function handleUpdateProduct() {
    setIsEditModalOpen(true);
  }

  return (
    <Card.Footer gap="2">
      <ButtonGroup size="sm" variant="subtle">
        <Button onClick={handleUpdateProduct}>
          <FaRegEdit />
        </Button>

        <Dialog.Root
          role="alertdialog"
          placement="center"
          open={isDeleteModalOpen}
          onOpenChange={(details) => setIsDeleteModalOpen(details.open)}
          closeOnInteractOutside={true}
          closeOnEscape={true}
          preventScroll={true}
          trapFocus={true}
        >
          <Dialog.Trigger asChild>
            <Button colorPalette="red">
              <FaRegTrashCan />
            </Button>
          </Dialog.Trigger>
          <Portal>
            <Dialog.Backdrop />
            <Dialog.Positioner>
              <Dialog.Content>
                <Dialog.Header>
                  <Dialog.Title>Are you sure?</Dialog.Title>
                </Dialog.Header>
                <Dialog.Body>
                  <p>
                    This action cannot be undone. This will permanently delete
                    this product and remove it from our systems.
                  </p>
                </Dialog.Body>
                <Dialog.Footer>
                  <Dialog.ActionTrigger asChild>
                    <Button variant="outline">Cancel</Button>
                  </Dialog.ActionTrigger>
                  <Button
                    colorPalette="red"
                    onClick={() => {
                      onDeleteProduct(id);
                      setIsDeleteModalOpen(false);
                    }}
                  >
                    Delete
                  </Button>
                </Dialog.Footer>
                <Dialog.CloseTrigger asChild>
                  <CloseButton size="sm" />
                </Dialog.CloseTrigger>
              </Dialog.Content>
            </Dialog.Positioner>
          </Portal>
        </Dialog.Root>
      </ButtonGroup>
    </Card.Footer>
  );
}

export default CardFooter;
