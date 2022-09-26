import { imexportConstants } from "../actions/constants";

const initState = {
  imexports: [],
  loading: false,
  error: false,
};

export default (state = initState, action) => {
  switch (action.type) {
    case imexportConstants.GET_ALL_IMEXPORT_REQUEST:
      state = {
        ...state,
        loading: true,
      };
      break;
    case imexportConstants.GET_ALL_IMEXPORT_SUCCESS:
      state = {
        ...initState,
        imexports: action.payload.imexportList,
      };
      break;
    case imexportConstants.GET_ALL_IMEXPORT_FAILURE:
      state = {
        ...initState,
        error: action.payload.error,
      };
      break;
  }
  return state;
};
