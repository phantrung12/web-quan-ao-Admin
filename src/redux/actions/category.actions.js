import axiosIntance from "../../helpers/axios";
import { categoryConstants } from "./constants";

export const getAllCategory = () => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.GET_ALL_CATEGORY_REQUEST });
    const res = await axiosIntance.get("/category/getCate");
    // console.log(res);
    if (res.status === 200) {
      const { categoryList } = res.data;

      dispatch({
        type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
        payload: { categories: categoryList },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: categoryConstants.GET_ALL_CATEGORY_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const addCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.ADD_NEW_CATEGORY_REQUEST });
    try {
      const res = await axiosIntance.post("/category/create", form);
      // console.log(res);
      if (res.status === 200) {
        dispatch({
          type: categoryConstants.ADD_NEW_CATEGORY_SUCCESS,
          payload: { category: res.data.category },
        });
      } else {
        if (res.status === 400) {
          dispatch({
            type: categoryConstants.ADD_NEW_CATEGORY_FAILURE,
            payload: { error: res.data.error },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};

export const updateCategory = (form) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.UPDATE_CATEGORY_REQUEST });
    const res = await axiosIntance.post("/category/update", form);
    if (res.status === 200) {
      dispatch({ type: categoryConstants.UPDATE_CATEGORY_SUCCESS });
      dispatch(getAllCategory());
    } else {
      if (res.status === 400) {
        dispatch({
          type: categoryConstants.UPDATE_CATEGORY_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const deleteCategory = (ids) => {
  return async (dispatch) => {
    dispatch({ type: categoryConstants.DELETE_CATEGORY_REQUEST });
    const res = await axiosIntance.post("/category/delete", {
      payload: { ids },
    });

    if (res.status === 200) {
      dispatch(getAllCategory());
      dispatch({ type: categoryConstants.DELETE_CATEGORY_SUCCESS });
    } else {
      if (res.status === 400) {
        dispatch({
          type: categoryConstants.DELETE_CATEGORY_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};
