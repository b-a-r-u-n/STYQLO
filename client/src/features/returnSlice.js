import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

export const createReturn = createAsyncThunk("createReturn", async ({ orderId, products, reason, description, selectedQuantity, refundAmount, tax, shippingCharges, refundMethod, upiId, bankDetails }, { rejectWithValue }) => {
    try {       
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/return/`, { orderId, products, reason, description, selectedQuantity, refundAmount, tax, shippingCharges, refundMethod, upiId, bankDetails }, { withCredentials: true })

        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})

export const updateReturn = createAsyncThunk("updateReturn", async ({ returnId, url }, { rejectWithValue }) => {
    try {
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/return/admin/returns/update/${returnId}/${url}`, {}, { withCredentials: true });
        // console.log(response);

        return response?.data?.data;
    } catch (error) {
        // console.error(error)
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})

export const getAllReturns = createAsyncThunk("getAllReturns", async (url, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/return/admin/returns/${url}`, { withCredentials: true })

        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})

export const getReturnById = createAsyncThunk("getReturnById", async (returnId, { rejectWithValue }) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/return/${returnId}`, { withCredentials: true })

        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})


const initialState = {
    returnDatas: [],
    returnData: null,
    loading: false,
    success: false
}

const returnSlice = createSlice({
    name: "return",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        // Create return
        builder.addCase(createReturn.pending, (state, _) => {
            state.loading = true;
        })
        builder.addCase(createReturn.fulfilled, (state, _) => {
            state.loading = false;
            state.success = true;
        })
        builder.addCase(createReturn.rejected, (state, _) => {
            state.loading = false;
            state.success = false;
        })

        // Get return datas
        builder.addCase(getAllReturns.pending, (state, _) => {
            state.loading = true;
        })
        builder.addCase(getAllReturns.fulfilled, (state, action) => {
            state.loading = false;
            state.returnDatas = action.payload;
            state.success = true;
        })
        builder.addCase(getAllReturns.rejected, (state, _) => {
            state.loading = false;
            state.success = false;
        })

        // Update return
        builder.addCase(updateReturn.pending, (state, _) => {
            state.loading = true;
        })
        builder.addCase(updateReturn.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
        })
        builder.addCase(updateReturn.rejected, (state, _) => {
            state.loading = false;
            state.success = false;
        })

        //Get single order
        builder.addCase(getReturnById.pending, (state, _) => {
            state.loading = true;
        })
        builder.addCase(getReturnById.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.returnData = action.payload;
        })
        builder.addCase(getReturnById.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
        })
    }
})

export default returnSlice.reducer;

