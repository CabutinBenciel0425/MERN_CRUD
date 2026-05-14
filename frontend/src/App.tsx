import { Route, Routes } from "react-router-dom";
import { Box } from "@chakra-ui/react";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import NavBar from "./components/NavBar";
import "./styles.css";
import { useColorModeValue } from "./components/ui/color-mode";
import { Toaster } from "./components/ui/toaster";

function App() {
  return (
    <Box minH="100vh" color={useColorModeValue("black", "white")}>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/create" element={<CreatePage />} />
      </Routes>
      <Toaster />
    </Box>
  );
}

export default App;
