import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { reduxFormValidate } from 'react-nebo15-validate';

import { Confirm } from '@components/Popup';
import Form, { FormRow, FormBlock, FormButtons, FormColumn } from '@components/Form';
import FieldInput from '@components/reduxForm/FieldInput';
import Button, { ButtonsGroup } from '@components/Button';
import FormError from 'components/FormError';
import ConfirmFormChanges from 'containers/blocks/ConfirmFormChanges';

import styles from './styles.scss';

const getValues = getFormValues('client-types-form');

@translate()
@withStyles(styles)
@reduxForm({
  form: 'client-types-form',
  validate: reduxFormValidate({
    name: {
      required: true,
    },
  }),
  initialValues: {
    scope: '',
  },
})
@connect(state => ({
  values: getValues(state),
}))
export default class ClientTypesForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.state = {
      savedValues: props.initialValues,
      onDelete: false,
    };
  }
  onSubmit(values, ...args) {
    return this.props.onSubmit(values, ...args).then((action) => {
      if (action.error) return action;
      this.setState({
        savedValues: values,
      });
      return action;
    });
  }
  onDelete() {
    return this.props.onDelete(this.state.savedValues.id);
  }
  get isChanged() {
    const { values = [] } = this.props;
    return JSON.stringify(values) !== JSON.stringify(this.state.savedValues);
  }
  render() {
    const { handleSubmit, error, submitting, onDelete, edit, t } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <FormBlock>
          <FormRow>
            <FormColumn>
              <Field
                name="name"
                component={FieldInput}
                labelText={t('Client Type name')}
                placeholder="some_api:write some_api:read"
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <Field
                name="scope"
                component={FieldInput}
                labelText={t('Enter scopes')}
              />
            </FormColumn>
          </FormRow>
        </FormBlock>
        <FormError message={error} />
        <FormButtons>
          {
            edit && (<ButtonsGroup>
              <Button type="submit" disabled={!this.isChanged}>{
                submitting ? t('Saving...') : (this.isChanged ? t('Update Client Type') : t('Saved'))
              }</Button>
              <Button color="red" onClick={() => this.setState({ onDelete: true })}>{submitting ? t('Deleting...') : t('Delete Client Type')
              }</Button>
            </ButtonsGroup>)
          }
          {
            !edit && (<ButtonsGroup>
              <Button type="submit" disabled={!this.isChanged}>{
                submitting ? t('Saving...') : (this.isChanged ? t('Save New Client Type') : t('Saved'))
              }</Button>
            </ButtonsGroup>)
          }
        </FormButtons>
        <ConfirmFormChanges submitting={submitting} isChanged={this.isChanged} />
        <Confirm
          title={t('Are you sure?')}
          active={this.state.onDelete}
          theme="error"
          confirm={t('Yes')}
          cancel={t('No')}
          id="confirm-delete"
          onCancel={() => this.setState({ onDelete: false })}
          onConfirm={() => onDelete(this.state.savedValues.id)}
        >{ t('Are you sure want to delete this client type?') }</Confirm>
      </Form>
    );
  }
}

