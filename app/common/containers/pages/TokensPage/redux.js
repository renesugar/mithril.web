import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromTokens from 'redux/tokens';
import { apiErrorToSubmissionError } from '../../../helpers/apiErrorTransformer';

export const getTokens = createAction('tokensPage/GET_TOKENS');
export const pagingTokens = createAction('tokensPage/ADD_PAGING');

export const fetchTokens = options => dispatch =>
  dispatch(fromTokens.fetchTokens(options))
  .then((action) => {
    if (action.error) throw apiErrorToSubmissionError(action.payload.response);
    return [
      dispatch(getTokens(action.payload.result)),
      dispatch(pagingTokens(action.meta)),
    ];
  });

const tokens = handleAction(getTokens, (state, action) => action.payload, []);
const paging = handleAction(pagingTokens, (state, action) => action.payload, {});

export default combineReducers({
  tokens,
  paging,
});
