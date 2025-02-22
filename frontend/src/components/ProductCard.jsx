import { Delete, Edit, Favorite, FavoriteBorder } from "@mui/icons-material";
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Button,
  Typography,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Stack,
} from "@mui/material";
import { useState } from "react";
import { useProductStore } from "../store/product";
import { useSnackbar } from "notistack";

const ProductCard = ({ product }) => {
  const { deleteProduct, updateProduct, toggleFavorite, favorites } = useProductStore();
  const { enqueueSnackbar } = useSnackbar();

  const [open, setOpen] = useState(false);
  const [updatedProduct, setUpdatedProduct] = useState(product);

  const handleDelete = async () => {
    const { success, message } = await deleteProduct(product._id);
    enqueueSnackbar(message, { variant: success ? "success" : "error" });
  };

  const handleUpdate = async () => {
    if (!updatedProduct || !updatedProduct._id) {
      enqueueSnackbar("Invalid product data", { variant: "error" });
      return;
    }

    const { success, message } = await updateProduct(updatedProduct._id, updatedProduct);
    enqueueSnackbar(message, { variant: success ? "success" : "error" });

    if (success) setOpen(false);
  };

  const isFavorite = favorites.includes(product._id);
  const handleFavorite = () => {
    toggleFavorite(product._id);
  };

  return (
    <Card
      sx={{
        maxWidth: 345,
        boxShadow: 3,
        transition: "transform 0.3s ease-in-out",
        "&:hover": {
          transform: "scale(1.1)",
        },
      }}
    >
      <CardMedia component="img" height="200" image={product.image} alt={product.name} />
      <CardContent>
        <Typography variant="h6" fontWeight="bold">{product.name}</Typography>
        <Typography variant="body1" color="text.secondary">${product.price}</Typography>
      </CardContent>
      <CardActions>
        <IconButton color="primary" onClick={() => setOpen(true)}>
          <Edit />
        </IconButton>
        <IconButton color="error" onClick={handleDelete}>
          <Delete />
        </IconButton>
        <IconButton color={isFavorite ? "error" : "default"} onClick={handleFavorite}>
          {isFavorite ? <Favorite /> : <FavoriteBorder />}
        </IconButton>
      </CardActions>
     
      <Dialog open={open} onClose={() => setOpen(false)}>
        <DialogTitle>Update Product</DialogTitle>
        <DialogContent>
          <Stack spacing={2} mt={1}>
            <TextField
              label="Product Name"
              value={updatedProduct.name}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, name: e.target.value })}
              fullWidth
            />
            <TextField
              label="Price"
              type="number"
              value={updatedProduct.price}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, price: e.target.value })}
              fullWidth
            />
            <TextField
              label="Image URL"
              value={updatedProduct.image}
              onChange={(e) => setUpdatedProduct({ ...updatedProduct, image: e.target.value })}
              fullWidth
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" color="primary" onClick={handleUpdate}>
            Update
          </Button>
        </DialogActions>
      </Dialog>
    </Card>
  );
};

export default ProductCard;
