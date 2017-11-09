import React from 'react';
import { withRouter } from 'react-router';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { format } from 'helpers/date';
import { setFilter } from 'helpers/filter';

import { H1 } from '@components/Title';
import Table from '@components/Table';
import { FormRow, FormColumn } from '@components/Form';
import Button from '@components/Button';
import Pagination from 'components/Pagination';
import FieldFilterForm from 'containers/forms/FieldFilterForm';
import ShowBy from 'containers/blocks/ShowBy';

import { getTokens } from 'reducers';
import { fetchTokens } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchTokens({ page_size: 5, ...query })),
})
@connect(state => ({
  ...state.pages.TokensPage,
  tokens: getTokens(state, state.pages.TokensPage.tokens),
}))
export default class TokensPage extends React.Component {
  render() {
    const { tokens = [], t, router, location, paging } = this.props;

    return (
      <div id="tokens-page">
        <Helmet title={t('Tokens')} />
        <H1>{ t('Tokens') }</H1>
        <FormRow>
          <FormColumn>
            <FieldFilterForm
              form="token_name_form"
              name="name"
              placeholder={t('Enter {{name}}', { name: t('name') })}
              initialValues={location.query}
              submitBtn
              onSubmit={({ name }) => setFilter({ name }, { location, router })}
            />
          </FormColumn>
          <FormColumn>
            <FieldFilterForm
              form="token_value_form"
              name="value"
              placeholder={t('Enter {{name}}', { name: t('value') })}
              initialValues={location.query}
              submitBtn
              onSubmit={({ value }) => setFilter({ value }, { location, router })}
            />
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormColumn>
            <FieldFilterForm
              form="token_user_id_form"
              name="User ID"
              initialValues={location.query}
              submitBtn
              onSubmit={({ user_id }) => setFilter({ user_id }, { location, router })}
            />
          </FormColumn>
          <FormColumn>
            <ShowBy
              active={Number(location.query.page_size) || 5}
              onChange={page_size => setFilter({ page_size }, { location, router })}
            />
          </FormColumn>
        </FormRow>
        <div id="tokens-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('Id') },
              { key: 'name', title: t('Name') },
              { key: 'value', title: t('Value') },
              { key: 'scope', title: t('Expires_at') },
              { key: 'details', title: t('Action') },
            ]}
            data={tokens.map(item => ({
              id: item.id,
              name: <div className={styles.name}>
                {item.name}
              </div>,
              value: <div className={styles.name}>
                {item.value}
              </div>,
              scope: <div>
                { format(item.expires_at * 1000, 'DD.MM.YYYY HH:MM') }
              </div>,
              details: (<Button
                id={`token-details-button-${item.id}`}
                theme="link"
                to={`/tokens/${item.id}`}
              >
                { t('Show token details') }
              </Button>),
            }))}
          />
        </div>
        <div className={styles.block}>
          <Button to="/tokens/create">{t('Create new token')}</Button>
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
