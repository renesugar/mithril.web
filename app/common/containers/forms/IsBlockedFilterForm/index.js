import React from 'react';
import { reduxForm } from 'redux-form';
import Select from 'components/Select';

@reduxForm({
  form: 'is-blocked-filter-form',
})
export default class IsBlockedFilterForm extends React.Component {
  render() {
    const { onChange = () => {}, active = null } = this.props;
    return (
      <div>
        <form>
          <Select
            name="is_blocked"
            placeholder="Оберіть один із варіантів"
            active={active}
            options={[
              { title: 'Заблокований', name: true },
              { title: 'Не заблокований', name: false },
            ]}
            onChange={active => onChange(active)}
            component={Select}
            labelText="Заблокований / Не заблокований"
            type="text"
          />
        </form>
      </div>
    );
  }
}
