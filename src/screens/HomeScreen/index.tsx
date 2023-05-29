import React from 'react';
import {Button} from 'react-native-paper';
import {ActionView} from './styles';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/NavigationStackType/navigationStackType';

type Props = NativeStackScreenProps<RootStackParamList>;

export const HomeScreen = ({navigation}: Props) => {
  return (
    <ActionView>
      <Button onPress={() => navigation.navigate('BottomSheet')}>
        Navigate to BottomSheetScreen
      </Button>
      <Button onPress={() => navigation.navigate('DataTable')}>
        Navigate to DataTableScreen
      </Button>
      <Button onPress={() => navigation.navigate('Form')}>
        Navigate to FormScreen
      </Button>
    </ActionView>
  );
};
