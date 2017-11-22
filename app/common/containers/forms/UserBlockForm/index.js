import React from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field, getFormValues, reset } from 'redux-form';
import FieldInput from '@components/reduxForm/FieldInput';

import { Confirm } from '@components/Popup';
import Form, { FormRow, FormBlock, FormColumn } from '@components/Form';
import { H1 } from '@components/Title';
import Button from '@components/Button';
import { push } from 'react-router-redux';

const getValues = getFormValues('user-block-form');

@reduxForm({
  form: 'user-block-form',
})
@connect(state => ({
  values: getValues(state) || [],
}), { push, reset })
export default class UserBlockForm extends React.Component {
  state = {
    active: false,
  };

  render() {
    const {
      onBlockUser = () => {},
      onUnblockUser = () => {},
      user = {},
      values = [],
      push,
      reset,
    } = this.props;


    return (
      <Form>
        <FormBlock>
          {user.block_reason &&
            <H1>Коментар: {user.block_reason}</H1>
          }
          <FormRow>
            <FormColumn>
              <Field
                name="block_reason"
                component={FieldInput}
                placeholder={`Введіть причину ${user.is_blocked ? 'розблокування' : 'блокування'}`}
              />
            </FormColumn>
            <FormColumn>
              <Button
                color="red"
                size="small"
                onClick={() => this.setState({ active: true })}
              >{`${user.is_blocked ? 'Розблокувати' : 'Заблокувати'}`}</Button>
            </FormColumn>
          </FormRow>
        </FormBlock>

        <Confirm
          title="Підтвердіть дію"
          confirm="Так"
          cancel="Відмінити"
          active={this.state.active}
          theme="error"
          id="confirm-delete"
          onCancel={() => this.setState({ active: false })}
          onConfirm={() => Promise.all([
            user.is_blocked && onUnblockUser(user.id, { ...values }),
            !user.is_blocked && onBlockUser(user.id, { ...values }),
          ]).then(() => {
            this.setState({ active: false });
            reset('user-block-form');
            return push(`/users/${user.id}`);
          })
          }
        >
          Ви впевнені, що хочете
          {user.is_blocked ?
            ' розблокувати користувача' :
            ' заблокувати користувача' }?</Confirm>
      </Form>
    );
  }
}
