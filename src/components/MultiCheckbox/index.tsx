import React from 'react';
import {FlatList} from 'react-native';
import {tableData} from '../../mocks/table';
import {Checkbox} from '../Checkbox';

export const MultiCheckbox = () => {
  console.log('render multi selet');
  return (
    <FlatList
      data={tableData}
      renderItem={({item, index}) => <Checkbox key={index} label={item.name} />}
    />
  );
};
