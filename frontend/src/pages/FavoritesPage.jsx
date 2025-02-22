import { Container, Grid, Typography, Box } from "@mui/material";
import { useEffect } from "react";
import { useProductStore } from "../store/product";
import ProductCard from "../components/ProductCard";

const FavoritesPage = () => {
  const { products, favorites, fetchProducts } = useProductStore();

  const favoriteProducts = products.filter((product) =>
    favorites.includes(product._id)
  );

  useEffect(() => {
    fetchProducts(); 
  }, [fetchProducts]);

  return (
    <Container maxWidth="xl" sx={{ py: 3 }}>
      <Box display="flex" flexDirection="column" alignItems="center" gap={3}>
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Your Favorite Products ❤️
        </Typography>

        <Grid container spacing={3} justifyContent="center">
          {favoriteProducts.length > 0 ? (
            favoriteProducts.map((product) => (
              <Grid item xs={12} sm={6} md={4} key={product._id}>
                <ProductCard product={product} />
              </Grid>
            ))
          ) : (
            <Typography variant="h6" textAlign="center" color="gray">
              You have no favorite products yet.
            </Typography>
          )}
        </Grid>
      </Box>
    </Container>
  );
};

export default FavoritesPage;
