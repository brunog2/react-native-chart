import React from 'react';
import {FlatList} from 'react-native-gesture-handler';
import {Appbar, Checkbox, DataTable} from 'react-native-paper';
import {tableData} from '../../utils/mocks/table';
import Animated, {
  BounceInDown,
  SlideInDown,
  SlideInUp,
} from 'react-native-reanimated';

const numberOfItemsPerPageList = [2, 3, 4];

export const DataTableScreen = () => {
  const [data, setData] = React.useState(tableData);
  const [page, setPage] = React.useState(0);
  const [numberOfItemsPerPage, onItemsPerPageChange] = React.useState(
    numberOfItemsPerPageList[0],
  );
  const from = page * numberOfItemsPerPage;
  const to = Math.min((page + 1) * numberOfItemsPerPage, data.length);

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
      <Animated.View>
        {showAppBar && (
          <Appbar.Header>
            <Appbar.Action
              icon={
                isAllSelected ? 'checkbox-marked' : 'checkbox-blank-outline'
              }
              onPress={handleSelectAll}
            />
            <Appbar.Content title={headerTitle} />
            <Appbar.Action icon="pencil" onPress={() => {}} />
            <Appbar.Action icon="delete" onPress={() => {}} />
            <Appbar.Action icon="close" onPress={handleCancelSelect} />
          </Appbar.Header>
        )}
      </Animated.View>
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
          keyExtractor={item => item.id.toString()}
          renderItem={({item, index}) => (
            <DataTable.Row onPress={() => handleItemPress(index)}>
              <DataTable.Cell>
                <Checkbox status={item.checked ? 'checked' : 'unchecked'} />
              </DataTable.Cell>
              <DataTable.Cell>{item.id}</DataTable.Cell>
              <DataTable.Cell>{item.name}</DataTable.Cell>
              <DataTable.Cell>{item.age}</DataTable.Cell>
              <DataTable.Cell>{item.hasCar ? 'True' : 'False'}</DataTable.Cell>
            </DataTable.Row>
          )}
        />

        <DataTable.Pagination
          numberOfPages={Math.ceil(data.length / numberOfItemsPerPage)}
          page={page}
          label={`${from + 1}-${to} of ${data.length}`}
          showFastPaginationControls
          onPageChange={page => setPage(page)}
          numberOfItemsPerPage={numberOfItemsPerPage}
          onItemsPerPageChange={onItemsPerPageChange}
          selectPageDropdownLabel={'Rows per page'}
        />
      </DataTable>
    </>
  );
};
