// userSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

const apiUrl = '/api/v1/users';
// const userId = '2440635241199184';

const initialState = { 
  user: null, 
  users: [], 
  status: 'idle', 
  error: null 
};

export const getUsers = createAsyncThunk('users/getUsers', async (userId) => {
  const response = await api.get(`${apiUrl}/${userId}`);
  return response.data;
});

export const listUsers = createAsyncThunk('users/listUsers', async (organizationId) => {
  const response = await api.get(`${apiUrl}/list/${organizationId}`);
  return response.data;
});

export const addUser = createAsyncThunk('users/addUser', async (user) => {
  delete user.id;
  const response = await api.post(apiUrl, user);
  return response.data;
});

export const updateUser = createAsyncThunk('users/updateUser', async (userData) => {
  const userOrganizationId = userData.organizationId;
  const userId = userData.id;

  delete userData.id;
  delete userData.password;
  
  const response = await api.put(`${apiUrl}/${userOrganizationId}/${userId}`, userData);
  return response.data;
});

export const deleteUser = createAsyncThunk('users/deleteUser', async (userKey) => {
  const {organizationId, userId} = userKey;
  const response = await api.delete(`${apiUrl}/${organizationId}/${userId}`);
  return response.data;
});

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUser: (state, action) => {
      state.user = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getUsers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getUsers.fulfilled, (state, action) => {
        state.status = 'ok';
        state.user = action.payload.user;
      })
      .addCase(getUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(listUsers.pending, (state) => {
        state.status = 'loading';
        state.users = [];
      })
      .addCase(listUsers.fulfilled, (state, action) => {
        state.status = 'ok';
        state.users = action.payload.users;
      })
      .addCase(listUsers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addUser.fulfilled, (state, action) => {
        state.status = 'ok';
        state.users = action.payload.users;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.status = 'ok';
        state.users = action.payload.users;
      })
      .addCase(deleteUser.fulfilled, (state, action) => {
        state.status = 'ok';
        state.users = action.payload;
      });
  },
});

export const { setUser } = usersSlice.actions;
export const selectUser = (state) => state.users.user;

export default usersSlice.reducer;
