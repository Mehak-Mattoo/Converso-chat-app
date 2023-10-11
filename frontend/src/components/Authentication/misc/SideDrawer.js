import { Button } from "@chakra-ui/button";
import { useDisclosure } from "@chakra-ui/hooks";
import { Input } from "@chakra-ui/input";
import { useNavigate } from "react-router-dom";
import { Box, Text } from "@chakra-ui/layout";
import {
  Menu,
  MenuButton,
  MenuDivider,
  MenuItem,
  MenuList,
} from "@chakra-ui/menu";
import {
  Drawer,
  DrawerBody,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
} from "@chakra-ui/modal";
import { Tooltip, flexbox } from "@chakra-ui/react";
import { BellIcon, ChevronDownIcon, SearchIcon } from "@chakra-ui/icons";
import { Avatar } from "@chakra-ui/avatar";
import { useState } from "react";
import axios from "axios";
import { useToast } from "@chakra-ui/toast";

import { Spinner } from "@chakra-ui/spinner";
import { color } from "framer-motion";
import { ChatState } from "../../../Context/ChatProvider";
import ProfileModal from "./ProfileModal";
import ChatLoading from "../../ChatLoading";
import UserListItem from "../../UserAvatar/UserListItem";
import { getSender } from "../../../config/ChatLogics";
import { Badge } from "@chakra-ui/react";
// import NotificationBadge from "react-notification-badge";

export default function SideDrawer() {
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState(false);
  const {
    setSelectedChat,
    User,
    setUser,
    notification,
    setNotification,
    chats,
    setChats,
  } = ChatState();

  const logOutHandler = () => {
    localStorage.removeItem("userInfo");
    setChats([]);
    setUser(null);
    navigate("/");
  };

  const accessChat = async (userId) => {
    try {
      setLoadingChat(true);
      const config = {
        headers: {
          "Content-type": "application/json",
          Authorization: `Bearer ${User.data.token}`,
        },
      };
      const { data } = await axios.post(`/chat`, { userId }, config);

      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]); //if there are ny prexisting chats between users, copy and set them

      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error fetching the chat",
        description: error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  const handleSearch = async () => {
    if (!search) {
      toast({
        title: "Empty Search Field",
        status: "warning",
        duration: 2000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }

    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${User.data.token}`,
        },
      };

      const { data } = await axios.get(`/user?search=${search}`, config);
      setLoading(false);
      setSearchResult(data);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Search Results",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "bottom-left",
      });
    }
  };

  return (
    <>
      <Box
        display="flex"
        justifyContent="space-between"
        alignItems="center"
        bg="#525FE1"
        color="white"
        w="100%"
        p="0.5rem 1rem "
        borderBottom=" white 0.2rem"
      >
        <Tooltip label="Search Users to chat" hasArrow placement="bottom-end">
          <Button
            variant="ghost"
            bg={"#949cf5"}
            _hover={{ bg: "#FF731D" }}
            onClick={onOpen}
          >
            <i style={{ color: "white" }} className="fas fa-search"></i>
            <Text display={{ base: "none", md: "flex" }} px={4} color={"white"}>
              Search User
            </Text>
          </Button>
        </Tooltip>
        <Text fontSize={"3xl"} fontWeight={800} letterSpacing={"2px"}>
          Converso
        </Text>
        <div style={{ display: "flex" }}>
          <Menu display="flex">
            <MenuButton>
              <BellIcon fontSize={"2xl"} m={1} />
              <Badge color="red" background={"white"} borderRadius={"xl"}>
                {" "}
                {notification.length}
              </Badge>
            </MenuButton>
            <MenuList fontSize={"sm"} pl={2} color={"grey"}>
              {!notification.length && "No new messages"}
              {notification.map((notif) => (
                <MenuItem
                  key={notif._id}
                  onClick={() => {
                    setSelectedChat(notif.chat);
                    setNotification(notification.filter((n) => n !== notif));
                  }}
                >
                  {notif.chat.isGroupChat
                    ? `New Message in ${notif.chat.chatName}`
                    : `New Message from ${getSender(User, notif.chat.users)}`}
                </MenuItem>
              ))}
            </MenuList>
          </Menu>
          <Menu>
            <MenuButton
              as={Button}
              bg={"#525FE1"}
              py={4}
              _hover={{ bg: "#949cf5" }}
              rightIcon={<ChevronDownIcon color={"white"} />}
            >
              <Avatar
                size={"xs"}
                cursor={"pointer"}
                name={User.data.name}
                src={User.data.pic}
              ></Avatar>
            </MenuButton>

            <MenuList color={"black"}>
              <ProfileModal user={User.data}>
                <MenuItem>My Profile</MenuItem>
              </ProfileModal>

              <MenuDivider />
              <MenuItem onClick={logOutHandler}>Log Out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>

      <Drawer placement="left" onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerHeader borderBottomWidth={"2px"} fontSize={"1.8vw"}>
            Search Users
          </DrawerHeader>
          <DrawerBody>
            <Box display={"flex"} pb={2}>
              <Input
                fontSize={"0.78rem"}
                placeholder="Search By Name Or Email"
                mr={2}
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <Button onClick={handleSearch}>Go</Button>
            </Box>
            {loading ? (
              <ChatLoading />
            ) : (
              searchResult?.map((User) => (
                <UserListItem
                  key={User._id}
                  User={User}
                  handleFunction={() => accessChat(User._id)}
                />
              ))
            )}

            {loadingChat && (
              <Spinner
                m={"auto"}
                color="orange"
                mt={2}
                size={"lg"}
                display={"flex"}
              />
            )}
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
}
