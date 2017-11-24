import { handleAction, combineActions } from 'redux-actions';
import { API_URL } from 'config';
import { normalize } from 'normalizr';
import { userFactor } from 'schemas';
import { invoke } from './api';

export const fetchUserFactors = id => invoke({
  endpoint: `${API_URL}/admin/users/${id}/authentication_factors/`,
  method: 'GET',
  headers: {
    'content-type': 'application/json',
  },
  types: ['userFactors/FETCH_USER_FACTORS_REQUEST', {
    type: 'userFactors/FETCH_USER_FACTORS_SUCCESS',
    meta: { userId: id },
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, [userFactor])
    ),
  }, 'userFactors/FETCH_USER_FACTORS_FAILURE'],
});

export const createUserFactor = id => invoke({
  endpoint: `${API_URL}/admin/users/${id}/authentication_factors`,
  method: 'POST',
  headers: {
    'content-type': 'application/json',
  },
  types: ['userFactors/CREATE_USER_FACTOR_REQUEST', {
    type: 'userFactors/CREATE_USER_FACTOR_SUCCESS',
    payload: (action, state, res) => res.json().then(
      json => normalize(json.data, userFactor)
    ),
  }, 'userFactors/CREATE_USER_FACTOR_FAILURE'],
  body: {
    type: 'SMS',
  },
});

export const deleteUserFactor = (user_id, fa_id) => invoke({
  endpoint: `${API_URL}/admin/users/${user_id}/authentication_factors/${fa_id}/actions/reset`,
  method: 'PATCH',
  headers: {
    'content-type': 'application/json',
  },
  types: ['userFactors/DELETE_USER_FACTOR_REQUEST',
    'userFactors/DELETE_USER_FACTOR_SUCCESS',
    'userFactors/DELETE_USER_FACTOR_FAILURE'],
});

export const enableUserFactor = (user_id, fa_id) => invoke({
  endpoint: `${API_URL}/admin/users/${user_id}/authentication_factors/${fa_id}/actions/enable`,
  method: 'PATCH',
  headers: {
    'content-type': 'application/json',
  },
  types: ['userFactors/ENABLE_USER_FACTOR_REQUEST',
    'userFactors/ENABLE_USER_FACTOR_SUCCESS',
    'userFactors/ENABLE_USER_FACTOR_FAILURE'],
});

export const disableUserFactor = (user_id, fa_id) => invoke({
  endpoint: `${API_URL}/admin/users/${user_id}/authentication_factors/${fa_id}/actions/disable`,
  method: 'PATCH',
  headers: {
    'content-type': 'application/json',
  },
  types: ['userFactors/DISABLE_USER_FACTOR_REQUEST',
    'userFactors/DISABLE_USER_FACTOR_SUCCESS',
    'userFactors/DISABLE_USER_FACTOR_FAILURE'],
});

export default handleAction(
  combineActions(
    'userFactors/FETCH_USER_FACTORS_SUCCESS',
  ),
  (state, action) => ({
    ...state,
    ...action.payload.entities.userFactors,
  }),
  []
);
