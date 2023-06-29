import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';
import {HomeScreen} from './src/screens/HomeScreen';
import {BottomSheetScreen} from './src/screens/BottomSheetScreen';
import {DataTableScreen} from './src/screens/DataTableScreen';
import {RootStackParamList} from './src/types/NavigationStackType/navigationStackType';
import {FormScreen} from './src/screens/FormScreen';
import {Provider as PaperProvider} from 'react-native-paper';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import {BottomSheetModalProvider} from '@gorhom/bottom-sheet';
import {StyleSheet} from 'react-native';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <NavigationContainer>
      <GestureHandlerRootView style={[styles.container]}>
        <BottomSheetModalProvider>
          <PaperProvider>
            <Stack.Navigator
              screenOptions={() => ({animation: 'slide_from_right'})}>
              <Stack.Screen name="Home" component={HomeScreen} />
              <Stack.Screen name="BottomSheet" component={BottomSheetScreen} />
              <Stack.Screen name="DataTable" component={DataTableScreen} />
              <Stack.Screen name="Form" component={FormScreen} />
            </Stack.Navigator>
          </PaperProvider>
        </BottomSheetModalProvider>
      </GestureHandlerRootView>
    </NavigationContainer>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
