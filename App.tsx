import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreen} from './src/screens/HomeScreen';
import {BottomSheetScreen} from './src/screens/BottomSheetScreen';
import {DataTableScreen} from './src/screens/DataTableScreen';
import {RootStackParamList} from './src/types/NavigationStackType/navigationStackType';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={() => ({animation: 'slide_from_right'})}>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="BottomSheet" component={BottomSheetScreen} />
        <Stack.Screen name="DataTable" component={DataTableScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default App;
