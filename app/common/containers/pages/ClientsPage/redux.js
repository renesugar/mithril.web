import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromClients from 'redux/clients';
import { apiErrorToSubmissionError } from '../../../helpers/apiErrorTransformer';

export const getClients = createAction('clientsPage/GET_CLIENTS');
export const pagingClients = createAction('clientsPage/ADD_PAGING');

export const fetchClients = options => dispatch =>
  dispatch(fromClients.fetchClients(options))
  .then((action) => {
    if (action.error) throw apiErrorToSubmissionError(action.payload.response);
    return [
      dispatch(getClients(action.payload.result)),
      dispatch(pagingClients(action.meta)),
    ];
  });

const clients = handleAction(getClients, (state, action) => action.payload, []);
const paging = handleAction(pagingClients, (state, action) => action.payload, {});

export default combineReducers({
  clients,
  paging,
});
