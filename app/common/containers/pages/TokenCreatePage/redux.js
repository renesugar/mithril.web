import { push } from 'react-router-redux';
import * as fromTokens from 'redux/tokens';
import { apiErrorToSubmissionError } from '../../../helpers/apiErrorTransformer';

export const onCreateToken = body => dispatch =>
  dispatch(fromTokens.createToken(body))
    .then((action) => {
      if (action.error) throw apiErrorToSubmissionError(action.payload.response);
      return dispatch(push(`/tokens/${action.payload.result}`));
    });
