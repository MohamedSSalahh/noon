import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import API_URL from '../../utils/apiConfig';

const initialState = {
  users: [],
  isLoading: false,
  error: null,
  paginationResult: {},
};

export const fetchUsers = createAsyncThunk(
  'user/fetchUsers',
  async (queryString = '', { rejectWithValue, getState }) => {
    try {
      const { token } = getState().authState;
      const response = await fetch(`${API_URL}/users?${queryString}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message);
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const createUser = createAsyncThunk(
  'user/createUser',
  async (userData, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().authState;
      // Admin creating a user - images sent as FormData usually, checking endpoint
      
      const isFormData = userData instanceof FormData;
      
      const headers = {
        Authorization: `Bearer ${token}`,
      };
      if (!isFormData) {
        headers['Content-Type'] = 'application/json';
      }

      const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers,
        body: isFormData ? userData : JSON.stringify(userData),
      });
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message);
      return data.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const deleteUser = createAsyncThunk(
  'user/deleteUser',
  async (id, { rejectWithValue, getState }) => {
    try {
      const { token } = getState().authState;
      const response = await fetch(`${API_URL}/users/${id}`, {
        method: 'DELETE',
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.status === 204) return id;
      const data = await response.json();
      if (!response.ok) return rejectWithValue(data.message);
      return id;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch Users
      .addCase(fetchUsers.pending, (state) => { state.isLoading = true; })
      .addCase(fetchUsers.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = action.payload.data;
        state.paginationResult = action.payload.paginationResult;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Create User
      .addCase(createUser.pending, (state) => { state.isLoading = true; })
      .addCase(createUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users.push(action.payload);
      })
      .addCase(createUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      // Delete User
      .addCase(deleteUser.pending, (state) => { state.isLoading = true; })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.isLoading = false;
        state.users = state.users.filter(u => u._id !== action.payload);
      })
      .addCase(deleteUser.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;
