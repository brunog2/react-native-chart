import {ScrollViewProps} from 'react-native';
import {RFValue} from 'react-native-responsive-fontsize';
import styled from 'styled-components/native';

export const MainView = styled.ScrollView.attrs(
  (): ScrollViewProps => ({contentContainerStyle: {padding: RFValue(12)}}),
)``;
