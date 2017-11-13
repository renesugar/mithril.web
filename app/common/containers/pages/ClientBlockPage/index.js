import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import ClientBlockForm from 'containers/forms/ClientBlockForm';

import { getClient } from 'reducers';

import { fetchClientByID } from 'redux/clients';
import { onBlockClient } from './redux';

@provideHooks({
  fetch: ({ dispatch, params: { id } }) =>
    dispatch(fetchClientByID(id)),
})
@connect((state, { params: { id } }) => ({
  client: getClient(state, id),
}), ({ onBlockClient }))
export default class ClientBlockPage extends React.Component {
  render() {
    const {
      client,
      onBlockClient,
    } = this.props;
    return (
      <FormPageWrapper id="client-block-page" title="Заблокувати кліента" back="/clients">
        <Helmet title="Заблокувати кліента" />
        <ClientBlockForm
          onBlockClient={values => onBlockClient(this.props.params.id, values)}
          initialValues={client}
        />
      </FormPageWrapper>
    );
  }
}
