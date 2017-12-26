import { push } from 'react-router-redux';
import * as fromClients from 'redux/clients';

import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromUsers from 'redux/users';
import * as fromClientTypes from 'redux/client-types';

export const onDeleteClient = id => dispatch =>
  dispatch(fromClients.deleteClient(id))
    .then((action) => {
      if (action.error) throw action;
      dispatch(push('/clients'));
      return action;
    });

export const getUsers = createAction('clientUpdatePage/GET_USERS');
export const getClientTypes = createAction('clientUpdatePage/GET_CLIENT_TYPES');


export const onSearchUsers = name => dispatch =>
  dispatch(fromUsers.fetchUsersList({ name, page_size: 200 })).then(
    (action) => {
      if (action.error && action.payload.status !== 400) {
        throw action;
      }
      return dispatch(getUsers(action.payload.result || []));
    }
  );

export const onSearchClientTypes = name => dispatch =>
  dispatch(fromClientTypes.fetchClientsTypes({ name, page_size: 200 })).then(
    (action) => {
      if (action.error && action.payload.status !== 400) {
        throw action;
      }
      return dispatch(getClientTypes(action.payload.result || []));
    }
  );

const users = handleAction(
  getUsers,
  (state, action) => action.payload,
  []
);
const clientTypes = handleAction(
  getClientTypes,
  (state, action) => action.payload,
  []
);

export default combineReducers({
  users,
  clientTypes,
});
