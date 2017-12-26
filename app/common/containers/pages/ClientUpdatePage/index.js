import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import ClientForm from 'containers/forms/ClientForm';

import { getAllUsers, getAllClientTypes, getClient } from 'reducers';

import { updateClient, fetchClientByID } from 'redux/clients';
// import { getUserByID } from 'redux/users';
// import { fetchClientTypeByID } from 'redux/client-types';
import { onDeleteClient, onSearchUsers, onSearchClientTypes } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchClientByID(id)),
})
@connect((state, { params: { id } }) => ({
  users: getAllUsers(state),
  clientTypes: getAllClientTypes(state),
  client: getClient(state, id),
}), ({ updateClient, onDeleteClient, onSearchUsers, onSearchClientTypes }))
export default class ClientUpdatePage extends React.Component {
  render() {
    const {
      users = [],
      clientTypes = [],
      client,
      updateClient = () => {},
      onDeleteClient = () => {},
      onSearchUsers = () => {},
      onSearchClientTypes = () => {},
      t,
    } = this.props;

    const user_id = {
      name: users.filter(i => i.id === client.user_id)[0].id,
      title: users.filter(i => i.id === client.user_id)[0].email,
    };

    const client_type_id = {
      name: clientTypes.filter(i => i.id === client.client_type_id)[0].id,
      title: clientTypes.filter(i => i.id === client.client_type_id)[0].email,
    };
    return (
      <FormPageWrapper id="client-update-page" title={t('Update client')} back="/clients">
        <Helmet title={t('Update client')} />
        <ClientForm
          update
          initialValues={{
            ...client,
            user_id,
            client_type_id,
          }}
          data={{ users, clientTypes }}
          onSubmit={values => updateClient(this.props.params.id, values)}
          onDelete={() => onDeleteClient(this.props.params.id)}
          onSearchUsers={onSearchUsers}
          onSearchClientTypes={onSearchClientTypes}
        />
      </FormPageWrapper>
    );
  }
}
