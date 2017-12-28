import React from 'react';
import { provideHooks } from 'redial';

import { fetchUsersList } from 'redux/users';
import { fetchRoles } from 'redux/roles';
import { fetchClientsTypes } from 'redux/client-types';
import { fetchClients } from 'redux/clients';

@provideHooks({
  fetch: ({ dispatch }) => Promise.all([
    dispatch(fetchClients({ limit: 0 }, { useCache: true })),
    dispatch(fetchRoles({ limit: null }, { useCache: true })),
    dispatch(fetchUsersList({ limit: null }, { useCache: true })),
    dispatch(fetchClientsTypes({ limit: null }, { useCache: true })),
  ]),
})
export default class App extends React.Component {
  render() {
    const { children } = this.props;
    return children;
  }
}
