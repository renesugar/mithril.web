import React from 'react';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { reduxFormValidate } from 'react-nebo15-validate';
import { connect } from 'react-redux';

import { Confirm } from '@components/Popup';
import Form, { FormRow, FormBlock, FormButtons, FormColumn } from '@components/Form';
import FieldInput from '@components/reduxForm/FieldInput';
import Button, { ButtonsGroup } from '@components/Button';
import FieldCheckbox from '@components/reduxForm/FieldCheckbox';


const getValues = getFormValues('client-block-form');

@reduxForm({
  form: 'client-block-form',
  validate: reduxFormValidate({
    is_blocked: {
      required: true,
    },
  }),
})
@connect(state => ({
  values: getValues(state),
}))
export default class ClientBLockForm extends React.Component {
  state = {
    onDelete: false,
  };


  render() {
    const {
      onBlockClient,
      values = {},
    } = this.props;
    return (
      <Form>
        <FormBlock>
          <FormRow>
            <FormColumn align="baseline">
              <Field
                name="is_blocked"
                component={FieldCheckbox}
                labelText="Заблокований / Не заблокований"
              />
            </FormColumn>
            <FormColumn />
          </FormRow>
          <FormRow>
            <FormColumn align="baseline">
              <Field
                name="block_reason"
                component={FieldInput}
                labelText="Коментар"
              />
            </FormColumn>
          </FormRow>
        </FormBlock>
        <FormButtons>
          <ButtonsGroup>
            <Button to="/clients">Повенутися до списку</Button>
            <Button
              color="red"
              onClick={() => this.setState({ onDelete: true })}
            >
              {values.is_blocked ? 'Заблокувати' : 'Розблокувати'}
            </Button>
          </ButtonsGroup>
        </FormButtons>
        <Confirm
          title="Ви впевнені"
          active={this.state.onDelete}
          theme="error"
          confirm="Так"
          cancel="Відмінити"
          id="confirm-delete"
          onCancel={() => this.setState({ onDelete: false })}
          onConfirm={() => onBlockClient(values)}
        >
          {`Ви впевнені, що хочете ${values.is_blocked ? 'заблокувати' : 'розблокувати'} кліента`}
        </Confirm>
      </Form>
    );
  }
}
