import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API_URL from '../../utils/apiConfig';

const initialState = {
  brands: [],
  isLoading: false,
  error: null,
};

export const fetchBrands = createAsyncThunk(
  'brand/fetchBrands',
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch(`${API_URL}/brands`);
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const brandSlice = createSlice({
  name: 'brand',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchBrands.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchBrands.fulfilled, (state, action) => {
        state.isLoading = false;
        state.brands = action.payload;
      })
      .addCase(fetchBrands.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default brandSlice.reducer;
