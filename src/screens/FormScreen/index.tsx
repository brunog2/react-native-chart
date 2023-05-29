import React from 'react';
import {useForm} from 'react-hook-form';
import {Button} from 'react-native-paper';
import {MaterialMultiSelect} from '../../components/MaterialMultiSelect';
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
      <MaterialMultiSelect
        data={tableData}
        defaultValue={[tableData[0]]}
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
        }}>
        Select
      </MaterialMultiSelect>
      <Button mode="contained" onPress={handleSubmit(onSubmit)}>
        Submit
      </Button>
    </>
  );
};
