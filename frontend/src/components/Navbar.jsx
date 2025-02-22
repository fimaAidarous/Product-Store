import React from "react";
import { Container, Typography, Box, Stack, Button } from "@mui/material";
import { Link } from "react-router-dom";
import AddBoxIcon from "@mui/icons-material/AddBox";

const Navbar = () => {
  return (
    <Box
      display="flex"
      height={64}
      alignItems="center"
      justifyContent="space-between"
      flexDirection={{
        xs: "column",
        sm: "row",
      }}
      sx={{
        background: "linear-gradient(90deg,#1e3c72, #2a5298)",
        width: "100%",
        px: 4,
        transition: "background 0.3s",
      }}
    >
      <Container maxWidth="lg" sx={{ px: 0 }}>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            variant="h5"
            fontWeight="bold"
            textTransform="uppercase"
            textAlign="center"
            sx={{
              background: "linear-gradient(90deg, cyan, white)",
              WebkitBackgroundClip: "text",
              color: "transparent",
              flex: 1,
            }}
          >
            <Link to="/" style={{ textDecoration: "none", color: "inherit" }}>
              Product Store 🛒
            </Link>
          </Typography>

          <Stack direction="row" spacing={2} alignItems="center">
            <Link to="/create">
              <Button variant="contained" color="primary">
                <AddBoxIcon fontSize="small" />
              </Button>
            </Link>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
};

export default Navbar;
