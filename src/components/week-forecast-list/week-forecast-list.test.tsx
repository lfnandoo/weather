import { render } from '@testing-library/react';
import { WeekForecastList } from './week-forecast-list.component';

describe('WeekForecastList Component', () => {
  it('should render 5 loading day items when is loading', () => {
    const { getAllByTestId } = render(
      <WeekForecastList data={[{ description: 'Hoje', max: 34.4, min: 25.03 }]} isLoading />,
    );

    expect(getAllByTestId('day-item-loading')).toHaveLength(5);
  });

  it('should render day items when is not loading', () => {
    const { getAllByTestId } = render(
      <WeekForecastList
        data={[
          { description: 'Hoje', max: 34.4, min: 25.03 },
          { description: 'Amanhã', max: 34.4, min: 25.03 },
        ]}
        isLoading={false}
      />,
    );

    expect(getAllByTestId('day-item')).toHaveLength(2);
  });
});
