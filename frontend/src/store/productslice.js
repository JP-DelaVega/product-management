import {
  configureStore,
  createSlice,
  createAsyncThunk,
} from "@reduxjs/toolkit";

// Fetch products with pagination

const BASE_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:5000"
    : "https://product-management-d8ctc7ecgpg6huf5.southeastasia-01.azurewebsites.net/";


export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async ({ page, limit, searchQuery }) => {
    let url = `${BASE_URL}/api/products?page=${page}&limit=${limit}`;
    if (searchQuery) url += `&search=${encodeURIComponent(searchQuery)}`; // ✅ Prevent empty search

    const res = await fetch(url);
    return res.json();
  }
);

// Add a new product
export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product) => {
    const res = await fetch(`${BASE_URL}/api/products`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    return res.json();
  }
);

// Delete a product
export const deleteProduct = createAsyncThunk(
  "products/deleteProduct",
  async (productId) => {
    await fetch(`${BASE_URL}/api/products/${productId}`, {
      method: "DELETE",
    });
    return productId;
  }
);

// Edit a product
export const editProduct = createAsyncThunk(
  "products/editProduct",
  async ({ productId, updatedData }) => {
    const res = await fetch(`${BASE_URL}/api/products/${productId}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updatedData),
    });
    return res.json();
  }
);

// Create a slice
const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
    currentPage: 1,
    totalPages: 1,
    searchQuery: "",
  },
  reducers: {
    setPage: (state, action) => {
      state.currentPage = action.payload;
    },
    setSearchQuery: (state, action) => {
      // ✅ Now inside reducers
      state.searchQuery = action.payload;
    },
  },

  extraReducers: (builder) => {
    builder
      .addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.products = action.payload.data; // Ensure response has { data: [], totalPages: N }
        state.totalPages = action.payload.totalPages || 1;
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(addProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(deleteProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (product) => product._id !== action.payload
        );
      })
      .addCase(editProduct.fulfilled, (state, action) => {
        const updatedProduct = action.payload;
        state.products = state.products.map((product) =>
          product._id === updatedProduct._id ? updatedProduct : product
        );
      });
  },
});

export const { setPage, setSearchQuery } = productSlice.actions;

// Create the Redux store
export const useProductStore = configureStore({
  reducer: {
    products: productSlice.reducer,
  },
});
