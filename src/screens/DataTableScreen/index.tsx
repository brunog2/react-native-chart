import React, {useEffect} from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Appbar, Checkbox, DataTable} from 'react-native-paper';
import {tableData} from '../../utils/mocks/table';

export const DataTableScreen = () => {
  const [data, setData] = React.useState(tableData);

  const handleItemPress = (index: number) => {
    setData(data =>
      data.map((item, itemIndex) => {
        if (index === itemIndex) {
          if (item.checked) {
            item.checked = !item.checked;
          } else {
            item.checked = true;
          }
        }
        return item;
      }),
    );
  };

  const handleSelectAll = () => {
    setData(data =>
      data.map(item => {
        item.checked = !isAllSelected;
        return item;
      }),
    );
  };

  const handleCancelSelect = () => {
    setData(data =>
      data.map(item => {
        item.checked = false;
        return item;
      }),
    );
  };

  const showAppBar = data.some(item => item.checked);
  const isAllSelected = data.every(item => item.checked);
  const headerTitle = `${data.filter(i => i.checked).length} selecionados`;

  return (
    <>
      {showAppBar && (
        <Appbar.Header>
          <Appbar.Action
            icon={isAllSelected ? 'checkbox-marked' : 'checkbox-blank-outline'}
            onPress={handleSelectAll}
          />
          <Appbar.Content title={headerTitle} />
          <Appbar.Action icon="pencil" onPress={() => {}} />
          <Appbar.Action icon="delete" onPress={() => {}} />
          <Appbar.Action icon="close" onPress={handleCancelSelect} />
        </Appbar.Header>
      )}
      <DataTable>
        <DataTable.Header>
          <DataTable.Title>
            <></>
          </DataTable.Title>
          <DataTable.Title>ID</DataTable.Title>
          <DataTable.Title>Name</DataTable.Title>
          <DataTable.Title>Age</DataTable.Title>
          <DataTable.Title>Has car?</DataTable.Title>
        </DataTable.Header>

        <FlatList
          data={tableData}
          renderItem={({item, index}) => (
            <>
              <DataTable.Row onPress={() => handleItemPress(index)}>
                <DataTable.Cell>
                  <Checkbox status={item.checked ? 'checked' : 'unchecked'} />
                </DataTable.Cell>
                <DataTable.Cell>{item.id}</DataTable.Cell>
                <DataTable.Cell>{item.name}</DataTable.Cell>
                <DataTable.Cell>{item.age}</DataTable.Cell>
                <DataTable.Cell>
                  {item.hasCar ? 'True' : 'False'}
                </DataTable.Cell>
              </DataTable.Row>
            </>
          )}
        />
      </DataTable>
    </>
  );
};
