import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

const apiUrl = '/api/v1/serviceOrders';

const initialState = { 
  serviceOrder: null, 
  serviceOrders: [], 
  status: 'idle', 
  error: null 
};

export const getServiceOrders = createAsyncThunk('serviceOrders/getServiceOrders', async (serviceOrderId) => {
  const response = await api.get(`${apiUrl}/${serviceOrderId}`);
  return response.data;
});

export const listServiceOrders = createAsyncThunk('serviceOrders/listServiceOrders', async (organizationId) => {
  const response = await api.get(`${apiUrl}/list/${organizationId}`);
  return response.data;
});

export const addServiceOrder = createAsyncThunk('serviceOrders/addServiceOrder', async (serviceOrder) => {
  delete serviceOrder.id;
  const response = await api.post(apiUrl, serviceOrder);
  return response.data;
});

export const updateServiceOrder = createAsyncThunk('serviceOrders/updateServiceOrder', async (serviceOrderData) => {
  const serviceOrderId = serviceOrderData.id;
  const organizationId = serviceOrderData.organizationId;
  delete serviceOrderData.id;
  const response = await api.put(`${apiUrl}/${organizationId}/${serviceOrderId}`, serviceOrderData);
  return response.data;
});

export const deleteServiceOrder = createAsyncThunk('serviceOrders/deleteServiceOrder', async (serviceOrderKey) => {
  const response = await api.delete(`${apiUrl}/${serviceOrderKey.organizationId}/${serviceOrderKey.serviceOrderId}`);
  return response.data;
});

const serviceOrdersSlice = createSlice({
  name: 'serviceOrders',
  initialState,
  reducers: {
    setServiceOrder: (state, action) => {
      state.serviceOrder = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getServiceOrders.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getServiceOrders.fulfilled, (state, action) => {
        state.status = 'ok';
        state.serviceOrder = action.payload.serviceOrder;
      })
      .addCase(getServiceOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(listServiceOrders.pending, (state) => {
        state.status = 'loading';
        state.serviceOrders = [];
      })
      .addCase(listServiceOrders.fulfilled, (state, action) => {
        state.status = 'ok';
        state.serviceOrders = action.payload.serviceOrders;
      })
      .addCase(listServiceOrders.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addServiceOrder.fulfilled, (state, action) => {
        state.status = 'ok';
        state.serviceOrders = action.payload.serviceOrders;
      })
      .addCase(updateServiceOrder.fulfilled, (state, action) => {
        state.status = 'ok';
        state.serviceOrders = action.payload.serviceOrders;
      })
      .addCase(deleteServiceOrder.fulfilled, (state, action) => {
        state.status = 'ok';
        state.serviceOrders = action.payload;
      });
  },
});

export const { setServiceOrder } = serviceOrdersSlice.actions;
export const selectServiceOrder = (state) => state.serviceOrders.serviceOrder;

export default serviceOrdersSlice.reducer;
