import { push } from 'react-router-redux';
import * as fromUsers from 'redux/users';

export const onCreateUser = ({ fa_factor, ...rest }) => dispatch =>
  dispatch(fromUsers.createUser({
    '2fa_enable': JSON.parse(fa_factor), // fa_factor oneOf('null', 'false', 'true')
    ...rest,
  })).then((action) => {
    if (action.error) throw new Error();
    dispatch(push(`/users/${action.payload.result}`));
    return action;
  });
