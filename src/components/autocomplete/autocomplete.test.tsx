import { fireEvent, waitFor } from '@testing-library/dom';
import { autocompleteCreateAndChangeInput } from './autocomplete.test-utils';

describe('Autocomplete Component', () => {
  it('should trigger onSearch on input changes', async () => {
    const { onSearch } = autocompleteCreateAndChangeInput();

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('São');
    });
  });

  it('should render suggestions list', async () => {
    const {
      onSearch,
      renderResult: { queryByTestId, queryAllByTestId },
    } = autocompleteCreateAndChangeInput();

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('São');

      expect(queryByTestId('suggestions')).toBeInTheDocument();

      expect(queryAllByTestId('item')).toHaveLength(2);
    });
  });

  it('should trigger onChange when click on a suggestion', async () => {
    const {
      onSearch,
      onChange,
      renderResult: { queryByTestId, queryAllByTestId },
    } = autocompleteCreateAndChangeInput();

    await waitFor(() => {
      expect(onSearch).toHaveBeenCalledWith('São');

      expect(queryByTestId('suggestions')).toBeInTheDocument();

      const itemElements = queryAllByTestId('item');
      expect(itemElements).toHaveLength(2);

      fireEvent.click(itemElements[0]);
    });

    expect(onChange).toBeCalledWith({ description: 'São Paulo', value: '1', data: {} });
  });
});
