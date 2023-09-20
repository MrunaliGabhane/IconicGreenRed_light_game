import React, { useState } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Heading,
  Text,
  Link as ChakraLink,
  Center,
  VStack,
  Alert,
  AlertIcon,
  Spinner,
  Select,
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // Import Axios for making API requests
import "./Login.css"; // Add your custom CSS for styling and animations
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const history = useParams();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const validateForm = () => {
    const errors = {};
    if (!isValidMobile(formData.mobile)) {
      errors.mobile = "Invalid mobile number format";
    }

    return errors;
  };
  const isValidMobile = (mobile) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      const response = await axios.post(
        "https://iconic-r0xu.onrender.com/api/auth/login",
        formData
      );

      // Successful login logic
      localStorage.setItem("accessToken", response.data.accessToken);
      // console.log(formData.email)
      localStorage.setItem("user", formData.email);
      setLoading(false);
      ///reload page
      navigate("/");
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again.");
    }
  };

  return (
    <Center minH="100vh" bgGradient="linear(to-t, teal.300, teal.500)">
      <VStack
        spacing={8}
        w="100%"
        maxW="400px"
        p={4}
        borderRadius="md"
        bgColor="white"
        boxShadow="md">
        <Heading as="h2" size="xl">
          Login
        </Heading>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              size="lg"
              style={{ color: "black" }}
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Password</FormLabel>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              size="lg"
            />
          </FormControl>
         
          {error && (
            <Alert status="error" mt={4} borderRadius="md">
              <AlertIcon />
              {error}
            </Alert>
          )}
          <Button
            mt={6}
            colorScheme="teal"
            type="submit"
            size="lg"
            w="100%"
            isLoading={loading}
            loadingText="Logging in">
            Login
          </Button>
        </form>
        <Text>
          Don't have an account?{" "}
          <ChakraLink as={Link} to="/register" color="teal.500">
            Register here
          </ChakraLink>
        </Text>
      </VStack>
    </Center>
  );
};
export default Login;
