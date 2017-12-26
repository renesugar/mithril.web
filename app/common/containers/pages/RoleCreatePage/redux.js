import { push } from 'react-router-redux';
import * as fromRoles from 'redux/roles';
import { apiErrorToSubmissionError } from '../../../helpers/apiErrorTransformer';

export const onCreateRole = body => dispatch =>
  dispatch(fromRoles.createRole(body))
    .then((action) => {
      if (action.error) throw apiErrorToSubmissionError(action.payload.response);
      dispatch(push(`/roles/${action.payload.result}`));
      return action;
    });
