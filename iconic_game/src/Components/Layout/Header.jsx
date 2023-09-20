import React, { useState, useEffect } from "react";
import { Box, Flex, Heading, Link, Text } from "@chakra-ui/react";

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if the accessToken is present in local storage
    const accessToken = localStorage.getItem("accessToken");
    setIsLoggedIn(accessToken !== null);
      
  }, []);

  const handleLogout = () => {
    // Remove the accessToken from local storage
    localStorage.removeItem("accessToken");
    // Update the isLoggedIn state to false
    setIsLoggedIn(false);
    // Optionally, you can redirect to the login page or perform any other actions
    window.location.href = "/login";

  };

  return (
    <Box
      as="header"
      bgColor="teal.500"
      color="white"
      boxShadow="md"
      position="fixed"
      top="0"
      left="0"
      right="0"
      zIndex="999">
      <Flex
        maxW="container.xl"
        mx="auto"
        py={4}
        px={6}
        alignItems="center"
        justifyContent="space-between">
        <Heading as="h1" fontSize="xl">
          Game App
        </Heading>
        <Flex alignItems="center">
          <Link
            mr={4}
            fontWeight="medium"
            _hover={{ textDecoration: "underline" }}
            href="/">
            Game
          </Link>
          <Link
            mr={4}
            fontWeight="medium"
            _hover={{ textDecoration: "underline" }}
            href="/leaderboard">
            Leaderboard
          </Link>
          {isLoggedIn ? (
            <>
              <Link
                mr={4}
                fontWeight="medium"
                _hover={{ textDecoration: "underline" }}
                href="#"
                onClick={handleLogout}>
                Logout
              </Link>
            </>
          ) : (
            <Link
              fontWeight="medium"
              _hover={{ textDecoration: "underline" }}
              href="/login">
              Login
            </Link>
          )}
        </Flex>
      </Flex>
    </Box>
  );
}

export default Header;
