import React, {useEffect, useState} from 'react';
import {FlatList} from 'react-native';
import {Button} from 'react-native-paper';
import {tableData, TableDataInterface} from '../../mocks/table';
import {Checkbox} from '../Checkbox';

interface MultiCheckboxProps {
  onConfirm?: (items: TableDataInterface[]) => void;
}

export const MultiCheckbox = ({onConfirm}: MultiCheckboxProps) => {
  const [data, setData] = useState(tableData);

  const toggleTaskCompletion = (id: number) => {
    console.log('COMPLETION');
    setData(prevData => {
      return prevData.map(item => {
        if (item.id === id) {
          return {
            ...item,
            status: item.status === 'checked' ? 'unchecked' : 'checked',
          };
        }
        return item;
      });
    });
  };

  console.log('RENDER MULTI SELECT');

  const renderOptionItem = (item: TableDataInterface) => {
    return (
      <Checkbox
        key={item.id}
        label={item.name}
        status={item.status}
        onPress={() => toggleTaskCompletion(item.id)}
      />
    );
  };

  return (
    <>
      <Button onPress={() => onConfirm && onConfirm(tableData)}>
        Return data
      </Button>
      <FlatList
        data={data}
        extraData={data.map(item => item.status)} // Adicionado extraData
        renderItem={({item}) => renderOptionItem(item)}
      />
    </>
  );
};
