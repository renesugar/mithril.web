import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { normalize } from 'normalizr';
import { userRole } from 'schemas';
import { invoke } from './api';

export const fetchUserRoles = id => invoke({
  endpoint: `${API_URL}/admin/users/${id}/roles`,
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['userRoles/FETCH_USER_ROLES_REQUEST', {
    type: 'userRoles/FETCH_USER_ROLES_SUCCESS',
    meta: { userId: id },
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, [userRole])
    ),
  }, 'userRoles/FETCH_USER_ROLES_FAILURE'],
});

export const createUserRole = (id, body) => invoke({
  endpoint: `${API_URL}/admin/users/${id}/roles`,
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  types: ['userRoles/CREATE_USER_ROLE_REQUEST', {
    type: 'userRoles/CREATE_USER_ROLE_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, userRole)
    ),
  }, 'userRoles/CREATE_USER_ROLE_FAILURE'],
  body: {
    user_role: {
      user_id: id,
      ...body,
      role_id: body.role_id.name,
      client_id: body.client_id.name,
    },
  },
});

export const deleteUserRole = (user_id, id) => invoke({
  endpoint: `${API_URL}/admin/users/roles/${id}`,
  method: 'DELETE',
  headers: {
    'content-type': 'application/json',
  },
  types: ['userRoles/DELETE_USER_ROLE_REQUEST', {
    type: 'userRoles/DELETE_USER_ROLE_SUCCESS',
    meta: {
      userId: user_id,
      userRoleId: id,
    },
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, userRole)
    ),
  }, 'userRoles/DELETE_USER_ROLE_FAILURE'],
});

export default handleAction(
  combineActions(
    'userRoles/FETCH_USER_ROLES_SUCCESS',
    'userRoles/CREATE_USER_ROLE_SUCCESS',
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.userRoles,
  }),
  []
);
