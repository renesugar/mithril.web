import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import { setFilter } from 'helpers/filter';

import { H1 } from '@components/Title';
import Table from '@components/Table';
import Button from '@components/Button';
import ColoredText from 'components/ColoredText';
import { FormRow, FormColumn } from '@components/Form';
import FormError from 'components/FormError';
import FieldFilterForm from 'containers/forms/FieldFilterForm';
import Pagination from 'components/Pagination';
import ShowBy from 'containers/blocks/ShowBy';

import { addError, clearError } from 'redux/error';

import { getUsers, getError } from 'reducers';
import { fetchUsersList } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) => {
    dispatch(clearError());
    dispatch(fetchUsersList({ page_size: 5, ...query }))
      .catch((err) => {
        dispatch(addError(err));
      });
  },
})
@connect(state => ({
  ...state.pages.UsersPage,
  users: getUsers(state, state.pages.UsersPage.users),
  fieldError: getError(state),
}))
export default class UsersPage extends React.Component {
  render() {
    const { users = [], fieldError = {}, t, router, location, paging } = this.props;

    return (
      <div id="users-page">
        <Helmet title={t('Users')} />
        <H1>{ t('Users') }</H1>
        <FormRow>
          <FormColumn>
            <FieldFilterForm
              name="email"
              initialValues={location.query}
              form="user_email_form"
              submitBtn
              onSubmit={values => setFilter(values, { router, location })}
            />
            {fieldError && fieldError.email &&
              <FormError message={fieldError.email} />
            }
          </FormColumn>
          <FormColumn>
            <FieldFilterForm
              name="id"
              initialValues={location.query}
              form="user_id_form"
              submitBtn
              onSubmit={values => setFilter(values, { router, location })}
            />
            {fieldError && fieldError.id &&
              <FormError message={fieldError.id} />
            }
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormColumn />
          <FormColumn>
            <ShowBy
              active={Number(location.query.page_size) || 5}
              onChange={page_size => setFilter({ page_size, page: 1 }, { location, router })}
            />
          </FormColumn>
        </FormRow>
        <div id="users-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('Id') },
              { key: 'email', title: t('Email') },
              { key: 'is_blocked', title: 'Статус' },
              { key: 'actions', title: t('Details') },
            ]}
            data={users.map(item => ({
              id: item.id,
              email: <div className={styles.name}>
                {item.email}
              </div>,
              is_blocked: <div>
                {item.is_blocked ?
                  <ColoredText color="red">Заблокований</ColoredText> :
                  <ColoredText color="green">Активний</ColoredText> }
              </div>,
              actions: (<Button
                id={`user-details-button-${item.id}`}
                theme="link"
                to={`/users/${item.id}`}
              >
                { t('Show user details') }
              </Button>),
            }))}
          />
        </div>
        <div className={styles.block}>
          <Button to="/users/create">{t('Create new user')}</Button>
        </div>

        {paging.total_pages > 1 && (
          <Pagination
            currentPage={paging.page_number}
            totalPage={paging.total_pages}
            location={location}
          />
        )}
      </div>
    );
  }
}
