import axios from "axios";
import {
    ALL_PRODUCT_REQUEST,
    ALL_PRODUCT_SUCCESS,
    ALL_PRODUCT_FAIL,
    PRODUCT_DETAILS_REQUEST,
    PRODUCT_DETAILS_SUCCESS,
    PRODUCT_DETAILS_FAIL,
    NEW_PRODUCT_REQUEST,
    NEW_PRODUCT_SUCCESS,
    NEW_PRODUCT_FAIL,
    NEW_REVIEW_REQUEST,
    NEW_REVIEW_SUCCESS,
    NEW_REVIEW_FAIL,
    DELETE_PRODUCT_REQUEST,
    DELETE_PRODUCT_SUCCESS,
    DELETE_PRODUCT_FAIL,
    ADMIN_PRODUCT_REQUEST,
    ADMIN_PRODUCT_SUCCESS,
    ADMIN_PRODUCT_FAIL,
    CLEAR_ERRORS,
    EDIT_PRODUCT_REQUEST,
    EDIT_PRODUCT_SUCCESS,
    ALL_REVIEWS_REQUEST,
    ALL_REVIEWS_SUCCESS,
    ALL_REVIEWS_FAIL,
    DELETE_REVIEW_REQUEST,
    DELETE_REVIEW_SUCCESS,
    DELETE_REVIEW_FAIL,
    EDIT_PRODUCT_FAIL
} from "../constants/productConstants";

export const getProduct = (keyword = "", currentPage = 1, price = [0, 25000], category, rating = 0) => async (dispatch) => {
    try {
        dispatch({ type: ALL_PRODUCT_REQUEST });

        let link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&ratings[gte]=${rating}`;

        if(category) {
            link = `/api/v1/products?keyword=${keyword}&page=${currentPage}&price[gte]=${price[0]}&price[lte]=${price[1]}&category=${category}&ratings[gte]=${rating}`;
        }
        axios.get(link)
            .then((response) => {
                dispatch({
                    type: ALL_PRODUCT_SUCCESS,
                    payload: response.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: ALL_PRODUCT_FAIL,
                    payload: error.message
                })
            });
    } catch (error) {
        console.log(error);
        dispatch({
            type: ALL_PRODUCT_FAIL,
            payload: error.message
        })
    }
};

//New Product
export const createProduct = (productData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_PRODUCT_REQUEST });

        const config = { headers: {"Content-Type": "multipart/form-data"}}

        axios.post(`/api/v1/admin/product/new`, productData, config)
            .then((response) => {
                dispatch({
                    type: NEW_PRODUCT_SUCCESS,
                    payload: response.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: NEW_PRODUCT_FAIL,
                    payload: error.response.data
                })
            });
    } catch (error) {
        console.log(error);
        dispatch({
            type: NEW_PRODUCT_FAIL,
            payload: error.response.data
        })
    }
};

//Delete Product
export const deleteProduct = (id) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_PRODUCT_REQUEST });

        axios.delete(`/api/v1/admin/product/${id}`)
            .then((response) => {
                dispatch({
                    type: DELETE_PRODUCT_SUCCESS,
                    payload: response.data.success
                })
            })
            .catch((error) => {
                dispatch({
                    type: DELETE_PRODUCT_FAIL,
                    payload: error.response.data
                })
            });
    } catch (error) {
        console.log(error);
        dispatch({
            type: DELETE_PRODUCT_FAIL,
            payload: error.response.data
        })
    }
};

//Update Product
export const updateProduct = (id, productData) => async (dispatch) => {
    try {
        dispatch({ type: EDIT_PRODUCT_REQUEST });
        
        const config = { headers: {"Content-Type": "multipart/form-data"}}

        axios.put(`/api/v1/admin/product/${id}`, productData, config)
            .then((response) => {
                dispatch({
                    type: EDIT_PRODUCT_SUCCESS,
                    payload: response.data
                })
            })
            .catch((error) => {
                dispatch({
                    type: EDIT_PRODUCT_FAIL,
                    payload: error.response.data.error
                })
            });
    } catch (error) {
        console.log(error);
        dispatch({
            type: EDIT_PRODUCT_FAIL,
            payload: error.response.data
        })
    }
};

export const getProductDetails = (id) => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_DETAILS_REQUEST });

        axios.get(`/api/v1/product/${id}`)
            .then((response) => {
                dispatch({
                    type: PRODUCT_DETAILS_SUCCESS,
                    payload: response.data.product
                })
            })
            .catch((error) => {
                dispatch({
                    type: PRODUCT_DETAILS_FAIL,
                    payload: error.message
                })
            });
    } catch (error) {
        console.log(error);
        dispatch({
            type: PRODUCT_DETAILS_FAIL,
            payload: error.message
        })
    }
};

//New Review
export const newReview = (reviewData) => async (dispatch) => {
    try {
        dispatch({ type: NEW_REVIEW_REQUEST });

        const config = { headers: {"Content-Type": "application/json"}}

        axios.put(`/api/v1/review`, reviewData, config)
            .then((response) => {
                dispatch({
                    type: NEW_REVIEW_SUCCESS,
                    payload: response.data.success
                })
            })
            .catch((error) => {
                dispatch({
                    type: NEW_REVIEW_FAIL,
                    payload: error.response.data
                })
            });
    } catch (error) {
        console.log(error);
        dispatch({
            type: NEW_REVIEW_FAIL,
            payload: error.response.data
        })
    }
};


//get all Reviews
export const getAllReviews = (id) => async (dispatch) => {
    try {
        dispatch({ type: ALL_REVIEWS_REQUEST });
        
        axios.get(`/api/v1/reviews?id=${id}`)
            .then((response) => {
                dispatch({
                    type: ALL_REVIEWS_SUCCESS,
                    payload: response.data.reviews
                })
            })
            .catch((error) => {
                dispatch({
                    type: ALL_REVIEWS_FAIL,
                    payload: error.response.data.error
                })
            });
    } catch (error) {
        console.log(error);
        dispatch({
            type: ALL_REVIEWS_FAIL,
            payload: error.response.data.error
        })
    }
};

//Delete Review
export const deleteReview = (reviewId, productId) => async (dispatch) => {
    try {
        dispatch({ type: DELETE_REVIEW_REQUEST });

        axios.delete(`/api/v1/review?id=${reviewId}&productId=${productId}`)
            .then((response) => {
                dispatch({
                    type: DELETE_REVIEW_SUCCESS,
                    payload: response.data.success
                })
            })
            .catch((error) => {
                dispatch({
                    type: DELETE_REVIEW_FAIL,
                    payload: error.response.data.error
                })
            });
    } catch (error) {
        console.log(error);
        dispatch({
            type: DELETE_REVIEW_FAIL,
            payload: error.response.data
        })
    }
};

//Get all products By admin
export const getAdminProducts = () => async (dispatch) => {
    try {
        dispatch({ type: ADMIN_PRODUCT_REQUEST });

        axios.get(`/api/v1/admin/products`)
            .then((response) => {
                dispatch({
                    type: ADMIN_PRODUCT_SUCCESS,
                    payload: response.data.products
                })
            })
            .catch((error) => {
                dispatch({
                    type: ADMIN_PRODUCT_FAIL,
                    payload: error.response.data
                })
            });
    } catch (error) {
        console.log(error);
        dispatch({
            type: ADMIN_PRODUCT_FAIL,
            payload: error.response.data
        })
    }
};

//Clear Errors
export const clearErrors = () => (dispatch) => {
    dispatch({ type: CLEAR_ERRORS });
}
