import {
  Container,
  Grid,
  Typography,
  Box,
  CircularProgress,
  Button,
} from "@mui/material";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      await fetchProducts();
      setLoading(false);
    };

    fetchData();
  }, [fetchProducts]);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        <Typography
          variant="h4"
          fontWeight="bold"
          sx={{
            background: "linear-gradient(to right, #06b6d4, #3b82f6)",
            WebkitBackgroundClip: "text",
            color: "transparent",
            textAlign: "center",
          }}
        >
          Current Products ✨🔥
        </Typography>

        <Box sx={{ marginBottom: 2 }}>
          <Link to="/favorites">
            <Button variant="outlined" color="primary">
              View Favorites
            </Button>
          </Link>
        </Box>

        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <CircularProgress />
          </Box>
        ) : (
          <>
            <Grid container spacing={3} justifyContent="center">
              {products.length > 0 ? (
                products.map((product) => (
                  <Grid item xs={12} sm={6} md={4} key={product._id}>
                    <ProductCard product={product} />
                  </Grid>
                ))
              ) : (
                <Typography
                  variant="h6"
                  textAlign="center"
                  fontWeight="bold"
                  color="gray"
                >
                  No products found 😢{" "}
                  <Link
                    to="/create"
                    style={{ color: "#3b82f6", textDecoration: "none" }}
                  >
                    <Typography
                      component="span"
                      sx={{ "&:hover": { textDecoration: "underline" } }}
                    >
                      Create a product
                    </Typography>
                  </Link>
                </Typography>
              )}
            </Grid>
          </>
        )}
      </Box>
    </Container>
  );
};

export default HomePage;
