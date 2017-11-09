import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { normalize } from 'normalizr';
import { createUrl } from 'helpers/url';

import { clientType } from 'schemas';

import { invoke } from './api';

export const fetchClientsTypes = ({ limit = 10, ...options }, { useCache = false } = {}) => invoke({
  endpoint: createUrl(`${API_URL}/admin/client_types`, { ...options, limit }),
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  bailout: state => useCache &&
    state.data.clientTypes &&
    Object.keys(state.data.clientTypes).length,
  types: ['clientTypes/FETCH_CLIENT_TYPES_REQUEST', {
    type: 'clientTypes/FETCH_CLIENT_TYPES_SUCCESS',
    payload: (action, state, res) => res.clone().json().then(
      json => normalize(json.data, [clientType])
    ),
    meta: (action, state, res) =>
      res.clone().json().then(json => json.paging),
  }, 'clientTypes/FETCH_CLIENT_TYPES_FAILURE'],
});

export const fetchClientTypeByID = id => invoke({
  endpoint: `${API_URL}/admin/client_types/${id}`,
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['clientTypes/FETCH_CLIENT_TYPES_BY_ID_REQUEST', {
    type: 'clientTypes/FETCH_CLIENT_TYPES_BY_ID_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, clientType)
    ),
  }, 'clientTypes/FETCH_CLIENT_TYPES_BY_ID_FAILURE'],
});

export const createClientType = body => invoke({
  endpoint: `${API_URL}/admin/client_types`,
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  types: ['clientTypes/CREATE_CLIENT_TYPES_REQUEST', {
    type: 'clientTypes/CREATE_CLIENT_TYPES_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, clientType)
    ),
  }, 'clientTypes/CREATE_CLIENT_TYPES_FAILURE'],
  body: {
    client_type: {
      ...body,
    },
  },
});

export const updateClientType = (id, body) => invoke({
  endpoint: `${API_URL}/admin/client_types/${id}`,
  method: 'PATCH',
  headers: {
    'content-type': 'application/json',
  },
  types: ['clientTypes/UPDATE_CLIENT_TYPES_REQUEST', {
    type: 'clientTypes/UPDATE_CLIENT_TYPES_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, clientType)
    ),
  }, 'client_types/UPDATE_CLIENT_TYPES_FAILURE'],
  body: {
    client_type: {
      ...body,
    },
  },
});

export const deleteClientType = id => invoke({
  endpoint: `${API_URL}/admin/client_types/${id}`,
  method: 'DELETE',
  headers: {
    'content-type': 'application/json',
  },
  types: ['clientTypes/DELETE_CLIENT_TYPES_REQUEST',
    'clientTypes/DELETE_CLIENT_TYPES_SUCCESS',
    'clientTypes/DELETE_CLIENT_TYPES_FAILURE'],
});

export default handleAction(
  combineActions(
    'clientTypes/FETCH_CLIENT_TYPES_SUCCESS',
    'clientTypes/FETCH_CLIENT_TYPES_BY_ID_SUCCESS',
    'clientTypes/CREATE_CLIENT_TYPES_SUCCESS',
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.clientTypes,
  }),
  null
);
