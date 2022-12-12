import {
  Button,
  calc,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useDisclosure,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import { URL_BACKEND, URL_CLOUDINARY } from "../../config/url";
import axiosInstance from "../../utils/axios";

const initForm = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
  pic: "",
  userVerify: "",
};

const Signup = () => {
  const [formValue, setFormValue] = useState(initForm);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);
  const [pic, setPic] = useState();
  const [verifyCode, setVerifyCode] = useState("");

  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleClick = () => {
    setShow(!show);
  };

  const postDetails = (e) => {
    setLoading(true);
    let { files } = e.target;
    setFormValue({ ...formValue, ["pic"]: files[0].name });

    if (files[0] === undefined) {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      return;
    }
    if (files[0].type === "image/jpeg" || files[0].type === "image/png") {
      const URL = URL_CLOUDINARY;
      const data = new FormData();
      data.append("file", files[0]);
      data.append("upload_preset", "chat-app");
      data.append("cloud_name", "dohex0rdu");
      axios
        .post(URL, data)
        .then((res) => {
          setPic(res.data.url);
          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);
        });
    } else {
      toast({
        title: "Please Select an Image!",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
  };

  const handleSubmit = async () => {
    setLoading(true);
    let { name, email, password, confirmPassword } = formValue;
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (formValue.userVerify !== verifyCode) {
      toast({
        title: "Email Verification Failed",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      setLoading(false);
      return;
    }
    try {
      const { data } = await axiosInstance.post("/api/user", {
        name,
        email,
        password,
        pic,
      });
      toast({
        title: "Registration Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });

      localStorage.setItem("userInfo", JSON.stringify(data));
      setLoading(false);
      navigate("/chats");
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  const handleSignUp = async () => {
    setLoading(true);
    let { name, email, password, confirmPassword } = formValue;
    if (!name || !email || !password || !confirmPassword) {
      toast({
        title: "Please Fill all the Fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }
    if (password !== confirmPassword) {
      toast({
        title: "Passwords Do Not Match",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
      return;
    }

    try {
      const { data } = await axiosInstance.post(
        "/api/user/emailAuthentication",
        { name, email }
      );
      if (data === "email is required") {
        toast({
          title: "Email Address Is Required!",
          status: "warning",
          duration: 5000,
          isClosable: true,
          position: "top",
        });
        setLoading(false);
        return;
      }
      toast({
        title: "Please verify your email address!",
        status: "info",
        duration: 5000,
        isClosable: true,
        position: "top",
      });

      setVerifyCode(data);
      onOpen();
      setLoading(false);
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: err.response.data.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setLoading(false);
    }
  };

  return (
    <VStack spacing={"5px"} color={"black"}>
      <FormControl id={"first-name"} isRequired>
        <FormLabel>Name</FormLabel>
        <Input
          name="name"
          placeholder="Enter Your Name"
          onChange={handleFormChange}
        ></Input>
      </FormControl>
      <FormControl id={"email"} isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          placeholder="Enter Your Email"
          onChange={handleFormChange}
        />
      </FormControl>
      <FormControl id={"password"} isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            name="password"
            placeholder="Enter Your Password"
            onChange={handleFormChange}
          />
          <InputRightElement width={"4.5rem"}>
            <Button
              backgroundColor="#A0AEC0"
              h={"1.75rem"}
              size={"sm"}
              onClick={handleClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id={"confirmPassword"} isRequired>
        <FormLabel>Confirm Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            name="confirmPassword"
            placeholder="Confirm password"
            onChange={handleFormChange}
          />
          <InputRightElement width={"4.5rem"}>
            <Button
              backgroundColor="#A0AEC0"
              h={"1.75rem"}
              size={"sm"}
              onClick={handleClick}
            >
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
      <FormControl id={"pic"}>
        <FormLabel>Upload your Picture</FormLabel>
        <Input
          id="picok"
          visibility="hidden"
          type={"file"}
          p={1.5}
          accept={"image/*"}
          onChange={postDetails}
        />
        <Button
          backgroundColor="#A0AEC0"
          position="absolute"
          left="0"
          w="40%"
          zIndex={0}
          onClick={() => document.getElementById("picok").click()}
        >
          Choose File
        </Button>
        <Text
          position="absolute"
          left="45%"
          top="48%"
          whiteSpace="nowrap"
          w="55%"
          h="50%"
          border="1px solid gray"
          borderRadius="5%"
          textAlign="center"
          p="5px 10px 0 10px"
        >
          {formValue.pic.length > 32
            ? formValue.pic.substring(1, 10) +
              " . . . " +
              formValue.pic.substring(
                formValue.pic.length - 10,
                formValue.pic.length
              )
            : formValue.pic}
        </Text>
      </FormControl>
      <Button
        color={"black"}
        backgroundColor="RGBA(0, 0, 0, 0.20)"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSignUp}
        isLoading={loading}
      >
        Sign Up
      </Button>
      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Please verify your email address</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            Hi name, Please verify your email address so we know that it's
            really you!
            <Input mt={5} name="userVerify" onChange={handleFormChange}></Input>
          </ModalBody>

          <ModalFooter display="flex" justifyContent="space-between">
            <Button colorScheme="blue" mr={3} onClick={handleSubmit}>
              Verify my email address
            </Button>
            <Button colorScheme="blue" mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </VStack>
  );
};

export default Signup;
