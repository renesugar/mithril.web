import { push } from 'react-router-redux';
import * as fromUserRoles from 'redux/user-roles';
import { apiErrorToSubmissionError } from '../../../helpers/apiErrorTransformer';

export const onCreateUserRole = (id, body) => dispatch =>
  dispatch(fromUserRoles.createUserRole(id, body))
    .then((action) => {
      if (action.error) throw apiErrorToSubmissionError(action.payload.response);
      dispatch(push(`/users/${id}`));
      return action;
    });
