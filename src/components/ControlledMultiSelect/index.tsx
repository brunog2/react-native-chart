import React, {forwardRef, useState} from 'react';
import {Control, Controller, RegisterOptions} from 'react-hook-form';
import {Button, HelperText} from 'react-native-paper';
import {GenericObject} from '../../types/GenericObjectType/genericObjectType';
import {MaterialMultiSelect} from '../MaterialMultiSelect';
import {MultiSelect} from '../MultiSelect';

interface ControlledMultiSelectProps {
  children: React.ReactNode;
  data: GenericObject[];
  itemKey: string;
  labelKey: string;
  formControl: Control<any>;
  controllerName: string;
  defaultValue?: GenericObject[];
  rules?: RegisterOptions;
  formError?: any;
  onValueChange?: (data: any[]) => void;
}

export const ControlledMultiSelect = forwardRef(
  (
    {
      children,
      data,
      itemKey,
      labelKey,
      controllerName,
      formControl,
      defaultValue,
      formError,
      rules,
      onValueChange,
    }: ControlledMultiSelectProps,
    ref,
  ) => {
    const [visible, setVisible] = useState(false);

    return (
      <>
        <Controller
          name={controllerName}
          control={formControl}
          defaultValue={defaultValue}
          rules={rules}
          render={({field: {value, onChange}}) => (
            <>
              <Button onPress={() => setVisible(true)}>{children}</Button>
              <MultiSelect
                data={data}
                value={value}
                itemKey={itemKey}
                labelKey={labelKey}
                onConfirm={data => {
                  onChange(data);
                  setVisible(false);
                  onValueChange && onValueChange(data);
                }}
                onDismiss={() => setVisible(false)}
                visible={visible}
              />
            </>
          )}
        />
        <HelperText
          type="error"
          visible={formError}
          style={{alignSelf: 'flex-start'}}>
          {formError?.message}
        </HelperText>
      </>
    );
  },
);
