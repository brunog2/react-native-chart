import React, {useEffect, useCallback, useState} from 'react';
import {FlatList} from 'react-native';
import {Button, Dialog, Portal} from 'react-native-paper';
import {tableData, TableDataInterface} from '../../mocks/table';
import {GenericObject} from '../../types/GenericObjectType/genericObjectType';
import {Checkbox} from '../Checkbox';
import {SelectedItemsView} from '../MaterialMultiSelect/styles';

interface MultiSelectProps {
  data: GenericObject[];
  value?: GenericObject[];
  itemKey: string;
  labelKey: string;
  title?: string;
  visible: boolean;
  onConfirm?: (items: GenericObject[]) => void;
  onDismiss?: () => void;
}

export const MultiSelect = ({
  data,
  value,
  title,
  itemKey,
  labelKey,
  visible,
  onDismiss,
  onConfirm,
}: MultiSelectProps) => {
  const [selectedData, setSelectedData] = useState<GenericObject[]>([]);
  const [visibleData, setVisibleData] = useState(false);

  useEffect(() => {
    setVisibleData(visible);
  }, [visible]);

  const handleSelectedData = useCallback(() => {
    if (!value && data) {
      const initialData = data.map((i: GenericObject) => ({
        ...i,
        status: 'unchecked',
      }));

      setSelectedData(initialData);
    }
    if (value && data) {
      // console.log('VALOR', value);
      const initialData = data.map((i: GenericObject) => {
        const isDefaultItem = value.some(
          defaultItem => defaultItem[itemKey] === i[itemKey],
        );

        if (isDefaultItem) {
          // console.log('É DEFAULT ITEM', value);
          return {
            ...i,
            status: 'checked',
          };
        }
        return {
          ...i,
          status: 'unchecked',
        };
      });

      setSelectedData(initialData);
    }
  }, [data, value]);

  useEffect(() => {
    handleSelectedData();
  }, [data, value]);

  const toggleTaskCompletion = (item: GenericObject, itemKey: string) => {
    // console.log('COMPLETION', item, itemKey);
    if (selectedData.length > 0) {
      setSelectedData(prevData => {
        return prevData.map(i => {
          if (item[itemKey] === i[itemKey]) {
            // console.log('THE ITEM CHANGES', i);
            return {
              ...i,
              status: i.status === 'checked' ? 'unchecked' : 'checked',
            };
          }
          return i;
        });
      });
    } else {
      // console.log('setting item', [{...item, status: 'checked'}]);
      setSelectedData([{...item, status: 'checked'}]);
    }
  };

  // console.log('RENDER MULTI SELECT');

  const renderOptionItem = (
    item: GenericObject,
    labelKey: string,
    itemKey: string,
  ) => {
    return (
      <Checkbox
        label={item[labelKey]?.toString()}
        status={item.status}
        onPress={() => toggleTaskCompletion(item, itemKey)}
      />
    );
  };

  const handleDismiss = useCallback(() => {
    console.log(`SETANDO VALOR ANTERIOR`, value);
    handleSelectedData();
    // setVisibleData(false);
    onDismiss && onDismiss();
  }, [value]);

  const handleConfirm = () =>
    onConfirm && onConfirm(selectedData.filter(i => i.status === 'checked'));

  let isAllChecked = selectedData.every(i => i.status === 'checked');
  let isSomeChecked = selectedData.some(i => i.status === 'checked');

  const selectAllStatus = isAllChecked
    ? 'checked'
    : isSomeChecked
    ? 'indeterminate'
    : 'unchecked';

  const handleCheckAll = () => {
    if (isAllChecked) {
      setSelectedData(prevData =>
        prevData.map(i => ({...i, status: 'unchecked'})),
      );
    } else {
      setSelectedData(prevData =>
        prevData.map(i => ({...i, status: 'checked'})),
      );
    }
  };

  // console.log('IS NONE CHECKED', isNoneChecked, selectAllStatus);
  return (
    <Portal>
      <Dialog
        visible={visibleData}
        onDismiss={handleDismiss}
        style={{maxHeight: '60%'}}>
        <Dialog.Title>{title || 'Selecione os itens'}</Dialog.Title>
        <Dialog.Content>
          <Checkbox
            label={'Selecionar todos'}
            status={selectAllStatus}
            onPress={handleCheckAll}
          />
        </Dialog.Content>
        <Dialog.ScrollArea>
          <FlatList
            data={selectedData}
            keyExtractor={i => data && i[itemKey]?.toString()}
            renderItem={({item}) => renderOptionItem(item, labelKey, itemKey)}
          />
        </Dialog.ScrollArea>

        <Dialog.Actions>
          <Button onPress={handleDismiss}>Cancelar</Button>
          <Button onPress={handleConfirm}>Ok</Button>
        </Dialog.Actions>
      </Dialog>
    </Portal>
  );
};
