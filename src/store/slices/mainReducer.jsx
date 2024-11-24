import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "";

export const getCategories = createAsyncThunk(
    "main/categories/get",
    async (body, { getState, rejectWithValue }) => {
          try {
            const response = await axios.get(
              `https://onlymeus.pythonanywhere.com/api/menus/categories/`
          );
          console.log("Response:", response);
          return response.data;
        } catch (error) {
          console.error("Error:", error);
          if (error.response && error.response.data) {
              return rejectWithValue(error.response.data);
          } else {
              return rejectWithValue(error.message);
          }
      }
  }
  
  );

export const getProducts = createAsyncThunk(
    "main/products/get",
    async (body,{ getState, rejectWithValue }) => {
      try {
        const response = await axios.get(`${BASE_URL}/menus/products/`, {
          headers: {
            Authorization: `Bearer ${getState()?.auth?.token}`,
          },
        });
        return response.data;
      } catch (error) {
        if (error.response && error.response.data) {
          return rejectWithValue(error.response.data);
        } else {
          return rejectWithValue(error.message);
        }
      }
    }
  );


export const mainSlice = createSlice({
    name: 'main',
    initialState: {
      
        categoriesLoading:false,
        categoriesError:false,
        productsLoading:false,
        productsError:false,
       
        
    },
    reducers: {},
    extraReducers: (builder) => {
        
          builder.addCase(getCategories.pending, (state) => {
            state.categoriesLoading = true;
            state.categoriesError = false;
          });
          builder.addCase(getCategories.fulfilled, (state, action) => {
            state.categoriesLoading = false;
            state.categoriesError = false;
          });
          builder.addCase(getCategories.rejected, (state, action) => {
            state.categoriesLoading = false;
            state.categoriesError = action.payload
          });
          builder.addCase(getProducts.pending, (state) => {
            state.productsLoading = true;
            state.productsError = false;
          });
          builder.addCase(getProducts.fulfilled, (state, action) => {
            state.productsLoading = false;
            state.productsError = false;
          });
          builder.addCase(getProducts.rejected, (state, action) => {
            state.productsLoading = false;
            state.productsError = action.payload
          });
      },
})

export const mainReducer = mainSlice.reducer;