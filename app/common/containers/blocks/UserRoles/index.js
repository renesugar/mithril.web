import React from 'react';
import { translate } from 'react-i18next';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import { H1 } from '@components/Title';
import Table from '@components/Table';
import Button from '@components/Button';
import { Confirm } from '@components/Popup';

import styles from './styles.scss';

@withStyles(styles)
@translate()
export default class UserRoles extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onDelete: false,
      user_id: null,
      role_id: null,
    };
  }
  render() {
    const { roles = [], onDeleteUserRole, t, id } = this.props;
    return (
      <div id="users-roles">
        <H1>{ t('User roles') }</H1>
        <div id="users-roles-table" className={styles.table}>
          <Table
            columns={[
              { key: 'client', title: t('Client') },
              { key: 'role', title: t('Role') },
              { key: 'actions', title: t('Actions') },
            ]}
            data={roles.map(item => ({
              client: item.client_id ? item.client_id.name : '-',
              role: item.role_id ? item.role_id.name : '-',
              actions: (<Button
                id={`user-roles-delete-button-${item.id}`}
                theme="link"
                color="red"
                onClick={() => this.setState({
                  onDelete: true,
                  user_id: item.user_id,
                  role_id: item.id,
                })}
              >
                { t('Delete user role') }
              </Button>),
            }))}
          />
        </div>
        <div className={styles.block}>
          <Button to={`/users/${id}/roles/create`}>{t('Create new user role')}</Button>
        </div>
        <Confirm
          title={t('Are you sure?')}
          active={this.state.onDelete}
          theme="error"
          confirm="Так"
          cancel="Відмінити"
          id="confirm-delete"
          onCancel={() => this.setState({ onDelete: false })}
          onConfirm={() => {
            this.setState({
              onDelete: false,
            });
            return onDeleteUserRole(this.state.user_id, this.state.role_id);
          }}
        >{ t('Are you sure want to delete this user role?') }</Confirm>
      </div>
    );
  }
}
