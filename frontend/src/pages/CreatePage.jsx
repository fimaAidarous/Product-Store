import { useState } from "react";
import { Container, TextField, Button, Typography, Box, Stack } from "@mui/material";
import { useProductStore } from "../store/product";
import { useTheme } from "@mui/material/styles";
import { useSnackbar } from "notistack";

const CreatePage = () => {
  const [newProduct, setNewProduct] = useState({
    name: "",
    price: "",
    image: "",
  });
  
  const { createProduct } = useProductStore();
  const theme = useTheme();
  const { enqueueSnackbar } = useSnackbar();

  const handleAddProduct = async () => {
    const { success, message } = await createProduct(newProduct);
    enqueueSnackbar(success ? "Product created successfully" : message, {
      variant: success ? "success" : "error",
    });
    if (success) {
      setNewProduct({ name: "", price: "", image: "" });
    }
  };

  return (
    <Container maxWidth="sm">
      <Stack spacing={4} alignItems="center">
        <Typography variant="h4" fontWeight="bold" textAlign="center" gutterBottom>
          Create New Product
        </Typography>

        <Box
          sx={{
            width: "100%",
            backgroundColor: theme.palette.mode === "light" ? "white" : "grey.800",
            p: 3,
            borderRadius: 2,
            boxShadow: 3,
          }}
        >
          <Stack spacing={2}>
            <TextField
              label="Product Name"
              variant="outlined"
              fullWidth
              value={newProduct.name}
              onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
            />
            <TextField
              label="Price"
              variant="outlined"
              type="number"
              fullWidth
              value={newProduct.price}
              onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
            />
            <TextField
              label="Image URL"
              variant="outlined"
              fullWidth
              value={newProduct.image}
              onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
            />

            <Button variant="contained" color="primary" onClick={handleAddProduct} fullWidth>
              Add Product
            </Button>
          </Stack>
        </Box>
      </Stack>
    </Container>
  );
};

export default CreatePage;
