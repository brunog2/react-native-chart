import React, {useState, useImperativeHandle, forwardRef, useMemo} from 'react';
import {LayoutAnimation, ViewProps} from 'react-native';
import {Text, Divider} from 'react-native-paper';
import {
  ChildContainer,
  DropdownIcon,
  MainView,
  Ripple,
  RippleContainer,
} from './styles';

interface DropdownButtonProps extends ViewProps {
  title: string;
  children: React.ReactNode;
}

export interface DropdownButtonMethodsProps {
  handleShow: () => {};
  show: () => {};
  hide: () => {};
}

export const DropdownButton = forwardRef(
  ({children, title, ...props}: DropdownButtonProps, ref) => {
    const [showChild, setShowChild] = useState(false);

    const handleShow = () => setShowChild(!showChild);
    const show = () => setShowChild(true);
    const hide = () => setShowChild(false);

    useImperativeHandle(ref, () => ({handleShow, show, hide}));

    LayoutAnimation.configureNext(LayoutAnimation.Presets.easeInEaseOut);

    return (
      <MainView {...props}>
        <Ripple onPress={handleShow}>
          <RippleContainer>
            <Text variant="titleSmall">{title}</Text>
            <DropdownIcon showing={showChild} />
          </RippleContainer>
        </Ripple>
        <Divider bold />
        {showChild && <ChildContainer>{children}</ChildContainer>}
      </MainView>
    );
  },
);
