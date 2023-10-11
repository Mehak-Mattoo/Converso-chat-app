import React from "react";
import { ChatState } from "../Context/ChatProvider";
import { Box } from "@chakra-ui/layout";
import SingleChat from "./SingleChat";

export default function ChatBox({ fetchAgain, setfetchAgain }) {
  const { selectedChat } = ChatState();

  return (
    <>
      <Box
        display={{ base: selectedChat ? "flex" : "none", md: "flex" }}
        alignItems="center"
        flexDir="column"
        p={3}
        bg="#F5F5F5"
        w={{ base: "100%", md: "68%" }}
        borderRadius="lg"
        borderWidth="1px"
      >
        <SingleChat fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
      </Box>
    </>
  );
}
