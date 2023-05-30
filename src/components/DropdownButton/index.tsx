import React, {useState, useImperativeHandle, forwardRef} from 'react';
import {Text, Divider} from 'react-native-paper';
import {
  ChildContainer,
  DropdownIcon,
  MainView,
  Ripple,
  RippleContainer,
} from './styles';

interface DropdownButtonProps {
  children: React.ReactNode;
}

export interface DropdownButtonMethodsProps {
  handleShow: () => {};
  show: () => {};
  hide: () => {};
}

export const DropdownButton = forwardRef(
  ({children}: DropdownButtonProps, ref) => {
    const [showChild, setShowChild] = useState(false);

    const handleShow = () => setShowChild(!showChild);
    const show = () => setShowChild(true);
    const hide = () => setShowChild(false);

    useImperativeHandle(ref, () => ({handleShow, show, hide}));

    return (
      <MainView>
        <Ripple onPress={handleShow}>
          <RippleContainer>
            <Text variant="titleSmall">ola</Text>
            <DropdownIcon showing={show} />
          </RippleContainer>
        </Ripple>
        <Divider bold />
        {showChild && <ChildContainer>{children}</ChildContainer>}
      </MainView>
    );
  },
);
