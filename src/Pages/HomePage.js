import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Text,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from "@chakra-ui/react";
import Login from "../components/Authentication/Login";
import Signup from "../components/Authentication/Signup";

const HomePage = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if (user) {
      navigate("/chats");
    }
  }, [navigate]);

  return (
    <Container maxW={"xl"} centerContent marginTop={16}>
      <Box className="starsCss">
        <div id="stars"></div>
        <div id="stars2"></div>
        <div id="stars3"></div>
      </Box>

      <Box
        display="flex"
        justifyContent={"center"}
        p={3}
        bg={"-webkit-linear-gradient(white, #38495a)"}
        w={"100%"}
        m={"40px 0 15px 0"}
        borderRadius={"lg"}
        borderWidth={"1px"}
      >
        <Text
          textAlign={"center"}
          fontSize={"4xl"}
          fontFamily={"Work sans"}
          color={"black"}
        >
          Chat App
        </Text>
      </Box>
      <Box
        bg={"-webkit-linear-gradient(white, #38495a)"}
        w={"100%"}
        p={4}
        borderRadius={"lg"}
        color={"black"}
        borderWidth={"1px"}
      >
        <Tabs variant={"soft-rounded"} colorScheme={"facebook"}>
          <TabList mb={"1em"}>
            <Tab width={"50%"}>Login</Tab>
            <Tab width={"50%"}>Sign Up</Tab>
          </TabList>
          <TabPanels>
            <TabPanel>
              <Login />
            </TabPanel>
            <TabPanel>
              <Signup />
            </TabPanel>
          </TabPanels>
        </Tabs>
        <Text
          marginLeft={{ base: "65%", md: "73%" }}
          fontFamily="Work sans"
          fontSize="12px"
        >
          Created By QuocTang
        </Text>
      </Box>
    </Container>
  );
};

export default HomePage;
