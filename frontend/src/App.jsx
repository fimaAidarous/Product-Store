import { Box } from '@mui/material';
import { Route, Routes } from "react-router-dom";
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import { useColorMode } from './components/useColorMode';

function App() {
  const { colorMode, toggleColorMode } = useColorMode();

  return (
    <Box minHeight="100vh" sx={{ backgroundColor: "white" }} >
      <Navbar colorMode={colorMode} toggleColorMode={toggleColorMode}  />
      <Routes>
         <Route path="/" element={<HomePage />} />
         <Route path="/create" element={<CreatePage />} />
      </Routes>
    </Box>
  );
}

export default App;
