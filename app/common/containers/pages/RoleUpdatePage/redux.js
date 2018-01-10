import { push } from 'react-router-redux';
import * as fromRoles from 'redux/roles';
import { apiErrorToSubmissionError } from '../../../helpers/apiErrorTransformer';

export const deleteRole = id => dispatch =>
  dispatch(fromRoles.deleteRole(id))
    .then((action) => {
      if (action.error) throw apiErrorToSubmissionError(action.payload.response);
      dispatch(push('/roles'));
      return action;
    });

export const onUpdateRole = (id, body) => dispatch =>
  dispatch(fromRoles.updateRole(id, body))
    .then((action) => {
      if (action.error) throw apiErrorToSubmissionError(action.payload.response);
      dispatch(push(`/roles/${action.payload.result}`));
      return action;
    });
