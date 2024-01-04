import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { api } from '../../services/api';

const apiUrl = '/api/v1/customers';

const initialState = { 
  customer: null, 
  customers: [], 
  status: 'idle', 
  error: null 
};

export const getCustomers = createAsyncThunk('customers/getCustomers', async (customerId) => {
  const response = await api.get(`${apiUrl}/${customerId}`);
  return response.data;
});

export const listCustomers = createAsyncThunk('customers/listCustomers', async (organizationId) => {
  const response = await api.get(`${apiUrl}/list/${organizationId}`);
  return response.data;
});

export const addCustomer = createAsyncThunk('customers/addCustomer', async (customer) => {
  delete customer.id;
  const response = await api.post(apiUrl, customer);
  return response.data;
});

export const updateCustomer = createAsyncThunk('customers/updateCustomer', async (customerData) => {
  const customerId = customerData.id;
  const organizationId = customerData.organizationId;
  delete customerData.id;
  const response = await api.put(`${apiUrl}/${organizationId}/${customerId}`, customerData);
  return response.data;
});

export const deleteCustomer = createAsyncThunk('customers/deleteCustomer', async (customerKey) => {
  const response = await api.delete(`${apiUrl}/${customerKey.organizationId}/${customerKey.customerId}`);
  return response.data;
});

const customersSlice = createSlice({
  name: 'customers',
  initialState,
  reducers: {
    setCustomer: (state, action) => {
      state.customer = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCustomers.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(getCustomers.fulfilled, (state, action) => {
        state.status = 'ok';
        state.customer = action.payload.customer;
      })
      .addCase(getCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(listCustomers.pending, (state) => {
        state.status = 'loading';
        state.customers = [];
      })
      .addCase(listCustomers.fulfilled, (state, action) => {
        state.status = 'ok';
        state.customers = action.payload.customers;
      })
      .addCase(listCustomers.rejected, (state, action) => {
        state.status = 'failed';
        state.error = action.error.message;
      })

      .addCase(addCustomer.fulfilled, (state, action) => {
        state.status = 'ok';
        state.customers = action.payload.customers;
      })
      .addCase(updateCustomer.fulfilled, (state, action) => {
        state.status = 'ok';
        state.customers = action.payload.customers;
      })
      .addCase(deleteCustomer.fulfilled, (state, action) => {
        state.status = 'ok';
        state.customers = action.payload;
      });
  },
});

export const { setCustomer } = customersSlice.actions;
export const selectCustomer = (state) => state.customers.customer;

export default customersSlice.reducer;
