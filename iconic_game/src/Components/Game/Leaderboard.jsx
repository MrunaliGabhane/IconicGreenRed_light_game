import React, { useEffect, useState } from "react";
import {
  Box,
  Center,
  Heading,
  Spinner,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";

function Leaderboard() {
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [loading, setLoading] = useState(true);
  const toast = useToast();

  useEffect(() => {
    // Fetch leaderboard data from the backend
    const fetchLeaderboard = async () => {
      try {
        const response = await axios.get("https://iconic-r0xu.onrender.com/api/score");
        const sortedData = response.data.sort((a, b) => b.score - a.score);
        setLeaderboardData(sortedData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching leaderboard data:", error);
        setLoading(false);
        toast({
          title: "An error occurred while fetching leaderboard data.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    };

    fetchLeaderboard();
  }, [toast]);

  return (
    <Center minH="100vh" bgColor="teal.300">
      <Box
        p={8}
        bgColor="white"
        borderRadius="md"
        boxShadow="md"
        textAlign="center"
        w="90%">
        <Heading as="h2" size="xl">
          Leaderboard
        </Heading>
        {loading ? (
          <Spinner size="lg" color="teal.500" />
        ) : (
          <Table variant="simple" mt={6} size="lg">
            <Thead>
              <Tr>
                <Th>Rank</Th>
                <Th>Name</Th>
                <Th>Score</Th>
              </Tr>
            </Thead>
            <Tbody>
              {leaderboardData.map((entry, index) => (
                <Tr key={entry._id}>
                  <Td>{index + 1}</Td>
                  <Td>{entry.email}</Td>
                  <Td>{entry.score}</Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        )}
      </Box>
    </Center>
  );
}

export default Leaderboard;
