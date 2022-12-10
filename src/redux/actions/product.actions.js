import { pick } from "lodash";
import axiosIntance from "../../helpers/axios";
import querystring from "query-string";
import { productsConstants } from "./constants";

export const addProduct = (newProduct) => {
  return async (dispatch) => {
    // console.log(newProduct);
    const res = await axiosIntance.post("/product/create", newProduct);
    // console.log(res);
  };
};

export const updateProduct = (form) => {
  return async (dispatch) => {
    const res = await axiosIntance.post("/product/update", form);
    // console.log(res);
  };
};

export const getProductsById = (id) => {
  return async (dispatch) => {
    const res = await axiosIntance.get(`/admin/product/${id}`);
    if (res.status === 200) {
      // console.log(res.data);
      dispatch({
        type: productsConstants.GET_PRODUCT_BY_ID_SUCCESS,
        payload: { product: res.data.product },
      });
    } else {
      if (res.status === 400) {
        dispatch({
          payload: { error: res.data.error },
        });
      }
    }
  };
};

export const updateSale = (saledProduct, id) => {
  return async (dispatch) => {
    // console.log(saledProduct, id);
    const res = await axiosIntance.put(
      `/product/updatesale/${id}`,
      saledProduct
    );
    console.log(res);
  };
};

export const deleteProduct = (productId) => {
  return async (dispatch) => {
    const res = await axiosIntance.post("/product/delete", {
      payload: productId,
    });
  };
};

export const searchProduct = (params) => {
  return async (dispatch) => {
    const query = querystring.stringify(
      pick(params, [
        "page",
        "keyword",
        "category",
        "size",
        "color",
        "price[gte]",
        "price[lte]",
      ])
    );
    const res = await axiosIntance.get("/admin/product/search?" + query);
    if (res.status === 200) {
      // console.log(res.data);
      dispatch({
        type: productsConstants.SEARCH_PRODUCTS_SUCCESS,
        payload: res.data,
      });
      // console.log(res.data);
    } else {
      console.log(res.error);
    }
  };
};
