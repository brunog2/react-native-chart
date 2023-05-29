import React, {useState, useEffect, useCallback} from 'react';
import {FlatList} from 'react-native';
import {Control, Controller, RegisterOptions} from 'react-hook-form';
import {
  Button,
  ButtonProps,
  Checkbox,
  Chip,
  Dialog,
  HelperText,
  Portal,
  TextInput,
} from 'react-native-paper';
import {MainView} from './styles';
import {GenericObject} from '../../types/GenericObjectType/genericObjectType';

interface MaterialMultiSelectProps extends ButtonProps {
  data: GenericObject[];
  keyExtractor: string;
  labelKey: string;
  formControl: Control<any>;
  controllerName: string;
  defaultValue?: GenericObject[];
  rules?: RegisterOptions;
  formError?: any;
}

export const MaterialMultiSelect = React.forwardRef(
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
      ...rest
    }: MaterialMultiSelectProps,
    ref,
  ) => {
    const [selectedItems, setSelectedItems] = useState<GenericObject[]>([]);
    const [showDialog, setShowDialog] = useState(false);
    const [search, setSearch] = useState('');

    const filterTherm = (filter: string) =>
      filter.toString().toLowerCase().includes(search);

    const isAllSelected = selectedItems && selectedItems.length === data.length;
    return (
      <>
        <Controller
          control={formControl}
          name={controllerName}
          rules={rules}
          defaultValue={defaultValue}
          render={({field: {value, onChange}}) => {
            useEffect(() => {
              defaultValue && setSelectedItems(defaultValue);
              onChange(defaultValue);
            }, [defaultValue]);

            const handleSelectAll = () => {
              if (isAllSelected) {
                setSelectedItems([]);
              } else {
                setSelectedItems(data);
              }
            };

            const handleItemPress = (identifier: any) => {
              const item = data.find(
                item => item[keyExtractor] === identifier,
              )!;
              let newItems = [...selectedItems];
              if (item && isItemSelected(identifier)) {
                newItems = newItems.filter(
                  item => item[keyExtractor] !== identifier,
                )!;
              } else {
                newItems.push(item);
              }

              setSelectedItems(newItems);
            };

            const removeItem = (identifier: any) => {
              const items = selectedItems.filter(
                item => item[keyExtractor] !== identifier,
              )!;
              setSelectedItems(items);
              onChange(items);
            };

            const handleSave = () => {
              onChange(selectedItems);
              setShowDialog(false);
            };

            const handleCancel = () => {
              onChange(value);
              setSelectedItems(value);
              setShowDialog(false);
            };

            const isItemSelected = (identifier: any) => {
              return selectedItems.some(
                item => item[keyExtractor] === identifier,
              );
            };

            return (
              <MainView>
                <Button
                  mode="outlined"
                  onPress={() => setShowDialog(true)}
                  {...rest}>
                  {rest.children}
                </Button>

                {value &&
                  value.slice(0, 3).map((i: GenericObject) => (
                    <Chip
                      selected
                      key={i[keyExtractor]}
                      style={{marginVertical: 5}}
                      closeIcon={'close'}
                      onClose={() => removeItem(i[keyExtractor])}
                      onPress={() => removeItem(i[keyExtractor])}>
                      {i[labelKey]}
                    </Chip>
                  ))}
                {value && value.length > 3 && (
                  <Chip style={{marginVertical: 5}}>...</Chip>
                )}

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
                      right={
                        <TextInput.Icon
                          icon={'close-circle-outline'}
                          onPress={() => setSearch('')}
                        />
                      }
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
                                  isItemSelected(item[keyExtractor])
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
