import React from 'react';
import {MainView} from './styles';
import {Chart} from '../../components/Chart';

export const Home = (): JSX.Element => {
  const data = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
      {
        data: [20, 45, 28, 80, 99, 43],
      },
    ],
  };

  return (
    <MainView>
      <Chart data={data} />
    </MainView>
  );
};
