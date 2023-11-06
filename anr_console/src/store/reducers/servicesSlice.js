import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

const apiUrl = '/api/v1/services';

const initialState = { 
  service: null, 
  services: [], 
  status: 'idle', 
  error: null 
};

export const getServices = createAsyncThunk('services/getServices', async (serviceId) => {
  const response = await api.get(`${apiUrl}/${serviceId}`);
  return response.data;
});

export const listServices = createAsyncThunk('services/listServices', async (organizationId) => {
  const response = await api.get(`${apiUrl}/list/${organizationId}`);
  return response.data;
});

export const addService = createAsyncThunk('services/addService', async (service) => {
  delete service.id;
  const response = await api.post(apiUrl, service);
  return response.data;
});

export const updateService = createAsyncThunk('services/updateService', async (serviceData) => {
  const serviceId = serviceData.id;
  delete serviceData.id;
  const response = await api.put(`${apiUrl}/${serviceId}`, serviceData);
  return response.data;
});

export const deleteService = createAsyncThunk('services/deleteService', async (serviceId) => {
  const response = await api.delete(`${apiUrl}/${serviceId}`);
  return response.data;
});

const servicesSlice = createSlice({
  name: 'services',
  initialState,
  reducers: {
    setService: (state, action) => {
      state.service = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServices.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getServices.fulfilled, (state, action) => {
        state.status = 'ok';
        state.service = action.payload.service;
      })
      .addCase(getServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(listServices.pending, (state) => {
        state.status = 'loading';
        state.services = [];
      })
      .addCase(listServices.fulfilled, (state, action) => {
        state.status = 'ok';
        state.services = action.payload.services;
      })
      .addCase(listServices.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addService.fulfilled, (state, action) => {
        state.status = 'ok';
        state.services = action.payload.services;
      })
      .addCase(updateService.fulfilled, (state, action) => {
        state.status = 'ok';
        state.services = action.payload.services;
      })
      .addCase(deleteService.fulfilled, (state, action) => {
        state.status = 'ok';
        state.services = action.payload;
      });
  },
});

export const { setService } = servicesSlice.actions;
export const selectService = (state) => state.services.service;

export default servicesSlice.reducer;
