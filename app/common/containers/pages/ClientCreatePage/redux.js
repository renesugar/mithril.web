import { push } from 'react-router-redux';
import { combineReducers } from 'redux';

import * as fromUsers from 'redux/users';
import * as fromClients from 'redux/clients';
import { apiErrorToSubmissionError } from 'helpers/apiErrorTransformer';
import { handleAction, createAction } from 'redux-actions';

export const onCreateClient = body => dispatch =>
  dispatch(fromClients.createClient(body))
    .then((action) => {
      if (action.error) throw apiErrorToSubmissionError(action.payload.response);
      dispatch(push(`/clients/${action.payload.result}`));
      return action;
    });

export const getUsers = createAction('clientUpdatePage/GET_USERS');

export const onSearchUsers = email => dispatch =>
  dispatch(fromUsers.fetchUsersList({ email, page_size: 200 })).then(
    (action) => {
      if (action.error && action.payload.status !== 400) {
        throw action;
      }
      return dispatch(getUsers(action.payload.result || []));
    }
  );

const users = handleAction(
  getUsers,
  (state, action) => action.payload,
  []
);

export default combineReducers({
  users,
});
