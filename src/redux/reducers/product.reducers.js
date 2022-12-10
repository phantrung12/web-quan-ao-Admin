import { productsConstants } from "../actions/constants";

const initState = {
  products: [],
  productsPageable: {},
  productDetail: {},
};

export default (state = initState, action) => {
  switch (action.type) {
    case productsConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
    case productsConstants.SEARCH_PRODUCTS_SUCCESS:
      state = {
        ...state,
        productsPageable: action.payload,
      };
      break;
    case productsConstants.GET_PRODUCT_BY_ID_SUCCESS:
      state = {
        ...state,
        productDetail: action.payload.product,
      };
      break;
  }
  return state;
};
