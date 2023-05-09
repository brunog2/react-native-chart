import React, {useCallback, useMemo, useRef} from 'react';
import {MainView} from './styles';
import {Chart} from '../../components/Chart';
import BottomSheet, {
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {StyleSheet, Text, View, Button} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const Home = (): JSX.Element => {
  const [isOpen, setIsOpen] = React.useState(false);
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%', '75%'], []);

  // callbacks
  const handlePresentModalPress = useCallback(() => {
    bottomSheetModalRef.current?.present();
  }, []);
  const handleSheetChanges = useCallback((index: number) => {
    index >= 0 && setIsOpen(prev => prev !== true && true);
    index < 0 && setIsOpen(prev => prev !== false && false);
    console.log('handleSheetChanges', index);
  }, []);

  // renders
  return (
    <GestureHandlerRootView
      style={[
        styles.container,
        {backgroundColor: isOpen ? 'rgba(0, 0, 0, 0.5)' : 'white'},
      ]}>
      <BottomSheetModalProvider>
        <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        />
        <BottomSheetModal
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          onChange={handleSheetChanges}>
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
          </View>
        </BottomSheetModal>
      </BottomSheetModalProvider>
    </GestureHandlerRootView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    justifyContent: 'center',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
