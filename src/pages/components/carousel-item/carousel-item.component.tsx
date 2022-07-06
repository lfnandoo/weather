import React, { useEffect, useRef, useState } from 'react';
import { IoIosStar } from 'react-icons/io';
import { WiDayCloudyWindy, WiThermometerExterior } from 'react-icons/wi';
import { Autocomplete } from '../../../components/autocomplete/autocomplete.component';
import { Skeleton } from '../../../components/skeleton/skeleton.styles';
import { Location, LocationService } from '../../../services/location/location.service';
import {
  CarouselItemContainer,
  CarouselItemHeader,
  CarouselItemContent,
} from './carousel-item.styles';

interface CarouselItemTypeLocal {
  type: 'local';
  pos?: undefined;
  onPosLoad: (arg1: { lat: number; lon: number }) => Promise<{ description: string; temp: number }>;
  onSearchLoad?: undefined;
}

interface CarouselItemTypeDefault {
  type: 'default';
  pos: {
    description: string;
    lat: number;
    lon: number;
  };
  onPosLoad: (arg1: { lat: number; lon: number }) => Promise<{ description: string; temp: number }>;
  onSearchLoad?: undefined;
}

interface CarouselItemTypeSearch {
  type: 'search';
  onSearchLoad: (arg1: {
    data: any;
  }) => Promise<{ description?: string; temp?: number; lat?: number; lon?: number }>;
  onPosLoad?: undefined;
  pos?: undefined;
}

type CarouselItemTypeProps =
  | CarouselItemTypeLocal
  | CarouselItemTypeSearch
  | CarouselItemTypeDefault;

function CarouselItem({ type, onSearchLoad, onPosLoad, pos }: CarouselItemTypeProps) {
  const currentPosRef = useRef({} as { lat?: number; lon?: number });
  const [location, setLocation] = useState(() => {
    let description = pos?.description || '';

    if (type === 'local') {
      description = 'Localização atual.';
    }

    return { description } as {
      description?: string;
      temp?: number;
    };
  });
  const [isLoading, setIsLoading] = useState(false);

  async function handleChangeCurrentPos(position: GeolocationPosition) {
    setIsLoading(true);
    try {
      if (typeof onPosLoad === 'function') {
        const payload = {
          lat: position.coords.latitude,
          lon: position.coords.longitude,
        };

        const response = await onPosLoad(payload);
        setLocation({ ...response, description: 'Localização atual' });
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleGetLocation() {
    if ('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(handleChangeCurrentPos, () => {
        window.alert('Não foi possível encontrar a sua localização.');
      });
    } else {
      window.alert('Não foi possível encontrar a sua localização.');
    }
  }

  useEffect(() => {
    if (type === 'local') {
      handleGetLocation();
    }
  }, []);

  async function handleSearchLocation(searchTerm: string) {
    try {
      const response = await LocationService.searchLocations(searchTerm);

      const items = response?.map((item: Location) => {
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

  async function handleLoadLocationOnSearch(value: { data: unknown }) {
    setIsLoading(true);
    try {
      if (typeof onSearchLoad === 'function') {
        const response = await onSearchLoad(value);
        currentPosRef.current = response;
        setLocation(response);
      }
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLoadLocationOnOpen() {
    if (type === 'local') {
      handleGetLocation();
    }

    if (type === 'default') {
      setIsLoading(true);
      try {
        if (typeof onPosLoad !== 'undefined') {
          const response = await onPosLoad(pos!);
          setLocation(response);
        }
      } finally {
        setIsLoading(false);
      }
    }

    if (type === 'search') {
      handleLoadLocationOnSearch({
        data: { lat: currentPosRef.current.lat, lon: currentPosRef.current.lon },
      });
    }
  }

  return (
    <CarouselItemContainer onClick={handleLoadLocationOnOpen}>
      <CarouselItemHeader>
        {type !== 'search' && location?.description && <h1>{location.description}</h1>}
        {type === 'search' && (
          <div style={{ width: '100%' }}>
            <Autocomplete onSearch={handleSearchLocation} onChange={handleLoadLocationOnSearch} />
          </div>
        )}
      </CarouselItemHeader>
      <CarouselItemContent>
        {isLoading && (
          <>
            <Skeleton height="50px" width="70px" />
            <Skeleton height="80px" width="100px" />
          </>
        )}
        {!isLoading && (
          <>
            {typeof location?.temp === 'undefined' && (
              <>
                <WiThermometerExterior fontSize="50px" />
                <p>Não encontrado</p>
              </>
            )}
            {typeof location?.temp !== 'undefined' && (
              <>
                <WiDayCloudyWindy fontSize="50px" fillOpacity="0.6" />
                <span>{Math.floor(location.temp)}°C</span>
              </>
            )}
          </>
        )}
      </CarouselItemContent>
    </CarouselItemContainer>
  );
}

export { CarouselItem };
