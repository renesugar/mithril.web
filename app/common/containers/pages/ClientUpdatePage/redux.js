import { push } from 'react-router-redux';
import * as fromClients from 'redux/clients';
import { apiErrorToSubmissionError } from '../../../helpers/apiErrorTransformer';

export const onDeleteClient = id => dispatch =>
  dispatch(fromClients.deleteClient(id))
    .then((action) => {
      if (action.error) throw apiErrorToSubmissionError(action.payload.response);
      dispatch(push('/clients'));
      return action;
    });
