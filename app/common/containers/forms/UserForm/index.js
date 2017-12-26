import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { reduxFormValidate } from 'react-nebo15-validate';

import { Confirm } from '@components/Popup';
import Form, { FormRow, FormBlock, FormButtons, FormColumn } from '@components/Form';
import FieldInput from '@components/reduxForm/FieldInput';
import FieldSelect from 'components/reduxForm/FieldSelect';
import Button, { ButtonsGroup } from '@components/Button';
import FormError from 'components/FormError';
import ConfirmFormChanges from 'containers/blocks/ConfirmFormChanges';

import styles from './styles.scss';

const getValues = getFormValues('user-form');

@translate()
@withStyles(styles)
@reduxForm({
  form: 'user-form',
  validate: reduxFormValidate({
    email: {
      required: true,
      email: true,
    },
    password: {
      required: true,
    },
  }),
  initialValues: {
    fa_factor: 'null',
  },
})
@connect(state => ({
  values: getValues(state),
}))
export default class UserForm extends React.Component {
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
    const {
      handleSubmit,
      error,
      submitting,
      onDelete,
      create,
      update,
      t,
      submitFailed } = this.props;
    const is_changed = this.isChanged;
    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <FormBlock>
          <FormRow>
            <FormColumn>
              <Field
                name="email"
                component={FieldInput}
                labelText={t('User email')}
                placeholder={t('example@gmail.com')}
              />
            </FormColumn>
            <FormColumn>
              <Field
                name="password"
                type="password"
                placeholder="*********"
                component={FieldInput}
                labelText={t('Password')}
              />
            </FormColumn>
          </FormRow>
          {
            create && (
              <FormRow>
                <FormColumn>
                  <Field
                    name="fa_factor"
                    component={FieldSelect}
                    labelText="Статус фактора аутентифікації"
                    placeholder="Оберіть статус"
                    active="null"
                    options={[
                      { name: 'null', title: 'За замовчуванням' },
                      { name: 'false', title: 'Виключений' },
                      { name: 'true', title: 'Включений' },
                    ]}
                  />
                </FormColumn>
                <FormColumn />
              </FormRow>
            )
          }
        </FormBlock>
        <FormError message={error} />
        <FormButtons>
          {
            create && (<ButtonsGroup>
              <Button type="submit">
                { submitting ? t('Saving...') : t('Create New User') }
              </Button>
            </ButtonsGroup>)
          }
          {
            update && (<ButtonsGroup>
              <Button type="submit" disabled={!is_changed}>
                { submitting ? t('Saving...') : (is_changed ? t('Update User') : (submitFailed ? t('Failed') : t('Saved'))) }
              </Button>
              <Button
                color="red"
                onClick={() => this.setState({ onDelete: true })}
              >
                {submitting ? t('Deleting...') : t('Delete user')}
              </Button>
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
        >{ t('Are you sure want to delete this user?') }</Confirm>
      </Form>
    );
  }
}

