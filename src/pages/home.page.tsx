import { useState } from 'react';
import { Carousel } from '../components/carousel/carousel.component';
import { WeekForecastList } from '../components/week-forecast-list/week-forecast-list.component';
import { CarouselContainer } from './home.styles';
import { CarouselItem } from './components/carousel-item/carousel-item.component';
import { GetForecastByPosResponse, WeatherService } from '../services/weather/weather.service';
import { DayInterface } from '../components/week-forecast-list/components/day-item/day-item.component';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  const [weekForecast, setWeekForecast] = useState([] as DayInterface[]);

  function handleChangeWeekForecastList(data: GetForecastByPosResponse) {
    const list: DayInterface[] = [];
    const nextFiveDays = data.daily?.slice(1, 6);

    nextFiveDays?.forEach((day) => {
      const weekDay = new Date(day.dt * 1000).toLocaleDateString('pt-br', { weekday: 'long' });
      const description = weekDay.charAt(0).toUpperCase() + weekDay.slice(1);
      list.push({ description, max: day.temp.max, min: day.temp.min });
    });

    setWeekForecast(list);
  }

  async function handleLoadLocation({
    lat,
    lon,
    description = '',
  }: {
    lat: number;
    lon: number;
    description?: string;
  }) {
    setIsLoading(true);
    try {
      const response = await WeatherService.getForecastByPos({ lat, lon });

      handleChangeWeekForecastList(response);

      return {
        temp: response?.current?.temp,
        description,
        lat,
        lon,
      };
    } finally {
      setIsLoading(false);
    }
  }

  async function handleLoadSearch(value: { data: any }) {
    const { lat, lon } = value.data;

    if (typeof lat !== 'undefined' && typeof lon !== 'undefined') {
      return handleLoadLocation({ lat, lon });
    }

    setWeekForecast([]);

    return {};
  }

  return (
    <>
      <CarouselContainer>
        <Carousel
          slides={[
            {
              key: Math.random(),
              content: <CarouselItem type="local" onPosLoad={handleLoadLocation} />,
            },
            {
              key: Math.random(),
              content: <CarouselItem type="search" onSearchLoad={handleLoadSearch} />,
            },
            {
              key: Math.random(),
              content: (
                <CarouselItem
                  type="default"
                  pos={{
                    description: 'São Paulo, Brasil',
                    lat: -46.6334,
                    lon: -23.5507,
                  }}
                  onPosLoad={handleLoadLocation}
                />
              ),
            },
          ]}
        />
      </CarouselContainer>
      <WeekForecastList isLoading={isLoading} data={weekForecast} />
    </>
  );
}

export { Home };
