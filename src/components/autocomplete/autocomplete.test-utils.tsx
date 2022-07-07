import { fireEvent } from '@testing-library/dom';
import { act, render } from '@testing-library/react';
import { Autocomplete } from './autocomplete.component';

function autocompleteCreateAndChangeInput() {
  const onSearch = jest.fn(() => {
    return Promise.resolve([
      { description: 'São Paulo', value: '1', data: {} },
      { description: 'São Cristovão', value: '2', data: {} },
    ]);
  });
  jest.useFakeTimers();
  const onChange = jest.fn();
  const renderResult = render(<Autocomplete onChange={onChange} onSearch={onSearch} />);

  fireEvent.change(renderResult.getByTestId('autocomplete-input'), { target: { value: 'São' } });

  act(() => {
    jest.advanceTimersByTime(500);
  });

  return { renderResult, onSearch, onChange };
}

export { autocompleteCreateAndChangeInput };
