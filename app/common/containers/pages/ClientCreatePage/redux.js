import { push } from 'react-router-redux';
import * as fromClients from 'redux/clients';
import { apiErrorToSubmissionError } from '../../../helpers/apiErrorTransformer';

export const onCreateClient = body => dispatch =>
  dispatch(fromClients.createClient(body))
    .then((action) => {
      if (action.error) throw apiErrorToSubmissionError(action.payload.response);
      dispatch(push(`/clients/${action.payload.result}`));
      return action;
    });
