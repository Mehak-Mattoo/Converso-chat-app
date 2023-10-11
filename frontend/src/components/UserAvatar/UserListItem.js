import React from "react";
import { Avatar } from "@chakra-ui/avatar";
import { Box, Text } from "@chakra-ui/layout";

export default function UserListItem({ User, handleFunction }) {
  // console.log(user.data.name);
  // console.log(user.data.email);
  return (
    <>
      <Box
        onClick={handleFunction}
        cursor="pointer"
        bg="#EDF2F7"
        _hover={{
          background: "#F86F03",
          color: "white",
        }}
        w="100%"
        d="flex"
        alignItems="center"
        color="black"
        px={3}
        py={2}
        mb={2}
        borderRadius="lg"
      >
        <div style={{ display: "flex" }}>
          <Avatar
            mr={2}
            size="sm"
            cursor="pointer"
            name={User.name}
            src={User.pic}
          />
          <Box>
            <Text
              fontWeight={"600"}
              letterSpacing={"2px"}
              paddingTop={"0.3rem"}
            >
              {User.name}
            </Text>
          </Box>
        </div>
        <Box>
          <Text fontSize="xs" paddingTop={"0.5rem"}>
            <b>Email : </b>
            {User.email}
          </Text>
        </Box>
      </Box>
    </>
  );
}
