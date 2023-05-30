import styled from 'styled-components/native';
import {RFValue} from 'react-native-responsive-fontsize';
import {
  DividerProps,
  Surface,
  SurfaceProps,
  TouchableRipple,
  Divider as PaperDivider,
  TouchableRippleProps,
} from 'react-native-paper';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {darkTheme, lightTheme} from '../../styles/theme';

export const MainView = styled(Surface).attrs(
  (p: SurfaceProps): SurfaceProps => ({
    ...p,
    elevation: 4,
  }),
)`
  border-radius: 5px;
`;

export const Ripple = styled(TouchableRipple).attrs(
  (p: TouchableRippleProps): TouchableRippleProps => ({...p}),
)`
  padding: ${RFValue(12)}px;
`;

export const RippleContainer = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DropdownIcon = styled(Icon).attrs(
  (p: {showing?: boolean} & Icon): Icon => ({
    name: p.showing ? 'arrow-down' : 'arrow-up',
    size: 22,
    ...p,
  }),
)`
  color: ${lightTheme.SECONDARY_COLOR};
`;

export const ChildContainer = styled.View`
  border-bottom-left-radius: 5px;
  border-bottom-right-radius: 5px;
  padding: ${RFValue(12)}px;
  background: white;
`;
