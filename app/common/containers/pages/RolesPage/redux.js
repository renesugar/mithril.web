import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromRoles from 'redux/roles';
import { apiErrorToSubmissionError } from '../../../helpers/apiErrorTransformer';

export const getRoles = createAction('rolesPage/GET_ROLES');
export const pagingRoles = createAction('rolesPage/ADD_PAGING');

export const fetchRoles = options => dispatch =>
  dispatch(fromRoles.fetchRoles(options))
  .then((action) => {
    if (action.error) throw apiErrorToSubmissionError(action.payload.response);
    return [
      dispatch(getRoles(action.payload.result)),
      dispatch(pagingRoles(action.meta)),
    ];
  });

const roles = handleAction(getRoles, (state, action) => action.payload, []);
const paging = handleAction(pagingRoles, (state, action) => action.payload, {});

export default combineReducers({
  roles,
  paging,
});
