import React from "react";
import { ViewIcon } from "@chakra-ui/icons";
import { IconButton, Image, Text, useDisclosure } from "@chakra-ui/react";
import { Button } from "@chakra-ui/button";
import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from "@chakra-ui/react";

export default function ProfileModal({ user, children }) {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      {children ? (
        <span onClick={onOpen}>{children}</span>
      ) : (
        <IconButton
          display={{ base: "flex" }}
          icon={<ViewIcon />}
          onClick={onOpen}
        ></IconButton>
      )}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent bg={"white"}>
          <ModalHeader fontSize="2.7vw" display="flex" justifyContent="center">
            {user.name}
          </ModalHeader>
          <ModalCloseButton />
          <ModalBody
            display="flex"
            flexDir="column"
            alignItems="center"
            justifyContent="space-between"
          >
            <Image
              marginBottom={5}
              borderRadius="full"
              boxSize="15vw"
              src={user.pic}
              alt={user.name}
            />
            <Text fontSize="2vw"> Email: {user.email}</Text>
          </ModalBody>

          <ModalFooter>
            <Button
              color={"white"}
              bg="#F86F03"
              mr={3}
              onClick={onClose}
              _hover={{ bg: "#F86F03" }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
  );
}
