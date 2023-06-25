import React from 'react';
import {
  Control,
  Controller,
  RegisterOptions,
  UseFieldArrayUpdate,
} from 'react-hook-form';
import {HelperText, TextInput, TextInputProps} from 'react-native-paper';
import {TextInput as RNTextInput} from 'react-native';

interface InputProps extends TextInputProps {
  formControl: Control<any>;
  update?: UseFieldArrayUpdate<any>;
  controllerName: string;
  defaultValue?: string;
  rules?: RegisterOptions;
  formError?: any;
  fieldRef?: React.MutableRefObject<RNTextInput | null>;
}

export const MaterialTextInput = React.forwardRef(
  (
    {
      formControl,
      controllerName,
      rules,
      formError,
      defaultValue,
      fieldRef,
      ...props
    }: InputProps,
    ref,
  ) => {
    return (
      <>
        <Controller
          control={formControl}
          name={controllerName}
          rules={rules}
          defaultValue={defaultValue}
          render={({field: {value, onChange, onBlur}}) => (
            <TextInput
              {...props}
              ref={(e: RNTextInput | null) => {
                if (ref && typeof ref === 'function') {
                  ref(e);
                }
                if (fieldRef) fieldRef.current = e;
              }}
              value={value}
              defaultValue={defaultValue}
              onChangeText={onChange}
              onBlur={onBlur}
              error={formError}
            />
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
