import {put, call, fork, takeLatest, select, all} from 'redux-saga/effects';
import {getApi} from '../utils/helpers/ApiRequest';
import {
  /* GET NEWS CONSTANTS */
  GET_NEWS_REQUEST,
  GET_NEWS_SUCCESS,
  GET_NEWS_FAILURE,
} from '../redux/store/TypeConstants';

export function* getNews(action) {
  const Header = {
    Accept: 'application/json',
    contenttype: 'application/json',
  };

  try {
    let response = yield call(
      getApi,
      `getNews?count=20&offset=${action.payload.pageNumber}`,
      Header,
    );

    if (response.data.success == true) {
      yield put({
        type: GET_NEWS_SUCCESS,
        data: response.data.data,
        newDataAvailable: response.data.data.length > 0,
        pageNumber: action.payload.pageNumber,
      });
    } else {
      yield put({type: GET_NEWS_FAILURE, error: response.data});
    }
  } catch (error) {
    yield put({type: GET_NEWS_FAILURE, error: error});
  }
}

export default {
  source: [
    (function* () {
      yield takeLatest(GET_NEWS_REQUEST, getNews);
    })(),
  ],
};
