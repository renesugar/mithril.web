import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues, reset } from 'redux-form';
import { push } from 'react-router-redux';

import Form, { FormRow, FormBlock, FormColumn } from '@components/Form';
import FormError from 'components/FormError';
import FieldInput from '@components/reduxForm/FieldInput';
import { Confirm } from '@components/Popup';
import { H1 } from '@components/Title';
import Button from '@components/Button';

const getValues = getFormValues('client-block-form');

@reduxForm({
  form: 'client-block-form',
})
@connect(state => ({
  values: getValues(state) || [],
}), { push, reset })
export default class ClientBlockForm extends React.Component {
  state = {
    active: false,
  };

  render() {
    const {
      onUnBlockClient = () => {},
      onBlockClient = () => {},
      error,
      client = {},
      values = [],
      push,
      reset,
    } = this.props;

    return (
      <Form>
        <FormBlock>
          {client.block_reason &&
            <H1>Коментар: {client.block_reason}</H1>
          }
          <FormRow>
            <FormColumn>
              <Field
                name="block_reason"
                component={FieldInput}
                placeholder={`Введіть причину ${client.is_blocked ? 'розблокування' : 'блокування'}`}
              />
            </FormColumn>
            <FormColumn>
              <Button
                color="red"
                size="small"
                onClick={() => this.setState({ active: true })}
              >{`${client.is_blocked ? 'Розблокувати' : 'Заблокувати'}`}</Button>
            </FormColumn>
          </FormRow>
        </FormBlock>
        <FormError message={error} />

        <Confirm
          title="Підтвердіть дію"
          confirm="Так"
          cancel="Відмінити"
          active={this.state.active}
          theme="error"
          id="confirm-delete"
          onCancel={() => this.setState({ active: false })}
          onConfirm={() => Promise.all([
            client.is_blocked && onUnBlockClient(client.id, values.block_reason),
            !client.is_blocked && onBlockClient(client.id, values.block_reason),
          ]).then(() => {
            this.setState({ active: false });
            reset('user-block-form');
            return push(`/clients/${client.id}/block`);
          })
          }
        >
          Ви впевнені, що хочете
          {client.is_blocked ?
            ' розблокувати клієнта' :
            ' заблокувати клієнта' }?</Confirm>
      </Form>
    );
  }
}
