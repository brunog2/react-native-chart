import React from 'react';
import {Dimensions} from 'react-native';
import {LineChart} from 'react-native-chart-kit';
import {LineChartData} from 'react-native-chart-kit/dist/line-chart/LineChart';
import {defaultChartConfig} from '../../utils/chart/defaultChartConfig';

interface ChartProps {
  data: LineChartData;
}

export const Chart = ({data}: ChartProps): JSX.Element => {
  const screenWidth = Dimensions.get('window').width;

  return (
    <LineChart
      data={data}
      width={screenWidth}
      height={220}
      chartConfig={defaultChartConfig}
    />
  );
};
