import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { createUrl } from 'helpers/url';
import { normalize } from 'normalizr';
import { role } from 'schemas';

import { invoke } from './api';

export const fetchRoles = ({ ...options, limit = 10 }, { useCache = false } = {}) => invoke({
  endpoint: createUrl(`${API_URL}/admin/roles`, { ...options, limit }),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  bailout: state => useCache && state.data.roles && Object.keys(state.data.roles).length,
  types: ['roles/FETCH_ROLES_REQUEST', {
    type: 'roles/FETCH_ROLES_SUCCESS',
    payload: (action, state, res) => res.clone().json().then(
      json => normalize(json.data, [role])
    ),
    meta: (action, state, res) =>
      res.clone().json().then(json => json.paging),
  }, 'roles/FETCH_ROLES_FAILURE'],
});

export const fetchRoleByID = id => invoke({
  endpoint: `${API_URL}/admin/roles/${id}`,
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['roles/FETCH_ROLE_BY_ID_REQUEST', {
    type: 'roles/FETCH_ROLE_BY_ID_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, role)
    ),
  }, 'roles/FETCH_ROLE_BY_ID_FAILURE'],
});

export const createRole = body => invoke({
  endpoint: `${API_URL}/admin/roles`,
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  types: ['roles/CREATE_ROLE_REQUEST', {
    type: 'roles/CREATE_ROLE_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, role)
    ),
  }, 'roles/CREATE_ROLE_FAILURE'],
  body: {
    role: {
      ...body,
    },
  },
});

export const updateRole = (id, body) => invoke({
  endpoint: `${API_URL}/admin/roles/${id}`,
  method: 'PATCH',
  headers: {
    'content-type': 'application/json',
  },
  types: ['roles/UPDATE_ROLE_REQUEST', {
    type: 'roles/UPDATE_ROLE_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, role)
    ),
  }, 'roles/UPDATE_ROLE_FAILURE'],
  body: {
    role: {
      ...body,
    },
  },
});

export const deleteRole = id => invoke({
  endpoint: `${API_URL}/admin/roles/${id}`,
  method: 'DELETE',
  headers: {
    'content-type': 'application/json',
  },
  types: ['roles/DELETE_ROLE_REQUEST',
    'roles/DELETE_ROLE_SUCCESS',
    'roles/DELETE_ROLE_FAILURE'],
});

export default handleAction(
  combineActions(
    'roles/FETCH_ROLES_SUCCESS',
    'roles/FETCH_ROLE_BY_ID_SUCCESS',
    'roles/CREATE_ROLE_SUCCESS',
    'roles/UPDATE_ROLE_SUCCESS'
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.roles,
  }),
  null
);
