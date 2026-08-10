import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import axios from "axios";

export const createOrder = createAsyncThunk("createOrder", async ({ products, inputData, subTotal, shipping, orderTotal, gst }, { rejectWithValue }) => {
    
    try {
        const response = await axios.post(`${import.meta.env.VITE_BASE_URL}/orders/`, {
            products, shippingAddress: inputData,
            subTotal, shippingCharges: shipping,
            totalAmount: orderTotal,
            tax: gst
        }, { withCredentials: true });

        return response.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})

export const updateOrder = createAsyncThunk("updateOrder", async ({orderId, url}, {rejectWithValue}) => {
    
    try {
        const response = await axios.put(`${import.meta.env.VITE_BASE_URL}/orders/admin/orders/update/${orderId}${url}`, {}, {withCredentials: true});       
        
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})

export const getUserOrders = createAsyncThunk("getUserOrders", async(_, {rejectWithValue}) => {
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/orders/`, {withCredentials: true})

        return response?.data.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})

export const getOrderById = createAsyncThunk("getOrderById", async (orderId, {rejectWithValue}) => {    
    try {
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/orders/${orderId}`, {withCredentials: true})

        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})

export const getAllOrders = createAsyncThunk("getAllOrders", async (url, {rejectWithValue}) => {
    try {      
        const response = await axios.get(`${import.meta.env.VITE_BASE_URL}/orders/admin/orders${url}`, {withCredentials: true});
        
        return response?.data?.data;
    } catch (error) {
        return rejectWithValue(error.response?.data?.message || error.message);
    }
})

const initialState = {
    orderDatas: [],
    orderData: null,
    allOrdersData: [],
    currentOrder: null,
    currentOrderId: null,
    loading: false,
    success: false
}

const orderSlice = createSlice({
    name: "order",
    initialState,
    reducers: {},
    extraReducers: (builder) => {

        //Create Order
        builder.addCase(createOrder.pending, (state, _) => {
            state.loading = true;
        })
        builder.addCase(createOrder.fulfilled, (state, action) => {
            state.loading = false;
            state.currentOrderId = action.payload._id;
            state.success = true;
            
        })
        builder.addCase(createOrder.rejected, (state, action) => {
            state.loading = false;
            state.error = action.payload;
            state.success = false;
            console.log(action.payload);
            
        })

        //Update order
        builder.addCase(updateOrder.pending, (state,_) => {
            state.loading = true;
        })
        builder.addCase(updateOrder.fulfilled, (state, _) => {
            state.loading = false;
            state.success = true;
        })
        builder.addCase(updateOrder.rejected, (state, _) => {
            state.loading = false;
            state.success = false;
        })

        //Get user orders
        builder.addCase(getUserOrders.pending, (state, _) => {
            state.loading = true;
        })
        builder.addCase(getUserOrders.fulfilled, (state, action) => {
             state.loading = false;
             state.orderDatas = action.payload;
            // console.log(action.payload.data);
            state.success = true;
        })
        builder.addCase(getUserOrders.rejected, (state, _) => {
            state.loading = false;
            state.success = false;
        })

        //Get single order
        builder.addCase(getOrderById.pending, (state, _) => {
            state.loading = true;
        })
        builder.addCase(getOrderById.fulfilled, (state, action) => {
            state.loading = false;
            state.success = true;
            state.orderData = action.payload;            
        })
        builder.addCase(getOrderById.rejected, (state, action) => {
            state.loading = false;
            state.success = false;
        })

        // Get all orders
        builder.addCase(getAllOrders.pending, (state, _) => {
            state.loading = true;
        })
        builder.addCase(getAllOrders.fulfilled, (state, action) => {
            state.loading = false;
            state.allOrdersData = action.payload;
            state.success = true;
        })
        builder.addCase(getAllOrders.rejected, (state, _) => {
            state.loading = false;
            state.success = false;
        })
    }
})

export default orderSlice.reducer;