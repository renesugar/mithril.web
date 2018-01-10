import { push } from 'react-router-redux';
import * as fromClientTypes from 'redux/client-types';
import { apiErrorToSubmissionError } from '../../../helpers/apiErrorTransformer';

export const deleteClientType = id => dispatch =>
  dispatch(fromClientTypes.deleteClientType(id))
    .then((action) => {
      if (action.error) throw apiErrorToSubmissionError(action.payload.response);
      dispatch(push('/client_types'));
      return action;
    });

export const updateClientType = (id, values) => dispatch =>
  dispatch(fromClientTypes.updateClientType(id, values))
    .then((action) => {
      if (action.error) throw apiErrorToSubmissionError(action.payload.response);
      return action;
    });
