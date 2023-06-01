import React, {createRef, RefObject, useEffect, useRef, useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
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
import {MaterialTextInput} from '../../components/MaterialTextInput';
import {
  DataInterface,
  FormDataInterface,
} from '../../types/FormDataType/formDataType';
import {formData} from '../../mocks/formData';

interface DataProps {
  object: GenericObject;
  ref: RefObject<DropdownButtonMethodsProps>;
}

interface FormInterface {
  multiSelect: GenericObject[];
  dynamicInputs: FormDataInterface[];
  firstModuleInputs: DataInterface[];
  secondModuleInputs: DataInterface[];
}

export const FormScreen = () => {
  const {
    formState: {errors},
    control,
    handleSubmit,
    clearErrors,
    register,
    setValue,
    getValues,
  } = useForm<FormInterface>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      dynamicInputs: [{id: -1, name: '', value: ''}],
      firstModuleInputs: [{id: -1, name: '', value: ''}],
      secondModuleInputs: [{id: -1, name: '', value: ''}],
    },
  });
  const {fields, remove} = useFieldArray({control, name: 'dynamicInputs'});

  const [data, setData] = useState<DataProps[]>([]);
  const [fetchedData, setFetchedData] = useState(formData);

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

  const defaultRules = {
    required: 'Campo obrigatório',
    onChange(event: any) {
      clearErrors(event.target.name);
    },
  };

  enum ModuleOptions {
    main = 'dynamicInputs',
    firstModule = 'firstModuleInputs',
    secondModule = 'secondModuleInputs',
  }

  const handleSelectionChange = (
    data: FormDataInterface[],
    selectType: ModuleOptions,
  ) => {
    const dynamicInputsForm = data.map(
      (i): DataInterface => ({
        id: i.id,
        name: i.name,
        value: null,
      }),
    );
    setValue(selectType, dynamicInputsForm);
  };

  return (
    <MainView>
      <MaterialMultiSelect
        data={formData}
        keyExtractor="id"
        labelKey="name"
        formControl={control}
        formError={errors.multiSelect}
        controllerName="multiSelect"
        rules={defaultRules}
        onValueChange={items =>
          handleSelectionChange(items, ModuleOptions.main)
        }>
        Select
      </MaterialMultiSelect>

      {getValues('dynamicInputs')[0].id !== -1 &&
        fields.map((field, index) => {
          return (
            <>
              <Text variant="titleSmall">{fields[index].name || ''}</Text>
              <MaterialTextInput
                controllerName={`dynamicInputs.${index}.value`}
                formControl={control}
                {...register(`dynamicInputs.${index}.value`)}
                placeholder={fields[index].name || ''}
                formError={errors?.dynamicInputs?.[index]?.value}
                rules={defaultRules}
              />
            </>
          );
        })}

      {getValues('dynamicInputs')[0].id !== -1 &&
        getValues('dynamicInputs').map((item, index) => {
          return (
            <>
              <MaterialMultiSelect
                data={
                  fetchedData.find(
                    i => i.id === getValues('dynamicInputs')[index].id,
                  )?.firstModule!
                }
                keyExtractor="id"
                labelKey="name"
                formControl={control}
                formError={errors.multiSelect}
                controllerName="firstModule"
                rules={defaultRules}
                onValueChange={items =>
                  handleSelectionChange(items, ModuleOptions.main)
                }>
                Select
              </MaterialMultiSelect>
            </>
          );
        })}

      {data.map(i => (
        <DropdownButton
          ref={i.ref}
          title={i.object.name}
          style={{marginVertical: 10}}>
          <>
            <Text>{i.object.name}</Text>
            <Button onPress={() => i.ref.current?.handleShow()} mode="outlined">
              Change Mode
            </Button>
          </>
        </DropdownButton>
      ))}

      <Button
        mode="contained-tonal"
        onPress={handleSubmit(form => console.log(form))}>
        Submit
      </Button>
    </MainView>
  );
};
