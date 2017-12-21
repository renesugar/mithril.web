import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { reduxFormValidate } from 'react-nebo15-validate';
import FieldInput from '@components/reduxForm/FieldInput';

import { Confirm } from '@components/Popup';
import Form, { FormRow, FormBlock, FormButtons, FormColumn } from '@components/Form';
import Button, { ButtonsGroup } from '@components/Button';
import FormError from 'components/FormError';
import ConfirmFormChanges from 'containers/blocks/ConfirmFormChanges';
import { Select } from '@components/Select';

import styles from './styles.scss';

const getValues = getFormValues('approval-form');

@translate()
@withStyles(styles)
@reduxForm({
  form: 'approval-form',
  validate: reduxFormValidate({
    scope: {
      required: true,
    },
    user_id: {
      required: true,
    },
    client_id: {
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
export default class ApprovalForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.state = {
      savedValues: props.initialValues,
      onDelete: false,
      user_id_search: '',
      client_id_search: '',
    };
  }
  onSubmit(values, ...args) {
    this.setState({
      savedValues: values,
    });

    return this.props.onSubmit(values, ...args).then((action) => {
      if (action.error) return action;
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
    const { handleSubmit, error, submitting, onDelete, edit, t, data } = this.props;
    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <FormBlock>
          <FormRow>
            <FormColumn>
              <Field
                searchable
                name="user_id"
                emptyText={t('Not found')}
                placeholder={t('Enter email')}
                labelText={t('User ID')}
                component={Select}
                onChangeSearch={val => this.setState({ user_id_search: val })}
                options={
                  data.users
                    .filter(i => new RegExp(this.state.user_id_search).test(i.email) === true)
                    .map(i => ({
                      name: i.id,
                      title: i.email,
                    }))
                }
              />
            </FormColumn>
            <FormColumn>
              <Field
                name="client_id"
                searchable
                component={Select}
                labelText={t('Client id')}
                placeholder={t('Select client')}
                emptyText={t('Not found')}
                onChangeSearch={val => this.setState({ client_id_search: val })}
                options={data.clients
                  .filter(i => new RegExp(this.state.client_id_search).test(i.name) === true)
                  .map(i => ({
                    name: i.id,
                    title: i.name,
                  }))
                }
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <Field
                name="scope"
                component={FieldInput}
                labelText={t('Enter scopes')}
                placeholder="some_api:write some_api:read"
              />
            </FormColumn>
          </FormRow>
        </FormBlock>
        <FormError message={error} />
        <FormButtons>
          {
            edit && (<ButtonsGroup>
              <Button type="submit" disabled={!this.isChanged}>{
                submitting ? t('Saving...') : (this.isChanged ? t('Update approval') : t('Saved'))
              }</Button>
              <Button color="red" onClick={() => this.setState({ onDelete: true })}>{submitting ? t('Deleting...') : t('Delete approval')
              }</Button>
            </ButtonsGroup>)
          }
          {
            !edit && (<ButtonsGroup>
              <Button type="submit" disabled={!this.isChanged}>{
                submitting ? t('Saving...') : (this.isChanged ? t('Save New approval') : t('Saved'))
              }</Button>
            </ButtonsGroup>)
          }
        </FormButtons>
        <ConfirmFormChanges submitting={submitting} isChanged={this.isChanged} />
        <Confirm
          title={t('Are you sure?')}
          confirm={t('Yes')}
          cancel={t('No')}
          active={this.state.onDelete}
          theme="error"
          id="confirm-delete"
          onCancel={() => this.setState({ onDelete: false })}
          onConfirm={() => onDelete(this.state.savedValues.id)}
        >{ t('Are you sure want to delete this approval?') }</Confirm>
      </Form>
    );
  }
}
