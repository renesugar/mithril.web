import { push } from 'react-router-redux';
import * as fromApprovals from 'redux/approvals';
import { apiErrorToSubmissionError } from '../../../helpers/apiErrorTransformer';

export const deleteApproval = id => dispatch =>
  dispatch(fromApprovals.deleteApproval(id))
    .then((action) => {
      if (action.error) throw apiErrorToSubmissionError(action.payload.response);
      return dispatch(push('/approvals'));
    });
