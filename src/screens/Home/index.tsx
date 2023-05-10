import React, {useCallback, useMemo, useRef} from 'react';
import {MainView} from './styles';
import {Chart} from '../../components/Chart';
import BottomSheet, {
  BottomSheetBackdrop,
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

  const handleCloseModalPress = useCallback(() => {
    bottomSheetModalRef.current?.close();
  }, []);

  const handleSheetChanges = useCallback((index: number) => {
    index >= 0 && setIsOpen(prev => prev !== true && true);
    index < 0 && setIsOpen(prev => prev !== false && false);
    console.log('handleSheetChanges', index);
  }, []);

  const renderBackdrop = useCallback(
    (props: any) => (
      <BottomSheetBackdrop
        {...props}
        appearsOnIndex={0}
        disappearsOnIndex={-1}
      />
    ),
    [],
  );

  // renders
  return (
    <GestureHandlerRootView style={[styles.container]}>
      <BottomSheetModalProvider>
        <Button
          onPress={handlePresentModalPress}
          title="Present Modal"
          color="black"
        />
        <BottomSheetModal
          style={{elevation: 1}}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={false}>
          <View style={styles.contentContainer}>
            <Text>Awesome 🎉</Text>
            <Button
              onPress={handleCloseModalPress}
              title="Close Modal"
              color="black"
            />
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
