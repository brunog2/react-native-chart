import React from 'react';
import {Controller, useForm} from 'react-hook-form';
import {
  Checkbox as MaterialCheckbox,
  CheckboxItemProps,
} from 'react-native-paper';

export const Checkbox = ({label}: {label: string}) => {
  const {control} = useForm();

  return (
    <Controller
      name="checkbox"
      control={control}
      render={({field: {value, onChange}}) => {
        console.log('render checkbox');
        return (
          <MaterialCheckbox.Item
            status={value ? 'checked' : 'unchecked'}
            onPress={() => onChange(!value)}
            label={label}
          />
        );
      }}
    />
  );
};
