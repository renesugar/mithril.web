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
import { FormRow, FormColumn } from '@components/Form';
import Button from '@components/Button';
import Pagination from 'components/Pagination';
import FieldFilterForm from 'containers/forms/FieldFilterForm';
import IsBlockedFilterForm from 'containers/forms/IsBlockedFilterForm';
import ShowBy from 'containers/blocks/ShowBy';
import ColoredText from 'components/ColoredText';

import { getClients } from 'reducers';
import { fetchClients } from './redux';

import styles from './styles.scss';

@withRouter
@withStyles(styles)
@translate()
@provideHooks({
  fetch: ({ dispatch, location: { query } }) =>
    dispatch(fetchClients({ page_size: 5, ...query })),
})
@connect(state => ({
  ...state.pages.ClientsPage,
  clients: getClients(state, state.pages.ClientsPage.clients),
}))
export default class ClientsPage extends React.Component {
  render() {
    const { clients = [], t, location, paging, router } = this.props;

    return (
      <div id="clients-page">
        <Helmet title={t('Clients')} />
        <H1>{ t('Clients') }</H1>
        <FormRow>
          <FormColumn>
            <FieldFilterForm
              name="name"
              form="clients_name_form"
              initialValues={location.query}
              submitBtn
              onSubmit={name => setFilter(name, { location, router })}
            />
          </FormColumn>
          <FormColumn>
            <FieldFilterForm
              name="user_id"
              form="clients_user_id_form"
              initialValues={location.query}
              submitBtn
              onSubmit={user_id => setFilter(user_id, { location, router })}
            />
          </FormColumn>
        </FormRow>
        <FormRow>
          <FormColumn>
            <IsBlockedFilterForm
              onChange={is_blocked =>
                setFilter({ is_blocked }, { location, router })}
            />
          </FormColumn>
          <FormColumn>
            <ShowBy
              active={Number(location.query.page_size) || 5}
              onChange={page_size => setFilter({ page_size, page: 1 }, { location, router })}
            />
          </FormColumn>
        </FormRow>
        <div id="client-table" className={styles.table}>
          <Table
            columns={[
              { key: 'id', title: t('Id') },
              { key: 'name', title: t('Name') },
              { key: 'redirect_uri', title: t('Redirect uri') },
              { key: 'is_blocked', title: t('Статус') },
              { key: 'actions', title: t('Details') },
              { key: 'deactivate', title: 'Дії' },
            ]}
            data={clients.map(item => ({
              id: item.id,
              name: <div className={styles.name}>
                {item.name}
              </div>,
              is_blocked: <div>
                {!item.is_blocked ? (
                  <ColoredText color="green">не заблокований</ColoredText>
                ) : (
                  <ColoredText color="red">заблокований</ColoredText>
                )}
              </div>,
              redirect_uri: (<div className={styles.word_break}>
                <Button
                  id={`client-details-button-${item.id}`}
                  theme="link"
                  to={`https://${item.redirect_uri}`}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  { item.redirect_uri }
                </Button>
              </div>),
              actions: (<Button
                id={`client-details-button-${item.id}`}
                theme="link"
                to={`/clients/${item.id}`}
              >
                { t('Show client details') }
              </Button>),
              deactivate: (<Button
                id={`client-details-button-${item.id}`}
                theme="link"
                size="small"
                color="red"
                to={`/clients/${item.id}/block`}
              >
                Заблокувати / Розблокувати
              </Button>),
            }))}
          />
        </div>
        <div className={styles.block}>
          <Button to="/clients/create">{t('Create new client')}</Button>
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
