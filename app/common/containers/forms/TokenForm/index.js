import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { reduxFormValidate } from 'react-nebo15-validate';

import { Confirm } from '@components/Popup';
import Form, { FormRow, FormBlock, FormButtons, FormColumn } from '@components/Form';
import FieldInput from '@components/reduxForm/FieldInput';
import FieldDate from '@components/reduxForm/FieldDatepicker';
import Button, { ButtonsGroup } from '@components/Button';
import FormError from 'components/FormError';
import ConfirmFormChanges from 'containers/blocks/ConfirmFormChanges';

import styles from './styles.scss';

const getValues = getFormValues('token-form');

@translate()
@withStyles(styles)
@reduxForm({
  form: 'token-form',
  validate: reduxFormValidate({
    id: {
      required: true,
    },
    name: {
      required: true,
    },
    value: {
      required: true,
    },
    expires_at: {
      required: true,
    },
    'details.scope': {
      required: true,
    },
    'details.client_id': {
      required: true,
    },
    'details.grant_type': {
      required: true,
    },
    'details.redirect_uri': {
      required: true,
    },
    user_id: {
      required: true,
    },
  }),
})
@connect(state => ({
  values: getValues(state),
}))
export default class TokenForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.state = {
      savedValues: props.initialValues,
      onDelete: false,
      submitFailed: false,
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
    const { values = {} } = this.props;
    return JSON.stringify(values) !== JSON.stringify(this.state.savedValues);
  }
  render() {
    const {
      handleSubmit,
      error,
      submitting,
      submitFailed,
      onDelete,
      create,
      t,
      disabled,
    } = this.props;
    const is_changed = this.isChanged;
    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <FormBlock>
          <FormRow>
            <FormColumn>
              <Field
                name="id"
                component={FieldInput}
                labelText={t('ID')}
                placeholder="b5e3318e-2192-4676"
                disabled={disabled}
              />
            </FormColumn>
            <FormColumn>
              <Field
                name="name"
                component={FieldInput}
                labelText={t('Name')}
                placeholder={t('access_token')}
                disabled={disabled}
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <Field
                name="value"
                component={FieldInput}
                labelText={t('Value')}
                placeholder="bkZ2b3BsND"
                disabled={disabled}
              />
            </FormColumn>
            <FormColumn>
              <Field
                name="expires_at"
                component={FieldDate}
                labelText={t('Expires_at')}
                placeholder="22/01/2018"
                dateModelFormat="X"
                disabled={disabled}
                dateFormat="DD/MM/YY"
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <Field
                name="details.scope"
                component={FieldInput}
                labelText={t('Scope')}
                placeholder={t('legal_entity:write')}
                disabled={disabled}
              />
            </FormColumn>
            <FormColumn>
              <Field
                name="details.client_id"
                component={FieldInput}
                labelText={t('Client ID')}
                placeholder={t('b5e3318e-2192-4676')}
                disabled={disabled}
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <Field
                name="details.grant_type"
                component={FieldInput}
                labelText={t('Grant type')}
                placeholder={t('password')}
                disabled={disabled}
              />
            </FormColumn>
            <FormColumn>
              <Field
                name="details.redirect_uri"
                component={FieldInput}
                labelText={t('Redirect uri')}
                placeholder={t('http://example.com/resource')}
                disabled={disabled}
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <Field
                name="user_id"
                component={FieldInput}
                labelText={t('User ID')}
                placeholder={t('8d3c0349-353e-48ef')}
                disabled={disabled}
              />
            </FormColumn>
            <FormColumn />
          </FormRow>
        </FormBlock>
        <FormError message={error} />
        <FormButtons>
          {
            !create && (<Button
              color="red"
              onClick={() => this.setState({ onDelete: true })}
            >
              {submitting ? t('Deleting...') : t('Delete token')}
            </Button>)
          }
          {
            create && (<ButtonsGroup>
              <Button type="submit" disabled={!is_changed}>
                { submitting ? t('Saving...') : (is_changed ? t('Save New Token') : (submitFailed ? t('Failed') : t('Saved'))) }
              </Button>
            </ButtonsGroup>)
          }
        </FormButtons>
        <ConfirmFormChanges submitting={submitting} isChanged={is_changed} />
        <Confirm
          title={t('Are you sure?')}
          active={this.state.onDelete}
          theme="error"
          confirm={t('Yes')}
          cancel={t('No')}
          id="confirm-delete"
          onCancel={() => this.setState({ onDelete: false })}
          onConfirm={() => onDelete(this.state.savedValues.id)}
        >{ t('Are you sure want to delete this token?') }</Confirm>
      </Form>
    );
  }
}

