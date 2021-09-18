import {
  /* GET NEWS CONSTANTS */
  GET_NEWS_REQUEST,
  GET_NEWS_SUCCESS,
  GET_NEWS_FAILURE,
} from '../store/TypeConstants';

const initialState = {
  pageNumber: 1,
  newsData: [],
  error: {},
  status: '',
  newDataAvailable: true,
  loading: false,
};

const AuthReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_NEWS_REQUEST:
      return {
        ...state,
        status: action.type,
        loading: true,
      };
    case GET_NEWS_SUCCESS:
      return {
        ...state,
        status: action.type,
        newsData:
          action.pageNumber === 1
            ? action.data
            : [...state.newsData, ...action.data],
        newDataAvailable: action.newDataAvailable,
        pageNumber: action.pageNumber,
        loading: false,
      };
    case GET_NEWS_FAILURE:
      return {
        ...state,
        status: action.type,
        error: action.error,
        newDataAvailable: false,
        loading: false,
      };
    default:
      return state;
  }
};

export default AuthReducer;
