import React from 'react';
import { Link } from 'react-router';
import classnames from 'classnames';
import withStyles from 'withStyles';

import Icon from '@components/Icon';

import styles from './styles.scss';

export default withStyles(styles)(({ location, after = null, before = null, more }) => (
  <div className={styles.paging}>
    <div
      className={classnames(styles.paging__item, !before && styles.paging__item_disabled)}
    >
      <Link
        to={{
          pathname: location.pathname,
          query: { ...location.query, ending_before: before, starting_after: undefined },
        }}
      >
        <Icon name="arrow-left" />
      </Link>
    </div>
    <div
      className={classnames(styles.paging__item, (!more || !after) && styles.paging__item_disabled)}
    >
      <Link
        to={{
          pathname: location.pathname,
          query: { ...location.query, starting_after: after, ending_before: undefined },
        }}
      >
        <Icon name="arrow-right" />
      </Link>
    </div>
  </div>
));
