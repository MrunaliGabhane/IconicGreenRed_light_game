import React, { useState } from 'react';
import {
  Box,
  FormControl,
  FormLabel,
  Input,
  Select,
  Button,
  VStack,
  Text,
  FormErrorMessage,
} from '@chakra-ui/react';

function RegistrationForm({ onStartGame }) {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
    difficulty: 'easy',
  });

  const [formErrors, setFormErrors] = useState({
    name: '',
    email: '',
    mobile: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const validateForm = () => {
    const errors = {};

    if (!formData.name.trim()) {
      errors.name = 'Name is required';
    }

    if (!formData.email.trim()) {
      errors.email = 'Email is required';
    } else if (!isValidEmail(formData.email)) {
      errors.email = 'Invalid email format';
    }

    if (!formData.mobile.trim()) {
      errors.mobile = 'Mobile number is required';
    } else if (!isValidMobile(formData.mobile)) {
      errors.mobile = 'Invalid mobile number format';
    }

    return errors;
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const errors = validateForm();
    if (Object.keys(errors).length === 0) {
      // Form is valid, start the game
      onStartGame(formData.difficulty);
    } else {
      // Update formErrors state with validation errors
      setFormErrors(errors);
    }
  };

  const isValidEmail = (email) => {
    const emailRegex = /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/;
    return emailRegex.test(email);
  };

  const isValidMobile = (mobile) => {
    const mobileRegex = /^\d{10}$/;
    return mobileRegex.test(mobile);
  };

  return (
    <Box p={4}>
      <VStack spacing={4}>
        <Text fontSize="2xl">User Registration</Text>
        <form onSubmit={handleSubmit}>
          <FormControl isInvalid={formErrors.name}>
            <FormLabel>Name:</FormLabel>
            <Input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
            />
            <FormErrorMessage>{formErrors.name}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formErrors.email}>
            <FormLabel>Email:</FormLabel>
            <Input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
            />
            <FormErrorMessage>{formErrors.email}</FormErrorMessage>
          </FormControl>
          <FormControl isInvalid={formErrors.mobile}>
            <FormLabel>Mobile Number:</FormLabel>
            <Input
              type="tel"
              name="mobile"
              value={formData.mobile}
              onChange={handleChange}
            />
            <FormErrorMessage>{formErrors.mobile}</FormErrorMessage>
          </FormControl>
          <FormControl>
            <FormLabel>Difficulty Level:</FormLabel>
            <Select
              name="difficulty"
              value={formData.difficulty}
              onChange={handleChange}
            >
              <option value="easy">Easy</option>
              <option value="medium">Medium</option>
              <option value="hard">Hard</option>
            </Select>
          </FormControl>
          <Button type="submit" colorScheme="blue">
            Start Game
          </Button>
        </form>
      </VStack>
    </Box>
  );
}

export default RegistrationForm;
