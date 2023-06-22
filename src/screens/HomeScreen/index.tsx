import React, {useRef} from 'react';
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
import {MultiCheckbox} from '../../components/MultiCheckbox';

type Props = NativeStackScreenProps<RootStackParamList>;

export const HomeScreen = ({navigation}: Props) => {
  const [a, setA] = React.useState(false);
  const checkboxRef = useRef<CheckboxItemProps | null>(null);

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

      <Button onPress={() => setA(!a)}>Check checkbox</Button>

      <Checkbox label="Checkbox" />

      <MultiCheckbox />
    </ActionView>
  );
};
