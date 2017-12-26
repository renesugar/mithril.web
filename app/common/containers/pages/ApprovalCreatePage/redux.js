import { push } from 'react-router-redux';
import * as fromApprovals from 'redux/approvals';
import { apiErrorToSubmissionError } from '../../../helpers/apiErrorTransformer';

export const onCreateApproval = body => dispatch =>
  dispatch(fromApprovals.createApproval(body))
    .then((action) => {
      if (action.error) throw apiErrorToSubmissionError(action.payload.response);
      dispatch(push('/approvals'));
      return action;
    });
