import React from 'react';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';
import {MultiSelect} from '../../components/MultiSelect';
import {tableData} from '../../mocks/table';

export const FormScreen = () => {
  const {
    formState: {errors},
    control,
    handleSubmit,
    clearErrors,
  } = useForm({
    reValidateMode: 'onSubmit',
  });

  const onSubmit = (data: any) => {
    console.log(data);
  };
  return (
    <>
      <MultiSelect
        data={tableData}
        keyExtractor="id"
        labelKey="name"
        formControl={control}
        formError={errors.multiSelect}
        controllerName="multiSelect"
        rules={{
          required: 'Campo obrigatório',
          onChange(event: any) {
            clearErrors(event.target.name);
          },
        }}
      />
      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </>
  );
};
