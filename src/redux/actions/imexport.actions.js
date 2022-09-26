import axiosIntance from "../../helpers/axios";
import { imexportConstants } from "./constants";

export const getAllImExport = () => {
  return async (dispatch) => {
    dispatch({ type: imexportConstants.GET_ALL_IMEXPORT_REQUEST });
    const res = await axiosIntance.get("/imexport/getAll");
    if (res.status === 200) {
      dispatch({
        type: imexportConstants.GET_ALL_IMEXPORT_SUCCESS,
        payload: res.data,
      });
    } else {
      if (res.status === 400) {
        dispatch({
          type: imexportConstants.GET_ALL_IMEXPORT_FAILURE,
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const addImexport = (newImexport) => {
  return async (dispatch) => {
    dispatch({ type: imexportConstants.ADD_IMEXPORT_REQUEST });
    try {
      const res = await axiosIntance.post("/imexport/create", newImexport);
      // console.log(res);
      if (res.status === 200) {
        dispatch({
          type: imexportConstants.ADD_IMEXPORT_SUCCESS,
          payload: { category: res.data.category },
        });
      } else {
        if (res.status === 400) {
          dispatch({
            type: imexportConstants.ADD_IMEXPORT_FAILURE,
            payload: { error: res.data.error },
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
};
