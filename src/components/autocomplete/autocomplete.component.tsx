import { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { useDebounce } from '../../hooks/use-debounce.hook';
import { AutocompleteInput } from './autocomplete.styles';
import { List } from './components/list/list.component';

interface AutocompleteProps extends Omit<InputHTMLAttributes<any>, 'onChange'> {
  onSearch: (
    searchTerm: string,
  ) => Promise<{ description: string; value: string; data: unknown }[]>;
  onChange: (value: { description: string; value: string; data: unknown }) => void;
  debounce?: number;
}

function Autocomplete({ onSearch, onChange, debounce = 500, ...inputProps }: AutocompleteProps) {
  const searchRef = useRef({ enableSearch: false });
  const [isListOpen, setIsListOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([] as { description: string; value: string; data: unknown }[]);
  const debouncedSearchTerm = useDebounce(searchTerm, debounce);

  async function handleSearch() {
    setIsSearching(true);
    setIsListOpen(true);
    const newItems = await onSearch(searchTerm);
    setItems(newItems);
    setIsSearching(false);
  }

  function handleChange(index: number) {
    setIsListOpen(false);
    const item = items[index];
    setSearchTerm(item.description);
    onChange(item);
    searchRef.current.enableSearch = false;
  }

  useEffect(() => {
    if (debouncedSearchTerm && searchRef.current.enableSearch) {
      handleSearch();
    }
  }, [debouncedSearchTerm]);

  return (
    <>
      <AutocompleteInput
        {...inputProps}
        data-testid="autocomplete-input"
        type="text"
        value={searchTerm}
        onChange={(e) => {
          setSearchTerm(e.target.value);
          searchRef.current.enableSearch = true;
        }}
        autoComplete="off"
      />
      {isListOpen && <List items={items} onClick={handleChange} isLoading={isSearching} />}
    </>
  );
}

export { Autocomplete };
