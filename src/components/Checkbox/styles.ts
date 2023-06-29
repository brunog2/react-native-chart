import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const IOSView = styled.View`
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  padding: ${RFValue(8)}px ${RFValue(14)}px;
`;
