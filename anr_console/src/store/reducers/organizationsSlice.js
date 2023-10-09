import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

const apiUrl = '/api/v1/organizations';

const initialState = { 
  organization: null, 
  organizations: [], 
  status: 'idle', 
  error: null 
};

export const getOrganizations = createAsyncThunk('organizations/getOrganizations', async (organizationId) => {
  const response = await api.get(`${apiUrl}/${organizationId}`);
  return response.data;
});

export const listOrganizations = createAsyncThunk('organizations/listOrganizations', async () => {
  const response = await api.get(`${apiUrl}/list`);
  return response.data;
});

export const addOrganization = createAsyncThunk('organizations/addOrganization', async (organization) => {
  delete organization.id;
  const response = await api.post(apiUrl, organization);
  return response.data;
});

export const updateOrganization = createAsyncThunk('organizations/updateOrganization', async (organizationData) => {
  const organizationId = organizationData.id;
  delete organizationData.id;
  const response = await api.put(`${apiUrl}/${organizationId}`, organizationData);
  return response.data;
});

export const deleteOrganization = createAsyncThunk('organizations/deleteOrganization', async (organizationId) => {
  const response = await api.delete(`${apiUrl}/${organizationId}`);
  return response.data;
});

const organizationsSlice = createSlice({
  name: 'organizations',
  initialState,
  reducers: {
    setOrganization: (state, action) => {
      state.organization = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getOrganizations.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getOrganizations.fulfilled, (state, action) => {
        state.status = 'ok';
        state.organization = action.payload.organization;
      })
      .addCase(getOrganizations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(listOrganizations.pending, (state) => {
        state.status = 'loading';
        state.organizations = [];
      })
      .addCase(listOrganizations.fulfilled, (state, action) => {
        state.status = 'ok';
        state.organizations = action.payload.organizations;
      })
      .addCase(listOrganizations.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addOrganization.fulfilled, (state, action) => {
        state.status = 'ok';
        state.organizations = action.payload.organizations;
      })
      .addCase(updateOrganization.fulfilled, (state, action) => {
        state.status = 'ok';
        state.organizations = action.payload.organizations;
      })
      .addCase(deleteOrganization.fulfilled, (state, action) => {
        state.status = 'ok';
        state.organizations = action.payload;
      });
  },
});

export const { setOrganization } = organizationsSlice.actions;
export const selectOrganization = (state) => state.organizations.organization;

export default organizationsSlice.reducer;
