import { push } from 'react-router-redux';
import * as fromClients from 'redux/clients';

export const onBlockClient = (id, { block_reason, is_blocked }) => dispatch =>
  dispatch(fromClients.blockClient(id, { block_reason, is_blocked }))
    .then((action) => {
      if (action.error) throw action;
      dispatch(push('/clients'));
      return action;
    });
