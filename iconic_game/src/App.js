// In your App component or parent component
import React, { useState } from "react";
import "./App.css";

import RegistrationForm from "./Components/RegistrationForm";
import { ChakraProvider } from "@chakra-ui/react";

function App() {
  

  return (
    <ChakraProvider>
      <RegistrationForm  />
    </ChakraProvider>
  );
}

export default App;
