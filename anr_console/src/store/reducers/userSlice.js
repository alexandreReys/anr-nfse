// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

const apiUrl = '/api/v1/users';
const userId = '2440635241199184';

const initialState = { user: null, status: 'idle', error: null };

export const getUsers = createAsyncThunk('users/getUsers', async () => {
  const response = await api.get(`${apiUrl}/${userId}`);
  return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (user) => {
  const response = await api.post(apiUrl, user);
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (user) => {
  const response = await api.put(`${apiUrl}/${userId}`, user);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userId) => {
  await api.delete(`${apiUrl}/${userId}`);
  return userId;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'succeeded';
        state.user = action.payload.user;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })
      .addCase(addUser.fulfilled, (state, action) => {
        state.user.push(action.payload);
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        const index = state.user.findIndex(user => user.id === action.payload.id);
        if (index !== -1) {
          state.user[index] = action.payload;
        }
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        const index = state.user.findIndex(user => user.id === action.payload);
        if (index !== -1) {
          state.user.splice(index, 1);
        }
      });
  },
});

export default usersSlice.reducer;
