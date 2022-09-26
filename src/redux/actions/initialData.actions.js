import axiosIntance from "../../helpers/axios";
import {
  categoryConstants,
  orderConstants,
  productsConstants,
} from "./constants";

export const getInitialData = () => {
  return async (dispatch) => {
    const res = await axiosIntance.post("/initialdata");
    if (res.status === 200) {
      const { categoryList, categories, products, orders } = res.data;
      dispatch({
        type: categoryConstants.GET_ALL_CATEGORY_SUCCESS,
        payload: { categories, categoryList },
      });
      dispatch({
        type: productsConstants.GET_ALL_PRODUCTS_SUCCESS,
        payload: { products },
      });
      dispatch({
        type: orderConstants.GET_CUSTOMER_ORDER_SUCCESS,
        payload: { orders },
      });
    }
  };
};
