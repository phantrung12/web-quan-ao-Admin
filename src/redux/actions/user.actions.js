import axiosIntance from "../../helpers/axios";
import { userConstants } from "./constants";

export const signup = (user) => {
  // console.log(user);
  return async (dispatch) => {
    dispatch({ type: userConstants.USER_REGISTER_REQUEST });

    const res = await axiosIntance.post(`/admin/signup`, {
      ...user,
    });
    if (res.status === 200) {
      const { message } = res.data;
      dispatch({
        type: userConstants.USER_REGISTER_SUCCESS,
        payload: { message },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.USER_REGISTER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const getAllUser = () => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_ALL_USER_REQUEST });
    const res = await axiosIntance.get("/admin/getAllUser");
    if (res.status === 200) {
      dispatch({
        type: userConstants.GET_ALL_USER_SUCCESS,
        payload: res.data,
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.GET_ALL_USER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
export const getUser = (id) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.GET_USER_DETAILS_REQUEST });
    const res = await axiosIntance.get(`/admin/getUser/${id}`);
    if (res.status === 200) {
      dispatch({
        type: userConstants.GET_USER_DETAILS_SUCCESS,
        payload: res.data,
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.GET_USER_DETAILS_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
export const updateRoleUser = (user) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.UPDATE_USER_ROLE_REQUEST });
    const res = await axiosIntance.put(
      `/admin/updateRoleUser/${user._id}`,
      user
    );
    if (res.status === 200) {
      dispatch({
        type: userConstants.UPDATE_USER_ROLE_SUCCESS,
        payload: res.data,
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.UPDATE_USER_ROLE_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const deleteUser = (id) => {
  return async (dispatch) => {
    dispatch({ type: userConstants.DELETE_USER_REQUEST });
    const res = await axiosIntance.delete(`/admin/deleteUser/${id}`);
    if (res.status === 200) {
      dispatch({
        type: userConstants.DELETE_USER_SUCCESS,
        payload: res.data,
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: userConstants.DELETE_USER_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
