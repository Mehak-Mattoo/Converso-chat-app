import { CloseIcon } from "@chakra-ui/icons";
import { Box } from "@chakra-ui/react";
import React from "react";

export default function UserBadgeItem({ user, handleFunction }) {
  return (
    <>
      <Box
        p={2}
        m={2}
        borderRadius={"lg"}
        variant="solid"
        fontSize={12}
        bg={"#FFA41B"}
        //color={"white"}
        fontWeight={"700"}
        letterSpacing={"2px"}
        cursor={"pointer"}
        onClick={handleFunction}
      >
        {user.name}
        <CloseIcon fontSize={"1rem"} pl={1.5} />
      </Box>
    </>
  );
}
