import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { normalize } from 'normalizr';
import { createUrl } from 'helpers/url';

import { client } from 'schemas';

import { invoke } from './api';

export const fetchClients = ({ limit = 10, ...options } = {}, { useCache = false } = {}) =>
  invoke({
    endpoint: createUrl(`${API_URL}/admin/clients`, { ...options, limit }),
    method: 'GET',
    headers: {
      'content-type': 'application/json',
    },
    bailout: state => useCache &&
      state.data.clients &&
      Object.keys(state.data.clients).length,
    types: ['clients/FETCH_CLIENTS_REQUEST', {
      type: 'clients/FETCH_CLIENTS_SUCCESS',
      payload: (action, state, res) => res.clone().json().then(
        json => normalize(json.data, [client])
      ),
      meta: (action, state, res) =>
        res.clone().json().then(json => json.paging),
    }, 'clients/FETCH_CLIENTS_FAILURE'],
  });

export const fetchClientByID = id => invoke({
  endpoint: `${API_URL}/admin/clients/${id}`,
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['clients/FETCH_CLIENT_BY_ID_REQUEST', {
    type: 'clients/FETCH_CLIENT_BY_ID_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, client)
    ),
  }, 'clients/FETCH_CLIENT_BY_ID_FAILURE'],
});

export const createClient = body => invoke({
  endpoint: `${API_URL}/admin/clients`,
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  types: ['clients/CREATE_CLIENT_REQUEST', {
    type: 'clients/CREATE_CLIENT_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, client)
    ),
  }, 'clients/CREATE_CLIENT_FAILURE'],
  body: {
    client: {
      ...body,
      client_type_id: body.client_type_id.name,
      user_id: body.user_id.name,
      priv_settings: JSON.parse(body.priv_settings),
    },
  },
});

export const updateClient = (id, body) => invoke({
  endpoint: `${API_URL}/admin/clients/${id}`,
  method: 'PUT',
  headers: {
    'content-type': 'application/json',
  },
  types: ['clients/UPDATE_CLIENT_REQUEST', {
    type: 'clients/UPDATE_CLIENT_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, client)
    ),
  }, 'client_types/UPDATE_CLIENT_FAILURE'],
  body: {
    client: {
      ...body,
      client_type_id: body.client_type_id.name,
      user_id: body.user_id.name,
      priv_settings: JSON.parse(body.priv_settings),
    },
  },
});

export const deleteClient = id => invoke({
  endpoint: `${API_URL}/admin/clients/${id}`,
  method: 'DELETE',
  headers: {
    'content-type': 'application/json',
  },
  types: ['clients/DELETE_CLIENT_REQUEST',
    'clients/DELETE_CLIENT_SUCCESS',
    'clients/DELETE_CLIENT_FAILURE'],
});
export const blockClient = (id, block_reason) => invoke({
  endpoint: `${API_URL}/admin/clients/${id}`,
  method: 'PUT',
  headers: {
    'content-type': 'application/json',
  },
  types: ['clients/BLOCK_CLIENT_REQUEST',
    'clients/BLOCK_CLIENT_SUCCESS',
    'clients/BLOCK_CLIENT_FAILURE'],
  body: {
    client: {
      block_reason,
      is_blocked: true,
    },
  },
});

export const unblockClient = (id, block_reason = '') => invoke({
  endpoint: `${API_URL}/admin/clients/${id}`,
  method: 'PUT',
  headers: {
    'content-type': 'application/json',
  },
  types: ['clients/UNBLOCK_CLIENT_REQUEST',
    'clients/UNBLOCK_CLIENT_SUCCESS',
    'clients/UNBLOCK_CLIENT_FAILURE'],
  body: {
    client: {
      block_reason,
      is_blocked: false,
    },
  },
});


export default handleAction(
  combineActions(
    'clients/FETCH_CLIENTS_SUCCESS',
    'clients/FETCH_CLIENT_BY_ID_SUCCESS',
    'clients/CREATE_CLIENT_SUCCESS',
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.clients,
  }),
  null
);
