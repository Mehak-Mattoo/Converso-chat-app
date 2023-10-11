import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Text,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
} from "@chakra-ui/react";

import Login from "../components/Authentication/Login";
import SignUp from "../components/Authentication/SignUp";

export default function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) navigate("/chats");
  }, [navigate]);
  return (
    <>
      <Container centerContent alignItems={"start"}>
        <Box
          m="1rem 0 "
          borderRadius="lg"
          borderWidth="1px"
          p={3}
          boxShadow={"lg"}
        >
          <Box>
            {/* <Text
              fontSize={"4xl"}
              textAlign={"center"}
              color={"orange"}
              paddingBottom={"1rem"}
              fontWeight={"900"}
            >
              Converso
            </Text> */}
          </Box>

          <div style={{ display: "flex" }}>
            <Box>
              <Tabs variant="soft-rounded" colorScheme="orange">
                <TabList mb={"1em"}>
                  <Tab width={"50%"}>Login</Tab>
                  <Tab width={"50%"}>Sign-Up</Tab>
                </TabList>
                <TabPanels>
                  <TabPanel>
                    <Login />
                  </TabPanel>
                  <TabPanel>
                    <SignUp />
                  </TabPanel>
                </TabPanels>
              </Tabs>
            </Box>
          </div>
        </Box>
      </Container>
    </>
  );
}
