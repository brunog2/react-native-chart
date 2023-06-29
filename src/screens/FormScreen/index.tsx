import React, {createRef, RefObject, useEffect, useRef, useState} from 'react';
import {useFieldArray, useForm} from 'react-hook-form';
import {Button, Surface, Text, TouchableRipple} from 'react-native-paper';
import {Checkbox} from '../../components/Checkbox';
import {
  DropdownButton,
  DropdownButtonMethodsProps,
} from '../../components/DropdownButton';
import {MaterialMultiSelect} from '../../components/MaterialMultiSelect';
import {tableData, TableDataInterface} from '../../mocks/table';
import {GenericObject} from '../../types/GenericObjectType/genericObjectType';
import {MainView} from './styles';
import {MaterialTextInput} from '../../components/MaterialTextInput';
import {
  DataInterface,
  FormDataInterface,
} from '../../types/FormDataType/formDataType';
import {formData} from '../../mocks/formData';
import {MultiSelect} from '../../components/MultiSelect';
import {ControlledMultiSelect} from '../../components/ControlledMultiSelect';
import {Dimensions, View} from 'react-native';
import {BarChart} from 'react-native-chart-kit';
import {AbstractChartConfig} from 'react-native-chart-kit/dist/AbstractChart';
import {BottomSheetMultiSelect} from '../../components/BottomSheetMultiSelect';

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
  } = useForm<any>({
    reValidateMode: 'onSubmit',
    defaultValues: {
      multiSelect: [],
    },
  });
  const {fields, append, remove} = useFieldArray({
    control,
    keyName: 'uuid',
    name: 'dynamicInputs',
  });

  // const [data, setData] = useState<DataProps[]>([]);
  // const [fetchedData, setFetchedData] = useState(formData);

  // useEffect(() => {
  //   const mock = [{name: 1}, {name: 2}, {name: 3}];
  //   const newData = mock.map(i => ({
  //     object: i,
  //     ref: createRef<DropdownButtonMethodsProps>(),
  //   }));

  //   setData(newData);
  // }, []);

  // const ref = useRef<DropdownButtonMethodsProps>(null);

  // console.log('Render FormScreen');

  const defaultRules = {
    required: 'Campo obrigatório',
    onChange(event: any) {
      clearErrors(event.target.name);
    },
  };

  // enum ModuleOptions {
  //   main = 'dynamicInputs',
  //   firstModule = 'firstModuleInputs',
  //   secondModule = 'secondModuleInputs',
  // }

  // const handleSelectionChange = (
  //   data: FormDataInterface[],
  //   selectType: ModuleOptions,
  // ) => {
  //   const dynamicInputsForm = data.map(
  //     (i): DataInterface => ({
  //       id: i.id,
  //       name: i.name,
  //       value: null,
  //     }),
  //   );
  //   setValue(selectType, dynamicInputsForm);
  // };

  const handleSelectValueChange = (items: TableDataInterface[]) => {
    console.log('VALUE CHANGES', items);
    const itemsToRemove = fields.filter(
      field => !items.some(item => item.id === field.id),
    );
    const itemsToAppend = items.filter(
      item => !fields.some(field => field.id === item.id),
    );

    console.log('Fields', getValues('dynamicInputs'));
    console.log('Items to append', itemsToAppend);
    console.log('Items to remove', itemsToRemove);
    let indexToRemove = [];
    for (const itemToRemove of itemsToRemove) {
      const index = fields.findIndex(item => item.id === itemToRemove.id);
      indexToRemove.push(index);
    }
    remove(indexToRemove);
    for (const itemToAppend of itemsToAppend) {
      const field = {
        ...itemToAppend,
        status: itemToAppend.status || 'unchecked',
        value: '',
      };
      append(field);
    }
    console.log('Fields', getValues('dynamicInputs'));
  };

  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  const chartConfig: AbstractChartConfig = {
    backgroundGradientFrom: '#0c00ad',
    backgroundGradientFromOpacity: 1,
    backgroundGradientTo: '#200079',
    backgroundGradientToOpacity: 1,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
    strokeWidth: 2, // optional, default 3
    barPercentage: 0.5,
    useShadowColorFromDataset: false, // optional,
  };
  const screenWidth = Dimensions.get('window').width;

  return (
    <MainView>
      {/* <MaterialMultiSelect
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
      </MaterialMultiSelect> */}

      <ControlledMultiSelect
        data={tableData}
        itemKey="id"
        setValue={setValue}
        labelKey="name"
        formControl={control}
        formError={errors.multiSelect}
        controllerName="multiSelect"
        rules={defaultRules}
        onValueChange={handleSelectValueChange}
        singleSelect
      />

      <BarChart
        yAxisSuffix="M"
        style={{borderRadius: 5}}
        data={data}
        width={screenWidth}
        height={220}
        yAxisLabel="$"
        chartConfig={chartConfig}
        verticalLabelRotation={30}
      />

      {getValues('dynamicInputs') &&
        getValues('dynamicInputs')?.length > 0 &&
        fields.map((field, index) => {
          return (
            <View key={field.uuid}>
              <Text variant="titleSmall">{fields[index]?.name || ''}</Text>
              <MaterialTextInput
                controllerName={`dynamicInputs.${index}.value`}
                formControl={control}
                defaultValue={''}
                {...register(`dynamicInputs.${index}.value`)}
                placeholder={fields[index].name || ''}
                formError={errors?.dynamicInputs?.[index]?.value}
                rules={defaultRules}
              />
            </View>
          );
        })}

      {/* {getValues('dynamicInputs')[0].id !== -1 &&
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
        })} */}

      {/* {data.map(i => (
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
      ))} */}

      <Button
        mode="contained-tonal"
        onPress={handleSubmit(form => console.log(form))}>
        Submit
      </Button>
    </MainView>
  );
};
