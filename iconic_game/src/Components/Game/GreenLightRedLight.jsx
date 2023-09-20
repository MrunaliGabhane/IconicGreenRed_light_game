import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Center,
  Heading,
  Text,
  useToast,
  Select,
} from "@chakra-ui/react";
import axios from "axios";
import Swal from "sweetalert2";

function GreenLightRedLight() {
  const [gameStatus, setGameStatus] = useState("idle");
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [currentColor, setCurrentColor] = useState("red");
  const [mode, setMode] = useState("easy"); // Default mode is easy
  const toast = useToast();

  const modeOptions = ["easy", "medium", "hard"];

  useEffect(() => {
    const timer = setInterval(() => {
      if (timeLeft > 0 && gameStatus === "playing") {
        setTimeLeft(timeLeft - 1);
        if (timeLeft % 2 === 0) {
          setCurrentColor(currentColor === "green" ? "red" : "green");
        }
      } else if (gameStatus === "playing") {
        endGame();
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, gameStatus, currentColor]);

  useEffect(() => {
    // Reset game when mode changes
    if (gameStatus !== "idle") {
      setGameStatus("idle");
      setScore(0);
      setCurrentColor("red");
      setTimeLeft(0);
    }

    // Set time limit based on the selected mode
    switch (mode) {
      case "easy":
        setTimeLeft(40);
        break;
      case "medium":
        setTimeLeft(40);
        break;
      case "hard":
        setTimeLeft(40);
        break;
      default:
        setTimeLeft(40); // Default to easy mode
        break;
    }
  }, [mode]);

  const startGame = () => {
    setGameStatus("playing");
    setScore(0);
  };

  const endGame = async () => {
    setGameStatus("idle");
    const userEmail = localStorage.getItem("user");
    console.log(userEmail, score);

    let winMessage = "";
    if (mode === "easy") {
      winMessage = score >= 10 ? "You Win!" : "You Lose!";
    } else if (mode === "medium") {
      winMessage = score >= 15 ? "You Win!" : "You Lose!";
    } else if (mode === "hard") {
      winMessage = score >= 25 ? "You Win!" : "You Lose!";
    }

    try {
      const response = await axios.post(
        "https://iconic-r0xu.onrender.com/api/score",
        {
          email: userEmail,
          score,
        }
      );

      Swal.fire({
        title: "Game Over!",
        html: `${winMessage} Your Score: ${score} <span class="emoji">&#x1F60E;</span> <span class="emoji">&#x1F389;</span>`,
        icon: winMessage === "You Win!" ? "success" : "error",
        timer: 3000,
        showCloseButton: true,
      });
    } catch (error) {
      console.error("Error posting the score:", error);
      Swal.fire({
        title: "An error occurred.",
        icon: "error",
        timer: 3000,
        showCloseButton: true,
      });
    }
  };

  const handleLightClick = () => {
    if (gameStatus === "playing") {
      if (currentColor === "green") {
        setScore(score + 1);
      } else if (currentColor === "red") {
        endGame();
        return; // Prevent further clicks after game over
      }
      setCurrentColor("red"); // Prevent multiple clicks
    }
  };

  return (
    <Center minH="100vh" bgColor="teal.300">
      <Box
        p={8}
        bgColor="white"
        borderRadius="md"
        boxShadow="lg"
        textAlign="center"
        w="90%"
      >
        <Heading as="h2" size="xl" mb={6}>
          Squid Game - Green Light, Red Light
        </Heading>
        {gameStatus === "idle" ? (
          <>
            <Select
              value={mode}
              onChange={(e) => setMode(e.target.value)}
              mb={4}
            >
              {modeOptions.map((option) => (
                <option key={option} value={option}>
                  {option}
                </option>
              ))}
            </Select>
            <Button colorScheme="teal" size="lg" onClick={startGame}>
              Start Game
            </Button>
          </>
        ) : (
          <>
            <Text fontSize="2xl" fontWeight="bold" mt={4}>
              Score: {score}
            </Text>
            <Text fontSize="2xl">Time Left: {timeLeft} seconds</Text>
            <Box
              bgColor={currentColor}
              width="200px"
              height="200px"
              borderRadius="50%"
              mx="auto"
              my={6}
              onClick={handleLightClick}
              cursor={currentColor === "green" ? "pointer" : "not-allowed"}
            />
            <Button colorScheme="red" size="lg" onClick={endGame} mt={6}>
              End Game
            </Button>
          </>
        )}
      </Box>
    </Center>
  );
}

export default GreenLightRedLight;
