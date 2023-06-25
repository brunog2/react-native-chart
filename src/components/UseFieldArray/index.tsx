import React, {forwardRef} from 'react';
import {
  Control,
  RegisterOptions,
  useFieldArray,
  useForm,
} from 'react-hook-form';
import {MaterialTextInput} from '../MaterialTextInput';

interface UseFieldArrayProps {
  formControl: Control<any>;
  controllerName: string;
  rules?: RegisterOptions;
  formError?: any;
}

export const UseFieldArray = forwardRef(
  (
    {formControl, controllerName, formError, rules}: UseFieldArrayProps,
    ref,
  ) => {
    const {
      register,
      formState: {errors},
    } = useForm();
    const {fields} = useFieldArray({
      control: formControl,
      name: controllerName,
    });

    return (
      <>
        {fields.map((field, index) => {
          const controllerName = `fields.${index}.value`;
          return (
            <MaterialTextInput
              formControl={formControl}
              controllerName={controllerName}
              {...register(`fields.${index}.value`)}
              formError={errors?.fields?.[index]?.value}
              rules={rules}
            />
          );
        })}
      </>
    );
  },
);
