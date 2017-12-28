import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import classnames from 'classnames';
import { Link } from 'react-router';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';

import NavItem from '@components/NavItem';
import Icon from '@components/Icon';
import { logoutAndRedirect } from './redux';

import styles from './styles.scss';

@withStyles(styles)
@translate()
@connect(state => ({
  location: state.routing,
}), { logoutAndRedirect })
export default class Nav extends React.Component {
  componentWillReceiveProps(props) {
    if (props.isOpen) {
      document.documentElement.classList.add(styles.navIsOpen);
    } else {
      document.documentElement.classList.remove(styles.navIsOpen);
    }
  }
  render() {
    const { isOpen, t, logoutAndRedirect } = this.props;

    return (
      <nav className={classnames(styles.nav, isOpen && styles.open)}>
        <ul>
          <NavItem to="tokens" activeClassName={styles.active}>
            <Link id="tokens-nav" to="/tokens">{ t('Tokens') }</Link>
          </NavItem>
          <NavItem to="approvals" activeClassName={styles.active}>
            <Link id="approvals-nav" to="/approvals">{ t('Approvals') }</Link>
          </NavItem>
          <NavItem to="users" activeClassName={styles.active}>
            <Link id="users-nav" to="/users">{ t('Users') }</Link>
          </NavItem>
          <NavItem to="roles" activeClassName={styles.active}>
            <Link id="roles-nav" to="/roles">{ t('Roles') }</Link>
          </NavItem>
          <NavItem to="client_types" activeClassName={styles.active}>
            <Link id="client_types-nav" to="/client_types">{ t('Client Types') }</Link>
          </NavItem>
          <NavItem to="clients" activeClassName={styles.active}>
            <Link id="clients-nav" to="/clients">{ t('Clients') }</Link>
          </NavItem>
        </ul>
        <ul className={styles.down}>
          <li>
            <a href="http://docs.mithril1.apiary.io" rel="noopener noreferrer" target="_blank">
              <Icon name="doc" />
              { t('Documentation') }
            </a>
          </li>
        </ul>
        <ul className={styles.down}>
          <li>
            <button onClick={() => logoutAndRedirect()}>
              { t('Logout') }
            </button>
          </li>
        </ul>
      </nav>
    );
  }
}
