import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { IoIosStar } from 'react-icons/io';
import { WiDayCloudyWindy, WiThermometerExterior } from 'react-icons/wi';
import {
  CarouselItemContainer,
  CarouselItemHeader,
  CarouselItemContent,
  Skeleton,
} from './carousel-item.styles';

interface CarouselItemTypeSearch {
  type: 'search';
  onLoad: (value: { data: any }) => Promise<{ description: string; degrees: string }>;
  data?: undefined;
}

interface CarouselItemTypeDefault {
  type: 'default';
  data: {
    description: string;
    degrees: string;
  };
  onLoad?: undefined;
}

type CarouselItemTypeProps = CarouselItemTypeSearch | CarouselItemTypeDefault;

function useDebounce<T>(value: T, delay: number) {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);
    return () => {
      clearTimeout(handler);
    };
  }, [value, delay]);

  return debouncedValue;
}

function List({
  items,
  isLoading,
  onClick,
}: {
  items: { description: string }[];
  isLoading: boolean;
  onClick: (index: number) => void;
}) {
  return (
    <div
      style={{
        display: 'grid',
        placeItems: 'center',
        padding: '5px 0',
        backgroundColor: '#fff',
        borderRadius: '5px',
        width: '100%',
        position: 'absolute',
        zIndex: 1,
        height: '80px',
        overflowY: 'auto',
      }}
    >
      {isLoading && 'Carregando...'}
      {!isLoading && (
        <ul
          style={{
            display: 'flex',
            alignItems: 'center',
            flexDirection: 'column',
            gap: '5px',
            listStyle: 'none',
            padding: '5px 0',
            margin: '0 auto',
            backgroundColor: '#fff',
            borderRadius: '0 0 5px 5px',
            width: '100%',
            position: 'absolute',
            zIndex: 1,
            overflowY: 'auto',
          }}
        >
          {items.map((item, index) => (
            <li key={Math.random()} onClick={() => onClick(index)}>
              {item.description}
            </li>
          ))}
          {items.length === 0 && <p>Nenhum resultado encontrado</p>}
        </ul>
      )}
    </div>
  );
}

interface InputSearchProps extends Omit<InputHTMLAttributes<any>, 'onChange'> {
  onSearch: (
    searchTerm: string,
  ) => Promise<{ description: string; value: string; data: unknown }[]>;
  onChange: (value: { description: string; value: string; data: unknown }) => void;
}

function InputSearch({ onSearch, onChange, ...inputProps }: InputSearchProps) {
  const searchRef = useRef({ enableSearch: false });
  const [isListOpen, setIsListOpen] = useState(false);
  const [isSearching, setIsSearching] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([] as { description: string; value: string; data: unknown }[]);
  const debouncedSearchTerm = useDebounce(searchTerm, 500);

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
      <input
        {...inputProps}
        style={{
          fontSize: '20px',
          backgroundColor: 'transparent',
          outline: 'none',
          border: '1px solid rgba(255, 255, 255, 0.2)',
          borderRadius: '20px',
          padding: '5px',
          width: 'calc(100% - 10px)',
          fontWeight: '100',
          color: 'rgba(0,0,0,0.6)',
        }}
        id="searchLocation"
        name="searchLocation"
        placeholder="Digite sua localização..."
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

function CarouselItem({ type, data, onLoad }: CarouselItemTypeProps) {
  const [location, setLocation] = useState(
    data || ({} as { description: string; degrees: string }),
  );
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearchLocation(searchTerm: string) {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&limit=3&q=${searchTerm}`,
      ).then((res) => res.json());
      const items = (response || []).map((item: any) => {
        const description = item.display_name?.split(',').slice(0, 2);

        return {
          description: description?.toString(),
          value: item.place_id,
          data: item,
        };
      });

      return items;
    } catch {
      // tratar erros
      return [];
    }
  }

  async function handleLoadLocation(value: { data: unknown }) {
    setIsLoading(true);
    try {
      if (typeof onLoad === 'function') {
        const response = await onLoad(value);
        setLocation(response);
      }
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <CarouselItemContainer>
      <CarouselItemHeader>
        {type === 'default' && <h1>{location.description}</h1>}
        {type === 'search' && (
          <div style={{ width: '100%' }}>
            <InputSearch onSearch={handleSearchLocation} onChange={handleLoadLocation} />
          </div>
        )}
      </CarouselItemHeader>
      <CarouselItemContent>
        <header>{type === 'default' && <IoIosStar fill="#FFDF00" fontSize="20px" />}</header>
        <section>
          {isLoading && (
            <>
              <Skeleton height="50px" width="70px" />
              <Skeleton height="80px" width="100px" />
            </>
          )}
          {!isLoading && (
            <>
              {typeof location.degrees === 'undefined' && (
                <>
                  <WiThermometerExterior fontSize="50px" />
                  <p>Não encontrado</p>
                </>
              )}
              {typeof location.degrees !== 'undefined' && (
                <>
                  <WiDayCloudyWindy fontSize="50px" fillOpacity="0.6" />
                  <span>{location.degrees}°C</span>
                </>
              )}
            </>
          )}
        </section>
      </CarouselItemContent>
    </CarouselItemContainer>
  );
}

export { CarouselItem };
