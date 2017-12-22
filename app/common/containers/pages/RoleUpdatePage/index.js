import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import RoleForm from 'containers/forms/RoleForm';

import { getRole } from 'reducers';
import { fetchRoleByID } from 'redux/roles';
import { deleteRole, onUpdateRole } from './redux';

import styles from './styles.scss';

@provideHooks({
  fetch: ({ dispatch, params: { id } }) => dispatch(fetchRoleByID(id)),
})
@connect((state, { params: { id } }) => ({
  role: getRole(state, id),
}), { onUpdateRole, deleteRole })
@withStyles(styles)
@translate()
export default class RoleUpdatePage extends React.Component {
  render() {
    const { t, role, onUpdateRole, deleteRole } = this.props;

    return (
      <FormPageWrapper id="update-roles-page" title={t('Edit role: {{name}}', { name: role.name })} back="/roles">
        <Helmet title={t('Edit role: {{name}}', { name: role.name })} />
        <div className={styles.block}>
          <RoleForm
            initialValues={role}
            onSubmit={values => onUpdateRole(role.id, values)}
            onDelete={deleteRole}
            edit
          />
        </div>
      </FormPageWrapper>
    );
  }
}
