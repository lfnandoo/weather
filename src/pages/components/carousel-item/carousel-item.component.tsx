import React, { InputHTMLAttributes, useEffect, useRef, useState } from 'react';
import { IoIosStar } from 'react-icons/io';
import { WiDayCloudyWindy, WiThermometerExterior } from 'react-icons/wi';
import { Autocomplete } from '../../../components/autocomplete/autocomplete.component';
import { Skeleton } from '../../../components/skeleton/skeleton.styles';
import {
  CarouselItemContainer,
  CarouselItemHeader,
  CarouselItemContent,
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
            <Autocomplete onSearch={handleSearchLocation} onChange={handleLoadLocation} />
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
