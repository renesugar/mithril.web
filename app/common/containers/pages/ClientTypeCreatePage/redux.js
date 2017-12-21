import { push } from 'react-router-redux';
import * as fromClientTypes from 'redux/client-types';
import { apiErrorToSubmissionError } from '../../../helpers/apiErrorTransformer';

export const onCreateClientType = body => dispatch =>
  dispatch(fromClientTypes.createClientType(body))
    .then((action) => {
      if (action.error) throw apiErrorToSubmissionError(action.payload.response);
      dispatch(push(`/client_types/${action.payload.result}`));
      return action;
    });

