import React, {useRef} from 'react';

import {StyleSheet, Text, View, Button} from 'react-native';
import {BottomSheet} from '../../components/BottomSheet';

export const BottomSheetScreen = (): JSX.Element => {
  const bottomSheetModalRef: any = useRef(null);

  const handleOpenModalPress = () => {
    console.log('chegou aqui');
    bottomSheetModalRef.current?.handleOpenModal();
  };

  return (
    <View style={styles.container}>
      <Button onPress={handleOpenModalPress} title="Open Modal" color="black" />
      <Button onPress={handleOpenModalPress} title="Open Modal" color="black" />
      <BottomSheet ref={bottomSheetModalRef} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'yellow',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});
