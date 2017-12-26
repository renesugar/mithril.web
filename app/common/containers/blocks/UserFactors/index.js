import React from 'react';
import { connect } from 'react-redux';
import { push } from 'react-router-redux';
import withStyles from 'nebo15-isomorphic-style-loader/lib/withStyles';
import { format } from 'helpers/date';

import { H1 } from '@components/Title';
import Table from '@components/Table';
import Button, { ButtonsGroup } from '@components/Button';
import { Confirm } from '@components/Popup';

import ColoredText from 'components/ColoredText';

import styles from './styles.scss';

@withStyles(styles)
@connect(null, { push })
export default class UserFactors extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      onDelete: false,
      onEnable: false,
      onCreate: false,
      factorId: null,
    };
    this.toggleFactor = this.toggleFactor.bind(this);
  }

  get currentFactor() {
    const { factors = [] } = this.props;
    const { factorId } = this.state;

    return factors.find(({ id }) => id === factorId);
  }

  async toggleFactor() {
    const { id, onDisableUserFactor, onEnableUserFactor, push } = this.props;
    const { factorId } = this.state;

    this.setState({ onEnable: false });

    if (this.currentFactor.is_active) {
      await onDisableUserFactor(id, factorId);
    } else {
      await onEnableUserFactor(id, factorId);
    }

    return push(`/users/${id}`);
  }

  renderTable() {
    const { factors = [] } = this.props;
    return (<div>
      <div id="users-factors-table" className={styles.table}>
        <Table
          columns={[
            { key: 'type', title: 'Назва фактору' },
            { key: 'factor', title: 'Значення' },
            { key: 'is_active', title: 'Статус' },
            { key: 'updated_at', title: 'Оновлено' },
            { key: 'actions', title: 'Дії', width: '250' },
          ]}
          data={factors.map(({ id, type, is_active, factor, updated_at }) => ({
            type,
            factor: factor || 'Фактор відсутній',
            is_active: is_active ?
              <ColoredText color="green">Активний</ColoredText> :
              <ColoredText color="red">Неактивний</ColoredText>,
            updated_at: format(updated_at, 'DD.MM.YYYY HH:MM'),
            actions: <ButtonsGroup>
              {
                is_active && <Button
                  id={`user-factor-delete-button-${id}`}
                  size="small"
                  color="red"
                  theme="border"
                  onClick={() => this.setState({
                    onDelete: true,
                    factorId: id,
                  })}
                >
                  Скинути фактор
                </Button>
              }
              <Button
                id={`user-factor-delete-button-${id}`}
                size="small"
                color="orange"
                theme="border"
                onClick={() => this.setState({
                  onEnable: true,
                  factorId: id,
                })}
              >
                {is_active ? 'Деактивувати фактор' : 'Активувати фактор'}
              </Button>
            </ButtonsGroup>,
          }))}
        />
      </div>
      {
        factors.length === 0 && (
          <div className={styles.block}>
            <Button
              onClick={() =>
                this.setState({ onCreate: true })}
            >Створити фактор</Button>
          </div>
        )
      }
    </div>);
  }

  renderConfirmEnable() {
    return (
      <Confirm
        title="Підтвердити дію"
        active={this.state.onEnable}
        theme="error"
        confirm="Ok"
        id="confirm-delete"
        onCancel={() => this.setState({ onEnable: false })}
        onConfirm={() => this.toggleFactor()}
      >Ви впевнені, що хочете&nbsp;
        {this.currentFactor && this.currentFactor.is_active ?
            'деактивувати' : 'активувати'
        }
        &nbsp;фактор
      </Confirm>
    );
  }

  renderConfirmDelete() {
    const {
      id,
      push,
      onDeleteUserFactor = () => {},
    } = this.props;
    return (
      <Confirm
        title="Підтвердити дію"
        active={this.state.onDelete}
        theme="error"
        confirm="Ok"
        id="confirm-active"
        onCancel={() => this.setState({ onDelete: false })}
        onConfirm={() => {
          this.setState({ onDelete: false });
          return onDeleteUserFactor(id, this.state.factorId)
            .then(() => push(`/users/${id}`));
        }}
      >Ви впевнені, що хочете cкинути фактор</Confirm>
    );
  }

  renderConfirmCreate() {
    const {
      id,
      push,
      onCreateUserFactor = () => {},
    }
      = this.props;
    return (
      <Confirm
        title="Підтвердити дію"
        active={this.state.onCreate}
        theme="error"
        confirm="Ok"
        id="confirm-create"
        onCancel={() => this.setState({ onCreate: false })}
        onConfirm={() => {
          this.setState({ onCreate: false });
          return onCreateUserFactor(id)
            .then(() => push(`/users/${id}`));
        }}
      >Ви впевнені, що хочете створити фактор з типом <b>SMS</b></Confirm>
    );
  }

  render() {
    return (
      <div id="users-factors">
        <H1>Фактори аутентифікації користувача</H1>
        {this.renderTable()}
        {this.renderConfirmEnable()}
        {this.renderConfirmDelete()}
        {this.renderConfirmCreate()}
      </div>
    );
  }
}
