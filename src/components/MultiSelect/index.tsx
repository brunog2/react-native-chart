import React, {useState, useEffect, useCallback} from 'react';
import {FlatList} from 'react-native';
import {Control, Controller, RegisterOptions} from 'react-hook-form';
import {
  Button,
  Checkbox,
  Chip,
  Dialog,
  HelperText,
  Portal,
  TextInput,
} from 'react-native-paper';
import {MainView} from './styles';
import {GenericObject} from '../../types/GenericObjectType/genericObjectType';

interface MultiSelectProps {
  data: GenericObject[];
  keyExtractor: string;
  labelKey: string;
  formControl: Control<any>;
  controllerName: string;
  defaultValue?: GenericObject[];
  rules?: RegisterOptions;
  formError?: any;
}

export const MultiSelect = React.forwardRef(
  (
    {
      data,
      keyExtractor,
      labelKey,
      formControl,
      controllerName,
      defaultValue,
      rules,
      formError,
    }: MultiSelectProps,
    ref,
  ) => {
    const [selectedItems, setSelectedItems] = useState<GenericObject[]>([]);
    const [showDialog, setShowDialog] = useState(false);
    const [search, setSearch] = useState('');

    const filterTherm = (filter: string) =>
      filter.toString().toLowerCase().includes(search);

    const isAllSelected = selectedItems.length === data.length;

    return (
      <>
        <Controller
          control={formControl}
          name={controllerName}
          rules={rules}
          defaultValue={defaultValue}
          render={({field: {value, onChange, onBlur}}) => {
            const handleSelectAll = () => {
              if (isAllSelected) {
                setSelectedItems([]);
              } else {
                setSelectedItems(data);
              }
            };

            const handleItemPress = (value: any) => {
              setSelectedItems(items => {
                const item = data.find(item => item[keyExtractor] === value)!;

                if (item && selectedItems.includes(item)) {
                  items.splice(items.indexOf(item), 1);
                  return items;
                } else {
                  items.push(item);
                  return items;
                }
              });
            };

            const handleSave = () => {
              onChange(selectedItems);
              console.log('O VALOR AGORA', value);
              setShowDialog(false);
            };

            const handleCancel = () => {
              setShowDialog(false);
            };

            const removeItem = (value: any) => {
              const item = selectedItems.find(
                item => item[keyExtractor] === value,
              )!;
              const items = selectedItems.slice(selectedItems.indexOf(item), 1);
              setSelectedItems(items);
              onChange(items);
            };

            return (
              <MainView>
                <Button mode="outlined" onPress={() => setShowDialog(true)}>
                  Open Multi Select
                </Button>

                {value &&
                  value
                    ?.filter((i: GenericObject) => i.checked)
                    .map((i: GenericObject) => (
                      <Chip
                        style={{marginVertical: 5}}
                        icon={'close'}
                        onPress={() => removeItem(i[keyExtractor])}>
                        {i[labelKey]}
                      </Chip>
                    ))}

                <Portal>
                  <Dialog visible={showDialog}>
                    <Dialog.Title>Selecione os itens</Dialog.Title>
                    <TextInput
                      style={{
                        marginBottom: 15,
                        alignSelf: 'center',
                        width: '85%',
                      }}
                      label="Pesquisar"
                      value={search}
                      onChangeText={search => setSearch(search)}
                    />
                    <Dialog.ScrollArea style={{maxHeight: '60%'}}>
                      <Checkbox.Item
                        label="Selecionar tudo"
                        status={isAllSelected ? 'checked' : 'unchecked'}
                        onPress={handleSelectAll}
                      />
                      <FlatList
                        data={data}
                        keyExtractor={i => i[keyExtractor].toString()}
                        renderItem={({item}) => {
                          if (filterTherm(item[labelKey])) {
                            return (
                              <Checkbox.Item
                                label={item[labelKey].toString()}
                                status={
                                  selectedItems.includes(item)
                                    ? 'checked'
                                    : 'unchecked'
                                }
                                onPress={() =>
                                  handleItemPress(item[keyExtractor])
                                }
                              />
                            );
                          }
                          return <></>;
                        }}
                      />
                    </Dialog.ScrollArea>
                    <Dialog.Actions>
                      <Button onPress={handleCancel}>Cancel</Button>
                      <Button onPress={handleSave}>Ok</Button>
                    </Dialog.Actions>
                  </Dialog>
                </Portal>
              </MainView>
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
