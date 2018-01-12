import { push } from 'react-router-redux';
import * as fromTokens from 'redux/tokens';
import { apiErrorToSubmissionError } from '../../../helpers/apiErrorTransformer';

export const onDeleteToken = body => dispatch =>
  dispatch(fromTokens.deleteToken(body))
    .then((action) => {
      if (action.error) throw apiErrorToSubmissionError(action.payload.response);
      dispatch(push('/tokens'));
      return action;
    });
