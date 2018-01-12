import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromClientTypes from 'redux/client-types';
import { apiErrorToSubmissionError } from '../../../helpers/apiErrorTransformer';

export const getClientTypes = createAction('clientTypesPage/GET_CLIENT_TYPES');
export const pagingClientTypes = createAction('clientTypesPage/ADD_PAGING');

export const fetchClientsTypes = options => dispatch =>
  dispatch(fromClientTypes.fetchClientsTypes(options))
  .then((action) => {
    if (action.error) throw apiErrorToSubmissionError(action.payload.response);
    return [
      dispatch(getClientTypes(action.payload.result)),
      dispatch(pagingClientTypes(action.meta)),
    ];
  });

const clientTypes = handleAction(getClientTypes, (state, action) => action.payload, []);
const paging = handleAction(pagingClientTypes, (state, action) => action.payload, {});

export default combineReducers({
  clientTypes,
  paging,
});
