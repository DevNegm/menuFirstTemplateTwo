import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = "https://onlymeus.pythonanywhere.com/api/menus";

export const getMainData = createAsyncThunk(
    "main/maindata/get",
    async (body, { getState, rejectWithValue }) => {
          try {
            const response = await axios.get(
              `${BASE_URL}/restaurants/`
          );
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
export const getCategories = createAsyncThunk(
    "main/categories/get",
    async (body, { getState, rejectWithValue }) => {
          try {
            const response = await axios.get(
              `${BASE_URL}/categories/`
          );
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
        mainDataLoading:false,
        mainDataError:false,
    },
    reducers: {},
    extraReducers: (builder) => {
        
          builder.addCase(getMainData.pending, (state) => {
            state.mainDataLoading = true;
            state.mainDataError = false;
          });
          builder.addCase(getMainData.fulfilled, (state, action) => {
            state.mainDataLoading = false;
            state.mainDataError = false;
          });
          builder.addCase(getMainData.rejected, (state, action) => {
            state.mainDataLoading = false;
            state.mainDataError = action.payload
          });
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
      },
})

export const mainReducer = mainSlice.reducer;