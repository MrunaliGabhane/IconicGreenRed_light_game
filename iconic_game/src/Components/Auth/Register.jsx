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
} from "@chakra-ui/react";
import { Link, useParams } from "react-router-dom";
import axios from "axios"; // Import Axios for making API requests
import "./Login.css"; // Add your custom CSS for styling and animations
import Swal from "sweetalert2";

const Register = () => {
  const history = useParams();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);
      setError("");

      axios.post(
        "https://iconic-r0xu.onrender.com/api/auth/register",
        formData
      );
      Swal.fire({
        icon: 'success',
        title: 'Registration Successful',
        text: 'You have successfully registered!',
        confirmButtonText: 'OK',
      }).then(() => {
        // Redirect to /login
        window.location.href = '/login';
      });

      setLoading(false);
      
    } catch (err) {
      setLoading(false);
      setError("An error occurred. Please try again.");
      Swal.fire({
        icon: "error",
        title: "Registration Error",
        text: "An error occurred while registering. Please try again.",
      });
    }
  };
  // console.log(formData)
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
          Register
        </Heading>
        <form onSubmit={handleSubmit} style={{ width: "100%" }}>
          <FormControl isRequired>
            <FormLabel>Name</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Enter your name"
              size="lg"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Email</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Enter your email"
              size="lg"
            />
          </FormControl>
          <FormControl isRequired>
            <FormLabel>Number</FormLabel>
            <Input  type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}placeholder="Enter you Number" size="lg" />
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
            loadingText="Registering">
            Register
          </Button>
        </form>
        <Text>
          Already have an account?{" "}
          <ChakraLink as={Link} to="/login" color="teal.500">
            Login here
          </ChakraLink>
        </Text>
      </VStack>
    </Center>
  );
};

export default Register;
