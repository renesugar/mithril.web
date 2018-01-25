import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { reduxForm, Field, getFormValues } from 'redux-form';
import { reduxFormValidate, ErrorMessage } from 'react-nebo15-validate';

import { Confirm } from '@components/Popup';
import Form, { FormRow, FormBlock, FormButtons, FormColumn } from '@components/Form';
import FormError from 'components/FormError';
import FieldInput from '@components/reduxForm/FieldInput';
import Button, { ButtonsGroup } from '@components/Button';
import ConfirmFormChanges from 'containers/blocks/ConfirmFormChanges';
import { H3 } from '@components/Title';
import ColoredText from 'components/ColoredText';
import { Select } from '@components/Select';

import styles from './styles.scss';

const getValues = getFormValues('client-form');

@translate()
@withStyles(styles)
@reduxForm({
  form: 'client-form',
  validate: reduxFormValidate({
    name: {
      required: true,
    },
    redirect_uri: {
      required: true,
    },
    user_id: {
      required: true,
    },
    client_type_id: {
      required: true,
    },
    priv_settings: {
      required: true,
      json: true,
    },
  }),
  initialValues: {
    settings: {},
    priv_settings: JSON.stringify({ access_type: 'DIRECT' }),
  },
})
@connect(state => ({
  values: getValues(state),
}))
export default class ClientForm extends React.Component {
  constructor(props) {
    super(props);
    this.onSubmit = this.onSubmit.bind(this);
    this.onDelete = this.onDelete.bind(this);
    this.state = {
      savedValues: props.initialValues,
      onDelete: false,
      user_search: '',
      client_type_search: '',
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
      onSearchUsers,
      onDelete,
      submitting,
      error,
      initialValues,
      create,
      update,
      t,
      data,
    } = this.props;
    const is_changed = this.isChanged;
    return (
      <Form onSubmit={handleSubmit(this.onSubmit)}>
        <FormBlock>
          <FormRow>
            <FormColumn>
              <Field
                name="name"
                component={FieldInput}
                labelText={t('Client name')}
                placeholder={t('eHealth portal')}
              />
            </FormColumn>
            <FormColumn>
              <Field
                name="redirect_uri"
                placeholder="https://example.com.ua"
                component={FieldInput}
                labelText={t('Redirect uri')}
              />
            </FormColumn>
          </FormRow>
          <FormRow>
            <FormColumn>
              <Field
                name="user_id"
                component={Select}
                searchable
                labelText={t('User ID')}
                emptyText={t('Not found')}
                placeholder={t('Select user')}
                onChangeSearch={value =>
                  value && onSearchUsers(value).then(() =>
                      this.setState({
                        user_search: value.toLowerCase(),
                      })
                    )
                }
                options={data.users
                  .filter(i => new RegExp(this.state.user_search).test(i.email) === true)
                  .map(i => ({
                    name: i.id,
                    title: i.email,
                  }))
                }
              />
            </FormColumn>
            <FormColumn>
              <Field
                name="client_type_id"
                component={Select}
                labelText={t('Client type id')}
                placeholder={t('Select client type')}
                options={data.clientTypes
                  .filter(i => new RegExp(this.state.client_type_search).test(i.name) === true)
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
                name="priv_settings"
                component={FieldInput}
                labelText="Налаштування"
              >
                <ErrorMessage when="json">{'Не вірний формат. Приклад: {"broker_scope":"some:scope","access_type":"DIRECT | BROKER"}'}</ErrorMessage>
              </Field>
            </FormColumn>
          </FormRow>
          {
            !create && (
              <FormRow>
                <FormColumn>
                  <Field
                    name="secret"
                    component={FieldInput}
                    readOnly
                    disabled
                    labelText={t('Client secret')}
                  />
                </FormColumn>
              </FormRow>
            )
          }
          {
            update && (<FormRow>
              <H3>Cтатус: {initialValues.is_blocked ?
                <ColoredText color="red">Заблокований</ColoredText> :
                <ColoredText color="green">Активний</ColoredText>
                }
              </H3>
              <H3>Причина {initialValues.is_blocked ? 'заблокування' : 'розблокування'}:
                {initialValues.block_reason ? ` ${initialValues.block_reason}` : ' відсутня'}
              </H3>
            </FormRow>)
          }
        </FormBlock>
        <FormError message={error} />
        <FormButtons>
          {
            create && (<ButtonsGroup>
              <Button type="submit" disabled={!is_changed}>
                { submitting ? t('Saving...') : t('Create New Client') }
              </Button>
            </ButtonsGroup>)
          }
          {
            update && (<ButtonsGroup>
              <Button type="submit" disabled={!is_changed}>
                { submitting ? t('Saving...') : (is_changed ? t('Update Client') : t('Saved')) }
              </Button>
              <Button
                color="red"
                onClick={() => this.setState({ onDelete: true })}
              >
                {submitting ? t('Deleting...') : t('Delete client')}
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
        >{ t('Are you sure want to delete this client?') }</Confirm>
      </Form>
    );
  }
}
