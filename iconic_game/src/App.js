// In your App component or parent component
import React, { useState } from 'react';
import './App.css'; 

import RegistrationForm from './Components/RegistrationForm';
import GreenLightRedLight from './Components/GreenLightRedLight';
import { ChakraProvider } from '@chakra-ui/react';

function App() {
  const [gameDifficulty, setGameDifficulty] = useState('');

  const handleStartGame = (difficulty) => {
    setGameDifficulty(difficulty);
  };

  return (
    <ChakraProvider>
      <RegistrationForm onStartGame={handleStartGame} />
      {gameDifficulty && <GreenLightRedLight difficulty={gameDifficulty} />}
      </ChakraProvider>
  );
}

export default App;
