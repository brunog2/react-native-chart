import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Checkbox as MaterialCheckbox,
  CheckboxItemProps,
} from 'react-native-paper';

export const Checkbox = ({label}: {label: string}) => {
  const [status, setStatus] = React.useState<
    'unchecked' | 'checked' | 'indeterminate'
  >('unchecked');

  console.log('RENDER INTERNAL CHECKBOX');

  return (
    <MaterialCheckbox.Item
      status={status}
      onPress={() =>
        setStatus(status => (status === 'checked' ? 'unchecked' : 'checked'))
      }
      label={label}
    />
  );
};
