import React, { useEffect, useState } from "react";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../components/Authentication/misc/SideDrawer";
import MyChats from "../components/Authentication/MyChats";
import ChatBox from "../components/ChatBox";
import { ChatState } from "../Context/ChatProvider";

export default function ChatPage() {
  const { User } = ChatState();
  const [fetchAgain, setfetchAgain] = useState(false);

  return (
    <div style={{ width: "100vw" }}>
      {User && <SideDrawer />}
      <Box
        display="flex"
        justifyContent={"space-between"}
        w="100%"
        height={"91vh"}
      >
        {User && <MyChats fetchAgain={fetchAgain} />}
        {User && (
          <ChatBox fetchAgain={fetchAgain} setfetchAgain={setfetchAgain} />
        )}
      </Box>
    </div>
  );
}
