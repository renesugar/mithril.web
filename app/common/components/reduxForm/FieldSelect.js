import React from 'react';
import Select from 'components/Select';

import FieldInput from '@components/reduxForm/FieldInput';

const FieldSelect = props => (
  <FieldInput component={Select} {...props} />
);

export default FieldSelect;
