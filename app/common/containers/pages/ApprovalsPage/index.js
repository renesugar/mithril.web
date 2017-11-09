import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter } from 'react-router';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { setFilter } from 'helpers/filter';

import { H1 } from '@components/Title';
import Table from '@components/Table';
import Button from '@components/Button';
import Pagination from 'components/Pagination';
import FieldFilterForm from 'containers/forms/FieldFilterForm';
import { FormRow, FormColumn } from '@components/Form';
import ShowBy from 'containers/blocks/ShowBy';

import { getApprovals } from 'reducers';
import { fetchApprovals } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchApprovals({ page_size: 5, ...query })),
})
@connect(state => ({
  ...state.pages.ApprovalsPage,
  approvals: getApprovals(state, state.pages.ApprovalsPage.approvals),
}))
export default class ApprovalsPage extends React.Component {
  render() {
    const { approvals = [], t, location, paging, router } = this.props;

    return (
      <div id="approvals-page">
        <Helmet title={t('Approvals')} />
        <H1>{ t('Approvals') }</H1>
        <FormRow>
          <FormColumn>
            <FieldFilterForm
              submitBtn
              form="app_client_id_form"
              name="client_id"
              placeholder={t('Enter {{name}}', { name: t('Client ID') })}
              initialValues={location.query}
              onSubmit={client_id => setFilter(client_id, { location, router })}
            />
          </FormColumn>
          <FormColumn>
            <FieldFilterForm
              name="user_id"
              form="app_user_id_form"
              submitBtn
              placeholder={t('Enter {{name}}', { name: t('User ID') })}
              initialValues={location.query}
              onSubmit={user_id => setFilter(user_id, { location, router })}
            />
          </FormColumn>
          <FormColumn>
            <ShowBy
              active={Number(location.query.page_size) || 5}
              onChange={page_size => setFilter({ page_size, page: 1 }, { location, router })}
            />
          </FormColumn>
        </FormRow>
        <div id="roles-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('Id') },
              { key: 'scope', title: t('Scope') },
              { key: 'action', title: t('Action') },
            ]}
            data={approvals.map(item => ({
              id: item.id,
              scope: item.scope,
              action: (<Button
                id={`edit-approval-button-${item.id}`}
                theme="link"
                to={`/approvals/${item.id}`}
              >
                { t('Edit approval') }
              </Button>),
            }))}
          />
        </div>
        <div className={styles.block}>
          <Button to="/approvals/create">{t('Create new approval')}</Button>
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
