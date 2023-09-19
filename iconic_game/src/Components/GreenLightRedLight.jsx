import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Flex,
  Text,
  useColorMode,
  useColorModeValue,
} from "@chakra-ui/react";

function GreenLightRedLight({ difficulty }) {
  const { toggleColorMode } = useColorMode();
  const borderColor = useColorModeValue("gray.300", "gray.700");
  const [gameState, setGameState] = useState("idle"); // 'idle', 'playing', 'gameOver', 'youWin'
  const [boxColor, setBoxColor] = useState("green");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // Time in seconds
  const [clickCount, setClickCount] = useState(0); // Number of clicks required

  // Function to generate a random time interval between 1s and 2s
  const getRandomTimeInterval = () => {
    return 1500 + Math.random() * 500; // Change the time range to 1.5s to 2s
  };

  // Start the game when the button is pressed
  const startGame = () => {
    // Set initial game state and timer based on difficulty
    let timeLimit = 0;
    let initialClickCount = 0;

    if (difficulty === "easy") {
      timeLimit = 40;
      initialClickCount = 10;
    } else if (difficulty === "medium") {
      timeLimit = 40;
      initialClickCount = 15;
    } else if (difficulty === "hard") {
      timeLimit = 40;
      initialClickCount = 25;
    }

    setTimeLeft(timeLimit);
    setClickCount(initialClickCount);
    setGameState("playing");

    // Function to change the box color between green and red with a random interval
    const changeBoxColor = () => {
      const newColor = boxColor === "green" ? "red" : "green";
      setBoxColor(newColor);
    };

    // Start the initial color change
    changeBoxColor(); // Change the color immediately
    let colorChangeTimer = setInterval(changeBoxColor, getRandomTimeInterval());

    // Timer to reduce timeLeft every second
    const timerId = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime > 0) {
          return prevTime - 1;
        } else {
          // If timeLeft reaches 0, end the game
          clearInterval(colorChangeTimer); // Stop color change
          endGame();
          return 0;
        }
      });
    }, 1000);

    // Clean up intervals and timers when the game is over
    setTimeout(() => {
      clearInterval(colorChangeTimer); // Clear the color change timer
      clearInterval(timerId); // Clear the timer interval
      endGame();
    }, timeLimit * 1000);
  };

  // Function to handle box click
  const handleBoxClick = () => {
    if (boxColor === "green" && gameState === "playing") {
      setScore(score + 1);
      setClickCount(clickCount - 1);

      // Check if the player has won
      if (clickCount === 1) {
        setGameState("youWin");
      }
    } else if (boxColor === "red" && gameState === "playing") {
      endGame();
    }
  };

  // Function to end the game
  const endGame = () => {
    setGameState("gameOver");
  };

  useEffect(() => {
    // Start the game when the game state changes to 'playing'
    if (gameState === "playing") {
      startGame();
    }
  }, [gameState]);

  return (
    <Center h="100vh">
      <Box
        p={4}
        bg={useColorModeValue("gray.200", "gray.800")}
        borderRadius="md"
        boxShadow="md"
        borderWidth="1px"
        borderColor={borderColor}
        maxW="400px"
        w="100%"
        textAlign="center">
        {/* Display the box with dynamic color */}
        <Box
          className={`box ${boxColor}`}
          onClick={handleBoxClick}
          w="100px"
          h="100px"
          borderRadius="full"
          cursor="pointer"
          transition="background-color 0.3s ease-in-out"
          _hover={{ bgColor: "red" }}></Box>

        {/* Display game status */}
        <Text mt={4} fontSize="xl">
          {gameState === "idle" && (
            <Button onClick={startGame} colorScheme="teal">
              Start Game
            </Button>
          )}
          {gameState === "youWin" && <Text color="green.500">You win!</Text>}
          {gameState === "gameOver" && <Text color="red.500">Game Over!</Text>}
          {gameState === "playing" && (
            <Text>
              Time left: {timeLeft} seconds
              <br />
              Score: {score} | Clicks Remaining: {clickCount}
            </Text>
          )}
        </Text>
        <Button
          mt={4}
          onClick={toggleColorMode}
          colorScheme={useColorModeValue("teal", "gray")}>
          Toggle Dark Mode
        </Button>
      </Box>
    </Center>
  );
}

export default GreenLightRedLight;
