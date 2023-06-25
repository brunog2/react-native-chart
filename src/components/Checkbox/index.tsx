import React, {memo, useCallback, useEffect} from 'react';
import {Checkbox as MaterialCheckbox} from 'react-native-paper';

interface CheckboxProps {
  label: string;
  status?: 'unchecked' | 'checked' | 'indeterminate';
  onPress?: (status: 'unchecked' | 'checked' | 'indeterminate') => void;
}

export const Checkbox = memo(
  ({label, status, onPress}: CheckboxProps) => {
    const [statusData, setStatusData] = React.useState<
      'unchecked' | 'checked' | 'indeterminate'
    >(status || 'unchecked');

    useEffect(() => {
      // console.log('STATUS CHANGES', status, statusData);
      status && status !== statusData && setStatusData(status);
    }, [status]);

    // console.log('RENDER INTERNAL CHECKBOX', status, statusData);

    const handleOnPress = useCallback(() => {
      console.log('ON PRESS');
      // setStatusData(status => (status === 'checked' ? 'unchecked' : 'checked'));
      onPress && onPress(statusData);
    }, [statusData]);

    return (
      <MaterialCheckbox.Item
        status={statusData}
        onPress={handleOnPress}
        label={label}
      />
    );
  },
  (prevProps, nextProps) => {
    /*
      return true if passing nextProps to render would return
      the same result as passing prevProps to render,
      otherwise return false
      */

    return nextProps.status === prevProps.status;
  },
);
