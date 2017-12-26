import React from 'react';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import ClientBlockForm from 'containers/forms/ClientBlockForm';
import { H1 } from '@components/Title';
import ColoredText from 'components/ColoredText';

import { getClient } from 'reducers';

import { fetchClientByID, blockClient, unblockClient } from 'redux/clients';

@provideHooks({
  fetch: ({ dispatch, params: { id } }) =>
    dispatch(fetchClientByID(id)),
})
@connect((state, { params: { id } }) => ({
  client: getClient(state, id),
}), ({ blockClient, unblockClient }))
export default class ClientBlockPage extends React.Component {
  render() {
    const {
      client,
      blockClient = () => {},
      unblockClient = () => {},
    } = this.props;
    return (
      <FormPageWrapper id="client-block-page" title="Заблокувати кліента" back="/clients">
        <Helmet title="Заблокувати кліента" />
        <div>
          <H1>Статус кліента:
            {client.is_blocked ?
              <ColoredText color="red">  заблокований</ColoredText> :
              <ColoredText color="green"> активний</ColoredText>}
          </H1>
          <ClientBlockForm
            onBlockClient={blockClient}
            onUnBlockClient={unblockClient}
            client={client}
          />
        </div>
      </FormPageWrapper>
    );
  }
}
