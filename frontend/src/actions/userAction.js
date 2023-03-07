import {
  LOGIN_REQUEST,
  LOGIN_SUCCESS,
  LOGIN_FAIL,
  CLEAR_ERRORS,
  REGISTER_USER_FAIL,
  REGISTER_USER_REQUEST,
  REGISTER_USER_SUCCESS,
  LOAD_USER_REQUEST,
  LOAD_USER_SUCCESS,
  LOAD_USER_FAIL,
  LOGOUT_SUCCESS,
  LOGOUT_FAIL,
  PROFILE_UPDATE_REQUEST,
  PROFILE_UPDATE_SUCCESS,
  PROFILE_UPDATE_FAIL,
  UPDATE_PASSWORD_REQUEST,
  UPDATE_PASSWORD_SUCCESS,
  UPDATE_PASSWORD_FAIL,
  FORGOT_PASSWORD_REQUEST,
  FORGOT_PASSWORD_SUCCESS,
  FORGOT_PASSWORD_FAIL,
  RESET_PASSWORD_REQUEST,
  RESET_PASSWORD_SUCCESS,
  ALL_USERS_REQUEST,
  ALL_USERS_SUCCESS,
  ALL_USERS_FAIL,
  USER_DETAILS_REQUEST,
  USER_DETAILS_SUCCESS,
  USER_DETAILS_FAIL,
  UPDATE_USER_REQUEST,
  UPDATE_USER_SUCCESS,
  UPDATE_USER_FAIL,
  DELETE_USER_REQUEST,
  DELETE_USER_SUCCESS,
  DELETE_USER_FAIL,
  RESET_PASSWORD_FAIL
} from "../constants/userConstants";
import axios from "axios";

//Login
export const login = (email, password) => async (dispatch) => {
  try {
    dispatch({ type: LOGIN_REQUEST });

    axios.post(
      `/api/v1/login`,
      { email, password },
      {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      }
    )
      .then((response) => {
        dispatch({ type: LOGIN_SUCCESS, payload: response.data.user });
      })
      .catch((error) => {
        console.log({error})
        dispatch({ type: LOGIN_FAIL, payload: error.response.data });
      });
  } catch (error) {
    dispatch({ type: LOGIN_FAIL, payload: error.response.data });
  }
};

//Register
export const register = (userData) => async (dispatch) => {
  try {
    dispatch({ type: REGISTER_USER_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    axios.post(`/api/v1/register`, userData, config)
      .then((response) => {
        dispatch({ type: REGISTER_USER_SUCCESS, payload: response.data.user });
      })
      .catch((error) => {
        dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data });
      });

  } catch (error) {
    dispatch({ type: REGISTER_USER_FAIL, payload: error.response.data })
  }
}

//Load user
export const loadUser = () => async (dispatch) => {
  try {
    dispatch({ type: LOAD_USER_REQUEST });

    axios.get(
      `/api/v1/me`)
      .then((response) => {
        dispatch({ type: LOAD_USER_SUCCESS, payload: response.data.user });
      })
      .catch((error) => {
        dispatch({ type: LOAD_USER_FAIL, payload: error.response });
      });
  } catch (error) {
    dispatch({ type: LOAD_USER_FAIL, payload: error.response.data });
  }
};

//logout user
export const logout = () => async (dispatch) => {
  try {
    axios.get(
      `/api/v1/logout`)
      .then((response) => {
        dispatch({ type: LOGOUT_SUCCESS });
      })
      .catch((error) => {
        dispatch({ type: LOGOUT_FAIL, payload: error.response.data });
      });
  } catch (error) {
    dispatch({ type: LOGOUT_FAIL, payload: error.response.data });
  }
};

