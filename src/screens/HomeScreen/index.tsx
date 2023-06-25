import React, {useEffect, useRef} from 'react';
import {Button, CheckboxItemProps} from 'react-native-paper';
import {ActionView} from './styles';
import type {NativeStackScreenProps} from '@react-navigation/native-stack';
import {RootStackParamList} from '../../types/NavigationStackType/navigationStackType';
import {
  TouchableNativeFeedback,
  View,
  Text,
  Button as RNButton,
  TouchableOpacity,
} from 'react-native';
import {Checkbox} from '../../components/Checkbox';
import {MultiSelect} from '../../components/MultiSelect';

type Props = NativeStackScreenProps<RootStackParamList>;

export const HomeScreen = ({navigation}: Props) => {
  console.log('RENDER MAIN VIEW');

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
