import React, {useEffect, useCallback, useState} from 'react';
import {FlatList} from 'react-native';
import {Button, Dialog, Portal} from 'react-native-paper';
import {tableData, TableDataInterface} from '../../mocks/table';
import {GenericObject} from '../../types/GenericObjectType/genericObjectType';
import {Checkbox} from '../Checkbox';
import {SelectedItemsView} from '../MaterialMultiSelect/styles';

interface MultiSelectProps {
  data: GenericObject[];
  defaultSelectedData?: GenericObject[];
  itemKey: string;
  labelKey: string;
  title?: string;
  visible: boolean;
  onConfirm?: (items: GenericObject[]) => void;
  onDismiss?: () => void;
}

export const MultiSelect = ({
  data,
  defaultSelectedData,
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

  useEffect(() => {
    if (!defaultSelectedData && data) {
      const initialData = data.map((i: GenericObject) => ({
        ...i,
        status: 'unchecked',
      }));

      setSelectedData(initialData);
    }
    if (defaultSelectedData && data) {
      const initialData = data.map((i: GenericObject) => {
        const isDefaultItem = defaultSelectedData.some(
          defaultItem => defaultItem[itemKey] === i[itemKey],
        );

        if (isDefaultItem) {
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
  }, [data, defaultSelectedData]);

  const toggleTaskCompletion = (item: GenericObject, itemKey: string) => {
    console.log('COMPLETION', item, itemKey);
    if (selectedData.length > 0) {
      setSelectedData(prevData => {
        return prevData.map(i => {
          if (item[itemKey] === i[itemKey]) {
            console.log('THE ITEM CHANGES', i);
            return {
              ...i,
              status: i.status === 'checked' ? 'unchecked' : 'checked',
            };
          }
          return i;
        });
      });
    } else {
      console.log('setting item', [{...item, status: 'checked'}]);
      setSelectedData([{...item, status: 'checked'}]);
    }
  };

  console.log('RENDER MULTI SELECT');

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
    setVisibleData(false);
    onDismiss && onDismiss();
  }, []);

  const handleConfirm = () =>
    onConfirm && onConfirm(selectedData.filter(i => i.status === 'checked'));

  return (
    <Portal>
      <Dialog
        visible={visibleData}
        onDismiss={handleDismiss}
        style={{maxHeight: '60%'}}>
        <Dialog.Title>{title || 'Selecione os itens'}</Dialog.Title>

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
