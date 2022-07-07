import { render } from '@testing-library/react';
import { DayItem } from './day-item.component';

describe('WeekForecastList > DayItem Component', () => {
  it('should render temperature as integer', () => {
    const { queryByText } = render(
      <DayItem data={{ description: 'Hoje', max: 34.4, min: 25.03 }} />,
    );

    expect(queryByText('25°C')).toBeInTheDocument();
    expect(queryByText('34°C')).toBeInTheDocument();
  });

  it('should render 4 skeletons when is loading', () => {
    const { getAllByTestId } = render(<DayItem isLoading />);

    expect(getAllByTestId('skeleton')).toHaveLength(4);
  });
});
