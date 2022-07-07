import { render } from '@testing-library/react';
import { fireEvent, getByTestId as gGetByTestId } from '@testing-library/dom';
import { List } from './list.component';

describe('Autocomplete > List Component', () => {
  it('should render items', () => {
    const onClick = jest.fn();
    const { getAllByTestId } = render(
      <List
        items={[{ description: 'Teste' }, { description: 'Teste' }, { description: 'Teste' }]}
        onClick={onClick}
        isLoading={false}
      />,
    );

    expect(getAllByTestId('item')).toHaveLength(3);
  });

  it('should render empty state', () => {
    const onClick = jest.fn();
    const { getByTestId } = render(<List items={[]} onClick={onClick} isLoading={false} />);

    expect(getByTestId('empty')).toBeInTheDocument();
  });

  it('should render 3 loading items when is loading', () => {
    const onClick = jest.fn();
    const { queryAllByTestId } = render(<List items={[]} onClick={onClick} isLoading />);

    expect(queryAllByTestId('item-loading')).toHaveLength(3);
  });

  it('should render a single skeleton inside items when is loading', () => {
    const onClick = jest.fn();
    const { getAllByTestId } = render(<List items={[]} onClick={onClick} isLoading />);

    getAllByTestId('item-loading').forEach((element) => {
      expect(element.childElementCount).toBe(1);
      expect(gGetByTestId(element, 'skeleton')).toBeInTheDocument();
    });
  });

  it('should trigger onClick callback when click on a item', () => {
    const onClick = jest.fn();
    const { getByText } = render(
      <List
        items={[{ description: 'Teste' }, { description: 'Teste1' }]}
        onClick={onClick}
        isLoading={false}
      />,
    );

    fireEvent.click(getByText('Teste1'));

    expect(onClick).toHaveBeenCalledWith(1);
  });
});
