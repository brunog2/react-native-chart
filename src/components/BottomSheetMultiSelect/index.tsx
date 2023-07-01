import React, {useEffect, useCallback, useState, useRef, useMemo} from 'react';
import {BackHandler} from 'react-native';
import {Button, Searchbar, Text} from 'react-native-paper';
import {GenericObject} from '../../types/GenericObjectType/genericObjectType';
import {Checkbox} from '../Checkbox';
import {
  BottomSheetBackdrop,
  BottomSheetFlatList,
  BottomSheetModal,
} from '@gorhom/bottom-sheet';
import {ContentView} from './styles';
import {useNavigation} from '@react-navigation/native';

interface MultiSelectProps {
  data: GenericObject[];
  title?: string;
  value?: GenericObject;
  singleSelect?: boolean;
  itemKey: string;
  labelKey: string;
  onConfirm?: (value: GenericObject) => void;
  onDismiss?: () => void;
}

export const BottomSheetMultiSelect = ({
  data,
  value,
  title,
  itemKey,
  labelKey,
  singleSelect,
  onDismiss,
  onConfirm,
}: MultiSelectProps) => {
  const [selectedData, setSelectedData] = useState<GenericObject[]>([]);

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
          (defaultItem: GenericObject) => defaultItem[itemKey] === i[itemKey],
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
    if (singleSelect) {
      bottomSheetModalRef.current?.close();
      onConfirm && onConfirm([item]);
      return;
    }
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
        type={!singleSelect ? 'android' : 'ios'}
      />
    );
  };

  const handleDismiss = useCallback(() => {
    console.log(`SETANDO VALOR ANTERIOR`, value);
    handleSelectedData();
    // setVisibleData(false);
    onDismiss && onDismiss();
  }, [value]);

  const handleConfirm = () => {
    onConfirm && onConfirm(selectedData.filter(i => i.status === 'checked'));
    bottomSheetModalRef.current?.close();
  };

  const selectAllStatus: any = selectedData.reduce((status, item) => {
    if (status === 'indeterminate') {
      return status;
    }

    if (status === 'checked' && item.status !== 'checked') {
      return 'indeterminate';
    }

    return item.status;
  }, 'unchecked');

  const handleCheckAll = () => {
    if (selectAllStatus === 'checked') {
      setSelectedData(prevData =>
        prevData.map(i => ({...i, status: 'unchecked'})),
      );
    } else {
      setSelectedData(prevData =>
        prevData.map(i => ({...i, status: 'checked'})),
      );
    }
  };

  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['65%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );
  // console.log('IS NONE CHECKED', isNoneChecked, selectAllStatus);
  return (
    <>
      <Button onPress={handlePresentModalPress} mode="contained">
        {title || 'Select bottom sheet items'}
      </Button>
      <BottomSheetModal
        ref={bottomSheetModalRef}
        backdropComponent={renderBackdrop}
        index={0}
        snapPoints={snapPoints}>
        <ContentView>
          <Text variant="titleMedium" style={{textAlign: 'center'}}>
            {title || `Selecione ${!singleSelect ? 'os itens' : 'o item'}`}
          </Text>
          {!singleSelect && (
            <>
              <Searchbar
                style={{margin: 12}}
                placeholder="Pesquise aqui"
                value="a"
              />
              <Checkbox
                label={'Selecionar todos'}
                status={selectAllStatus}
                onPress={handleCheckAll}
              />
            </>
          )}
          <BottomSheetFlatList
            data={selectedData}
            keyExtractor={i => data && i[itemKey]?.toString()}
            renderItem={({item}) => renderOptionItem(item, labelKey, itemKey)}
          />
          {!singleSelect && (
            <Button
              onPress={handleConfirm}
              mode="contained"
              style={{margin: 12}}>
              Confirmar
            </Button>
          )}
        </ContentView>
      </BottomSheetModal>
    </>
  );
};
