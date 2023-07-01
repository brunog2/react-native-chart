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
import {BottomSheetMultiSelect} from '../BottomSheetMultiSelect';

interface ControlledMultiSelectProps {
  data: GenericObject[];
  title?: string;
  itemKey: string;
  labelKey: string;
  formControl: Control<any>;
  setValue: UseFormSetValue<any>;
  controllerName: string;
  defaultValue?: GenericObject[];
  rules?: RegisterOptions;
  formError?: any;
  singleSelect?: boolean;
  onValueChange?: (data: any[]) => void;
}

export const ControlledMultiSelect = forwardRef(
  (
    {
      singleSelect,
      data,
      itemKey,
      labelKey,
      controllerName,
      formControl,
      setValue,
      defaultValue,
      formError,
      rules,
      title,
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
                <BottomSheetMultiSelect
                  data={data}
                  title={title || ''}
                  value={value}
                  itemKey={itemKey}
                  labelKey={labelKey}
                  singleSelect={singleSelect}
                  onConfirm={data => {
                    onChange(data);
                    setVisible(false);
                    onValueChange && onValueChange(data);
                  }}
                  onDismiss={() => setVisible(false)}
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
