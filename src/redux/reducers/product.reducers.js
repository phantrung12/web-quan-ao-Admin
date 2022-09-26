import { productsConstants } from "../actions/constants";

const initState = {
  products: [],
};

export default (state = initState, action) => {
  switch (action.type) {
    case productsConstants.GET_ALL_PRODUCTS_SUCCESS:
      state = {
        ...state,
        products: action.payload.products,
      };
      break;
  }
  return state;
};
