import { Box } from "@mui/material";
import { Route, Routes } from "react-router-dom";
import { SnackbarProvider } from "notistack"; 
import CreatePage from "./pages/CreatePage";
import HomePage from "./pages/HomePage";
import Navbar from "./components/Navbar";
import FavoritesPage from "./pages/FavoritesPage";

function App() {

  return (
    <SnackbarProvider maxSnack={3}>
      <Box minHeight="100vh" sx={{ backgroundColor: "white" }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/create" element={<CreatePage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
        </Routes>
      </Box>
    </SnackbarProvider>
  );
}

export default App;
