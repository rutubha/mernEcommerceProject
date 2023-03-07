import {
    CREATE_ORDER_REQUEST,
    CREATE_ORDER_SUCCESS,
    CREATE_ORDER_FAIL,
    MY_ORDER_REQUEST,
    MY_ORDER_SUCCESS,
    MY_ORDER_FAIL,
    ORDER_DETAILS_REQUEST,
    ORDER_DETAILS_SUCCESS,
    ORDER_DETAILS_FAIL,
    ALL_ORDER_REQUEST,
    ALL_ORDER_SUCCESS,
    ALL_ORDER_FAIL,
    UPDATE_ORDER_REQUEST,
    UPDATE_ORDER_SUCCESS,
    UPDATE_ORDER_FAIL,
    DELETE_ORDER_REQUEST,
    DELETE_ORDER_SUCCESS,
    DELETE_ORDER_FAIL,
    CLEAR_ERRORS
} from "../constants/orderConstants";
import axios from "axios";

//create order
export const createOrder = (order) => async (dispatch) => {
    try {
        dispatch({ type: CREATE_ORDER_REQUEST });

        const config = {
            headers: {
                "Content-Type": "application/json"
            }
        }

        axios.post("/api/v1/order/new", order, config)
        .then((response) => {
            dispatch({
                type: CREATE_ORDER_SUCCESS,
                payload: response.data
            });
        })
        .catch(error => {
            dispatch({
                type: CREATE_ORDER_FAIL,
                payload: error.response.data
            })
        });

    } catch (error) {
        dispatch({
            type: CREATE_ORDER_FAIL,
            payload: error.response.data.message
        });
    }
}

//Orders
export const myOrders = () => (dispatch) => {
    try {
        dispatch({type: MY_ORDER_REQUEST});

        axios.get(`/api/v1/orders/me`)
        .then((response) => {
            dispatch({
                type: MY_ORDER_SUCCESS,
                payload: response.data.orders
            })
        })
    } catch (error) {
        dispatch({
            type: MY_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

//All Orders
export const getAllOrders = () => (dispatch) => {
    try {
        dispatch({type: ALL_ORDER_REQUEST});

        axios.get(`/api/v1/admin/orders`)
        .then((response) => {
            dispatch({
                type: ALL_ORDER_SUCCESS,
                payload: response.data.orders
            })
        })
    } catch (error) {
        dispatch({
            type: ALL_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Update Orders
export const updateOrder = (id, orderData) => (dispatch) => {
    try {
        dispatch({type: UPDATE_ORDER_REQUEST});

        const config = { headers: { "Content-Type": "application/json"}}

        axios.put(`/api/v1/admin/order/${id}`, orderData, config)
        .then((response) => {
            dispatch({
                type: UPDATE_ORDER_SUCCESS,
                payload: response.data.success
            })
        })
    } catch (error) {
        dispatch({
            type: UPDATE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Delete Order
export const deleteOrder = (id) => (dispatch) => {
    try {
        dispatch({type: DELETE_ORDER_REQUEST});

        axios.delete(`/api/v1/admin/order/${id}`)
        .then((response) => {
            dispatch({
                type: DELETE_ORDER_SUCCESS,
                payload: response.data.success
            })
        })
    } catch (error) {
        dispatch({
            type: DELETE_ORDER_FAIL,
            payload: error.response.data.message
        })
    }
}

//Get order Details
export const getOrderDetails = (id) => (dispatch) => {
    try {
        dispatch({type: ORDER_DETAILS_REQUEST});

        axios.get(`/api/v1/order/${id}`)
        .then((response) => {
            dispatch({
                type: ORDER_DETAILS_SUCCESS,
                payload: response.data.order
            })
        })
    } catch (error) {
        dispatch({
            type: ORDER_DETAILS_FAIL,
            payload: error.response.data.message
        })
    }
}

//Clear Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}
