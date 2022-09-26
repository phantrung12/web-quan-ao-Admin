import axiosIntance from "../../helpers/axios";

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
