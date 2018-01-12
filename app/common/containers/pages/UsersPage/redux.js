import { combineReducers } from 'redux';
import { handleAction, createAction } from 'redux-actions';
import * as fromUsers from 'redux/users';
import { apiErrorToSubmissionError } from '../../../helpers/apiErrorTransformer';

export const getUsers = createAction('mainPage/GET_USERS_LIST');
export const pagingUsers = createAction('mainPage/ADD_PAGING');

export const fetchUsersList = options => dispatch =>
  dispatch(fromUsers.fetchUsersList(options))
  .then((action) => {
    if (action.error) throw apiErrorToSubmissionError(action.payload.response);
    dispatch(getUsers(action.payload.result));
    dispatch(pagingUsers(action.meta));

    return action;
  });

const users = handleAction(getUsers, (state, action) => action.payload, []);
const paging = handleAction(pagingUsers, (state, action) => action.payload, {});

export default combineReducers({
  users,
  paging,
});
