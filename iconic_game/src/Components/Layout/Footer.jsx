import React from "react";
import { Box, Flex, Link, Text } from "@chakra-ui/react";

function Footer() {
  return (
    <Box
      as="footer"
      bgColor="teal.500"
      color="white"
      borderTop="1px solid white"
      py={4}>
      <Flex
        maxW="container.xl"
        mx="auto"
        alignItems="center"
        justifyContent="space-between">
        <Text fontSize="sm">&copy; {new Date().getFullYear()} My Game App</Text>
        <Flex alignItems="center">
          <Link
            mr={4}
            fontWeight="medium"
            _hover={{ textDecoration: "underline" }}>
            Privacy Policy
          </Link>
          <Link fontWeight="medium" _hover={{ textDecoration: "underline" }}>
            Terms of Service
          </Link>
        </Flex>
      </Flex>
    </Box>
  );
}

export default Footer;
