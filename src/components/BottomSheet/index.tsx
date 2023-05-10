import React, {
  useCallback,
  useEffect,
  useImperativeHandle,
  useMemo,
  useRef,
} from 'react';
import {Chart} from '../../components/Chart';
import {
  BottomSheetBackdrop,
  BottomSheetModal,
  BottomSheetModalProvider,
} from '@gorhom/bottom-sheet';
import {StyleSheet, Text, View, Button} from 'react-native';
import {GestureHandlerRootView} from 'react-native-gesture-handler';

export const BottomSheet = React.forwardRef(({}, ref) => {
  const [isOpen, setIsOpen] = React.useState(false);
  // ref
  const bottomSheetModalRef = useRef<BottomSheetModal>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks

  const handleOpenModal = () => {
    bottomSheetModalRef.current?.expand();
  };

  useImperativeHandle(ref, () => ({
    handleOpenModal,
  }));

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
        <BottomSheetModal
          style={{elevation: 1}}
          ref={bottomSheetModalRef}
          index={1}
          snapPoints={snapPoints}
          backdropComponent={renderBackdrop}
          enablePanDownToClose={false}
          enableDismissOnClose={false}>
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
});

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
