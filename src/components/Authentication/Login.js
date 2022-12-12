import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  useToast,
  VStack,
} from "@chakra-ui/react";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../../utils/axios";
const initForm = {
  email: "",
  password: "",
};
const Login = () => {
  const [formValue, setFormValue] = useState(initForm);
  const [show, setShow] = useState(false);
  const [loading, setLoading] = useState(false);

  const toast = useToast();
  const navigate = useNavigate();

  const handleFormChange = (e) => {
    let { name, value } = e.target;
    setFormValue({ ...formValue, [name]: value });
  };
  const handleClick = () => {
    setShow(!show);
  };

  const handleSubmit = async () => {
    setLoading(true);
    let { email, password } = formValue;
    if (!email || !password) {
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

    try {
      const { data } = await axiosInstance.post("/api/user/login", {
        email,
        password,
      });

      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      localStorage.setItem("userInfo", JSON.stringify(data));

      localStorage.setItem("token", data.token);
      setLoading(false);
      // navigate("/chats");
      window.location.href = "/chats";
    } catch (err) {
      toast({
        title: "Error Occured!",
        description: err.response.data?.message,
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
      <div className="letter-image">
        <div className="animated-mail">
          <div className="back-fold"></div>
          <div className="letter">
            <div className="letter-border"></div>
            <div className="letter-title"></div>
            <div className="letter-context"></div>
            <div className="letter-stamp">
              <div className="letter-stamp-inner"></div>
            </div>
          </div>
          <div className="top-fold"></div>
          <div className="body"></div>
          <div className="left-fold"></div>
        </div>
        <div className="shadow"></div>
      </div>
      <FormControl id={"emailLogin"} isRequired>
        <FormLabel>Email</FormLabel>
        <Input
          name="email"
          placeholder="Enter Your Email"
          onChange={handleFormChange}
          value={formValue.email}
        />
      </FormControl>
      <FormControl id={"passwordLogin"} isRequired>
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
            type={show ? "text" : "password"}
            name="password"
            placeholder="Enter Your Password"
            onChange={handleFormChange}
            value={formValue.password}
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

      <Button
        color={"black"}
        backgroundColor="#4A5568"
        width="100%"
        style={{ marginTop: 15 }}
        onClick={handleSubmit}
        isLoading={loading}
      >
        Login
      </Button>
      <Button
        variant={"solid"}
        color={"black"}
        backgroundColor="RGBA(0, 0, 0, 0.20)"
        width={"100%"}
        onClick={() =>
          setFormValue({ email: "guest@example.com", password: "123456" })
        }
      >
        Get Guest User Credentials
      </Button>
    </VStack>
  );
};

export default Login;
