import { combineReducers } from 'redux';
import { reducer as form } from 'redux-form';
import { routerReducer as routing } from 'react-router-redux';
import { denormalize } from 'normalizr';
import * as schemas from 'schemas';

import loading from 'redux/loading';
import error from 'redux/error';

import roles from 'redux/roles';
import clientTypes from 'redux/client-types';
import tokens from 'redux/tokens';
import clients from 'redux/clients';
import approvals from 'redux/approvals';
import session from 'redux/session';

import users from 'redux/users';
import userRoles from 'redux/user-roles';
import userFactors from 'redux/user-factors';

import Aside from 'containers/blocks/Aside/redux';

import RolesPage from 'containers/pages/RolesPage/redux';
import ClientTypePage from 'containers/pages/ClientTypePage/redux';
import TokensPage from 'containers/pages/TokensPage/redux';
import UsersPage from 'containers/pages/UsersPage/redux';
import ClientsPage from 'containers/pages/ClientsPage/redux';
import ApprovalsPage from 'containers/pages/ApprovalsPage/redux';

const blocks = combineReducers({
  Aside,
});

const pages = combineReducers({
  RolesPage,
  ClientTypePage,
  TokensPage,
  UsersPage,
  ClientsPage,
  ApprovalsPage,
});

const data = combineReducers({
  roles,
  clientTypes,
  tokens,

  users,
  userRoles,
  userFactors,

  clients,
  approvals,
});

export default combineReducers({
  blocks,
  pages,
  session,
  data,
  // external libraries
  form,
  routing,
  loading,
  error,
});

export const isAuthorized = state => state.session.authorized;

export const getLocation = state => state.routing.locationBeforeTransitions;
export const getForm = (state, formName) => state.form[formName];

export const getRoles = (state, ids) => denormalize(ids, [schemas.role], state.data);
export const getAllRoles = state => getRoles(state, Object.keys(state.data.roles));
export const getRole = (state, id) => denormalize(id, schemas.role, state.data);

export const getClientTypes = (state, ids) => denormalize(ids, [schemas.clientType], state.data);
export const getClientType = (state, id) => denormalize(id, schemas.clientType, state.data);
export const getAllClientTypes = state =>
  getClientTypes(state, Object.keys(state.data.clientTypes));

export const getTokens = (state, ids) => denormalize(ids, [schemas.token], state.data);
export const getToken = (state, id) => denormalize(id, schemas.token, state.data);

export const getUsers = (state, ids) => denormalize(ids, [schemas.user], state.data);
export const getAllUsers = state => getUsers(state, Object.keys(state.data.users));
export const getUser = (state, id) => denormalize(id, schemas.user, state.data);

export const getClients = (state, ids) => denormalize(ids, [schemas.client], state.data);
export const getAllClients = state => getClients(state, Object.keys(state.data.clients));
export const getClient = (state, id) => denormalize(id, schemas.client, state.data);

export const getApprovals = (state, ids) => denormalize(ids, [schemas.approval], state.data);
export const getApproval = (state, id) => denormalize(id, schemas.approval, state.data);

export const getUserRoles = (state, id) => denormalize(id, [schemas.userRole], state.data);

export const getError = state => state.error;
