import React, {memo, useCallback, useEffect} from 'react';
import {
  Checkbox as MaterialCheckbox,
  Text,
  TouchableRipple,
} from 'react-native-paper';
import {IOSView} from './styles';

interface CheckboxProps {
  label: string;
  status?: 'unchecked' | 'checked' | 'indeterminate';
  onPress?: (status: 'unchecked' | 'checked' | 'indeterminate') => void;
  type?: 'ios' | 'android';
}

export const Checkbox = memo(
  ({label, status, onPress, type}: CheckboxProps) => {
    const [statusData, setStatusData] = React.useState<
      'unchecked' | 'checked' | 'indeterminate'
    >(status || 'unchecked');

    useEffect(() => {
      // console.log('STATUS CHANGES', status, statusData);
      status && status !== statusData && setStatusData(status);
    }, [status]);

    // console.log('RENDER INTERNAL CHECKBOX', status, statusData);

    const handleOnPress = useCallback(() => {
      // console.log('ON PRESS');
      // setStatusData(status => (status === 'checked' ? 'unchecked' : 'checked'));
      onPress && onPress(statusData);
    }, [statusData]);

    return (
      <>
        {type === 'ios' ? (
          <TouchableRipple onPress={handleOnPress}>
            <IOSView>
              <Text variant="bodyLarge">{label}</Text>
              <MaterialCheckbox.IOS status={statusData} />
            </IOSView>
          </TouchableRipple>
        ) : (
          <MaterialCheckbox.Item
            status={statusData}
            onPress={handleOnPress}
            label={label}
          />
        )}
      </>
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
