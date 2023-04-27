import {AbstractChartConfig} from 'react-native-chart-kit/dist/AbstractChart';

export const defaultChartConfig: AbstractChartConfig = {
  backgroundGradientFrom: '#e36b40',
  backgroundGradientTo: '#f85920',
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
  strokeWidth: 2,
};
