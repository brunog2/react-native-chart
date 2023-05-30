import React, {createRef, RefObject, useEffect, useRef, useState} from 'react';
import {useForm} from 'react-hook-form';
import {Button, Surface, Text, TouchableRipple} from 'react-native-paper';
import {Checkbox} from '../../components/Checkbox';
import {
  DropdownButton,
  DropdownButtonMethodsProps,
} from '../../components/DropdownButton';
import {MaterialMultiSelect} from '../../components/MaterialMultiSelect';
import {tableData} from '../../mocks/table';
import {GenericObject} from '../../types/GenericObjectType/genericObjectType';
import {MainView} from './styles';

interface DataProps {
  object: GenericObject;
  ref: RefObject<DropdownButtonMethodsProps>;
}

export const FormScreen = () => {
  const {
    formState: {errors},
    control,
    handleSubmit,
    clearErrors,
  } = useForm({
    reValidateMode: 'onSubmit',
  });

  const [data, setData] = useState<DataProps[]>([]);

  useEffect(() => {
    const mock = [{name: 1}, {name: 2}, {name: 3}];
    const newData = mock.map(i => ({
      object: i,
      ref: createRef<DropdownButtonMethodsProps>(),
    }));

    setData(newData);
  }, []);

  const ref = useRef<DropdownButtonMethodsProps>(null);

  console.log('Render FormScreen');

  return (
    <MainView>
      <MaterialMultiSelect
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
        }}>
        Select
      </MaterialMultiSelect>
      <Checkbox label="Check" />

      <Button
        onPress={() => data.map(i => i.ref.current?.handleShow())}
        mode="outlined">
        Change Mode
      </Button>

      {data.map(i => (
        <DropdownButton ref={i.ref} title={i.object.name}>
          <>
            <Text>{i.object.name}</Text>
            <Button onPress={() => i.ref.current?.handleShow()} mode="outlined">
              Change Mode
            </Button>
          </>
        </DropdownButton>
      ))}
    </MainView>
  );
};
