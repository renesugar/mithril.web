import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import ClientTypesForm from 'containers/forms/ClientTypesForm';

import { getClientType } from 'reducers';
import { fetchClientTypeByID } from 'redux/client-types';
import { deleteClientType, updateClientType } from './redux';

import styles from './styles.scss';

@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchClientTypeByID(id)),
})
@connect((state, { params: { id } }) => ({
  clientType: getClientType(state, id),
}), { updateClientType, deleteClientType })
@withStyles(styles)
@translate()
export default class ClientTypeUpdatePage extends React.Component {
  render() {
    const { t, clientType, updateClientType, deleteClientType } = this.props;

    return (
      <FormPageWrapper id="update-client-type-page" title={t('Edit client type: {{name}}', { name: clientType.name })} back="/client_types">
        <Helmet title={t('Edit client type: {{name}}', { name: clientType.name })} />
        <div className={styles.block}>
          <ClientTypesForm
            initialValues={clientType}
            onSubmit={values => updateClientType(clientType.id, values)}
            onDelete={deleteClientType}
            edit
          />
        </div>
      </FormPageWrapper>
    );
  }
}
