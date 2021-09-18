import {GET_NEWS_REQUEST} from '../store/TypeConstants';

export const getNewsRequestAction = payload => ({
  type: GET_NEWS_REQUEST,
  payload,
});
