import { push } from 'react-router-redux';
import * as fromUsers from 'redux/users';
import { apiErrorToSubmissionError } from '../../../helpers/apiErrorTransformer';

export const onDeleteUser = body => dispatch =>
  dispatch(fromUsers.deleteUser(body))
    .then((action) => {
      if (action.error) throw apiErrorToSubmissionError(action.payload.response);
      dispatch(push('/users'));
      return action;
    });

export const onUpdateUser = (body, id) => dispatch =>
  dispatch(fromUsers.updateUser(body, id))
    .then((action) => {
      if (action.error) throw apiErrorToSubmissionError(action.payload.response);
      return action;
    });