//update profile
export const updateProfile = (userData) => async (dispatch) => {
  try {
    dispatch({ type: PROFILE_UPDATE_REQUEST });

    const config = { headers: { "Content-Type": "multipart/form-data" } };

    axios.put(`/api/v1/me/update`, userData, config)
      .then((response) => {
        dispatch({ type: PROFILE_UPDATE_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: PROFILE_UPDATE_FAIL, payload: error.response.data });
      });

  } catch (error) {
    dispatch({ type: PROFILE_UPDATE_FAIL, payload: error.response.data })
  }
}

//update password
export const updatePassword = (passwords) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_PASSWORD_REQUEST });

    const config = { headers: { "Content-Type": "application/json" } };

    axios.put(`/api/v1/password/update`, passwords, config)
      .then((response) => {
        dispatch({ type: UPDATE_PASSWORD_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data });
      });

  } catch (error) {
    dispatch({ type: UPDATE_PASSWORD_FAIL, payload: error.response.data })
  }
}

//Forgot password
export const forgotPassword = (email) => async (dispatch) => {
  try {
    dispatch({ type: FORGOT_PASSWORD_REQUEST });

    axios.post(
      `/api/v1/password/forgot`,
      { email },
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        dispatch({ type: FORGOT_PASSWORD_SUCCESS, payload: response.data.message });
      })
      .catch((error) => {
        dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data });
      });
  } catch (error) {
    dispatch({ type: FORGOT_PASSWORD_FAIL, payload: error.response.data });
  }
};

//Resert password
export const resetPassword = (token, passwords) => async (dispatch) => {
  try {
    dispatch({ type: RESET_PASSWORD_REQUEST });

    axios.put(
      `/api/v1/password/reset/${token}`,
      passwords,
      {
        headers: { "Content-Type": "application/json" },
      }
    )
      .then((response) => {
        dispatch({ type: RESET_PASSWORD_SUCCESS, payload: response.data.success });
      })
      .catch((error) => {
        dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data });
      });
  } catch (error) {
    dispatch({ type: RESET_PASSWORD_FAIL, payload: error.response.data });
  }
};

//Get all users admin
export const allUsers = () => async (dispatch) => {
  try {
    dispatch({ type: ALL_USERS_REQUEST });

    axios.get(
      `/api/v1/admin/users`)
      .then((response) => {
        dispatch({ type: ALL_USERS_SUCCESS, payload: response.data.users });
      })
      .catch((error) => {
        dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.error });
      });
  } catch (error) {
    dispatch({ type: ALL_USERS_FAIL, payload: error.response.data.error });
  }
};

//Get  user details
export const userDetails = (id) => async (dispatch) => {
  try {
    dispatch({ type: USER_DETAILS_REQUEST });

    axios.get(
      `/api/v1/admin/user/${id}`)
      .then((response) => {
        dispatch({ type: USER_DETAILS_SUCCESS, payload: response.data.user });
      })
      .catch((error) => {
        dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.error });
      });
  } catch (error) {
    dispatch({ type: USER_DETAILS_FAIL, payload: error.response.data.error });
  }
};

//update user details
export const updateUser = (id, userData) => async (dispatch) => {
  try {
    dispatch({ type: UPDATE_USER_REQUEST });

    const config = { headers: { 'Content-Type': 'application/json'}}
    axios.put(
      `/api/v1/admin/user/${id}`, userData, config)
      .then((response) => {
        dispatch({ type: UPDATE_USER_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.error });
      });
  } catch (error) {
    dispatch({ type: UPDATE_USER_FAIL, payload: error.response.data.error });
  }
};

//Delete user
export const deleteUser = (id) => async (dispatch) => {
  try {
    dispatch({ type: DELETE_USER_REQUEST });

    axios.delete(
      `/api/v1/admin/user/${id}`)
      .then((response) => {
        dispatch({ type: DELETE_USER_SUCCESS, payload: response.data });
      })
      .catch((error) => {
        dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.error });
      });
  } catch (error) {
    dispatch({ type: DELETE_USER_FAIL, payload: error.response.data.error });
  }
};


//clearing errors
export const clearErrors = () => async (dispatch) => {
  dispatch({ type: CLEAR_ERRORS });
};
