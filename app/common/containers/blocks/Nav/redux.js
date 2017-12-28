import { push } from 'react-router-redux';
import { logout } from 'redux/session';
import * as config from '../../../config';

export const logoutAndRedirect = () => dispatch =>
  dispatch(logout()).then(() => dispatch(push(config.PUBLIC_INDEX_ROUTE)));
