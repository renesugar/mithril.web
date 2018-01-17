import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import ClientForm from 'containers/forms/ClientForm';

import { getAllUsers, getAllClientTypes } from 'reducers';

import { onCreateClient, onSearchUsers } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@connect(state => ({
  users: getAllUsers(state),
  clientTypes: getAllClientTypes(state),
}), ({ onCreateClient, onSearchUsers }))
export default class ClientCreatePage extends React.Component {
  render() {
    const {
      users = [],
      clientTypes = [],
      onCreateClient,
      onSearchUsers,
      t,
    } = this.props;
    return (
      <FormPageWrapper id="create-client-page" title={t('Create client')} back="/clients">
        <Helmet title={t('Create client')} />
        <ClientForm
          onSubmit={onCreateClient}
          data={{ users, clientTypes }}
          onSearchUsers={onSearchUsers}
          create
        />
      </FormPageWrapper>
    );
  }
}
