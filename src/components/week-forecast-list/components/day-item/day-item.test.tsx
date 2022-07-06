import { render } from '@testing-library/react';
import { DayItem } from './day-item.component';

describe('DayItem Component', () => {
  it('should render temperature as integer', () => {
    const { queryByText } = render(
      <DayItem data={{ description: 'Hoje', max: 34.4, min: 25.03 }} />,
    );

    const min = queryByText('25°C');
    const max = queryByText('34°C');

    expect(min).toBeTruthy();
    expect(max).toBeTruthy();
  });

  it('should render 4 skeletons when is loading', () => {
    const { getAllByTestId } = render(<DayItem isLoading />);

    expect(getAllByTestId('skeleton')).toHaveLength(4);
  });
});
