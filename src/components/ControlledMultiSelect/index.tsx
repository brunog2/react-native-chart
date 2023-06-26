import React, {forwardRef, useState, useEffect, useRef} from 'react';
import {
  Control,
  Controller,
  RegisterOptions,
  UseFormSetValue,
} from 'react-hook-form';
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
  setValue: UseFormSetValue<any>;
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
      setValue,
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
          render={({field: {value, onChange}}) => {
            const isFirstRun = useRef(true);

            useEffect(() => {
              if (
                isFirstRun.current &&
                defaultValue &&
                (!value || value.length === 0)
              ) {
                setValue(controllerName, defaultValue);
                onValueChange && onValueChange(defaultValue);
                isFirstRun.current = false;
              }
            }, [onValueChange, controllerName, defaultValue, formControl]);
            return (
              <>
                <Button onPress={() => setVisible(true)} mode="outlined">
                  {children}
                </Button>
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
            );
          }}
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
