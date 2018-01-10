import React from 'react';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { connect } from 'react-redux';
import { provideHooks } from 'redial';
import Helmet from 'react-helmet';

import FormPageWrapper from 'containers/blocks/FormPageWrapper';
import UserForm from 'containers/forms/UserForm';
import UserBlockForm from 'containers/forms/UserBlockForm';
import UserRoles from 'containers/blocks/UserRoles';
import UserFactors from 'containers/blocks/UserFactors';
import ColoredText from 'components/ColoredText';

import { H1 } from '@components/Title';
import Line from '@components/Line';

import { getUserByID, blockUser, unblockUser } from 'redux/users';
import { fetchUserRoles, deleteUserRole } from 'redux/user-roles';
import { fetchUserFactors, deleteUserFactor, enableUserFactor, disableUserFactor, createUserFactor } from 'redux/user-factors';
import { getUser } from 'reducers';

import { onUpdateUser } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@provideHooks({
  fetch: ({ dispatch, params: { id } }) => Promise.all([
    dispatch(getUserByID(id)),
    dispatch(fetchUserRoles(id)),
    dispatch(fetchUserFactors(id)),
  ]),
})
@connect((state, { params: { id } }) => ({
  user: getUser(state, id),
}), ({
  onUpdateUser,
  deleteUserRole,
  blockUser,
  unblockUser,
  deleteUserFactor,
  enableUserFactor,
  disableUserFactor,
  createUserFactor,
}))
export default class UserUpdatePage extends React.Component {
  render() {
    const {
      onDeleteUser = () => {},
      onUpdateUser = () => {},

      blockUser = () => {},
      unblockUser = () => {},

      deleteUserRole = () => {},
      deleteUserFactor = () => {},
      enableUserFactor = () => {},
      disableUserFactor = () => {},
      createUserFactor = () => {},

      user,
      params,
    } = this.props;
    return (
      <FormPageWrapper id="user-update-page" title="Деталі користувача" back="/users">
        <Helmet title="Деталі користувача" />
        <UserForm
          initialValues={user}
          update
          onDelete={onDeleteUser}
          onSubmit={values => onUpdateUser(values, user.id)}
        />
        <Line />

        <div className={styles.block}>
          <H1>Статус користувача:
            {user.is_blocked ?
              <ColoredText color="red">  заблокований</ColoredText> :
              <ColoredText color="green"> активний</ColoredText>}
          </H1>
          <UserBlockForm
            onBlockUser={blockUser}
            onUnblockUser={unblockUser}
            user={user}
          />
        </div>
        <Line />

        <div className={styles.block}>
          <UserRoles
            roles={user.roles}
            id={params.id}
            onDeleteUserRole={deleteUserRole}
          />
        </div>
        <Line />

        <div className={styles.block}>
          <UserFactors
            factors={user.factors || []}
            id={params.id}
            onDeleteUserFactor={deleteUserFactor}
            onEnableUserFactor={enableUserFactor}
            onDisableUserFactor={disableUserFactor}
            onCreateUserFactor={createUserFactor}
          />
        </div>
      </FormPageWrapper>
    );
  }
}
