import { Carousel } from '../components/carousel/carousel.component';
import { DaysDegreesList } from '../components/days-degrees-list/days-degrees-list.component';
import { CarouselContainer } from './home.styles';
import { CarouselItem } from './components/carousel-item/carousel-item.component';
import { useState } from 'react';

function Home() {
  const [isLoading, setIsLoading] = useState(false);
  async function handleLoadLocation(value: { data: any }) {
    setIsLoading(true);
    try {
      // const selectedLocation = inputSearchRef.current.selected;
      const { lat, lon } = value.data;
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&appid=ecb81a32abd64beff64b5bc7f39910c4`,
      ).then((res) => res.json());
      console.log(response);
      return {} as { description: string; degrees: string };
    } finally {
      setIsLoading(false);
    }
  }
  const [slides, setSlides] = useState(() => {
    const initialSlides = [
      {
        key: Math.random(),
        content: <CarouselItem type="search" onLoad={handleLoadLocation} />,
      },
      {
        key: Math.random(),
        content: (
          <CarouselItem
            type="default"
            data={{
              description: 'Copacabana, Rio de Janeiro',
              degrees: '40',
            }}
          />
        ),
      },
      {
        key: Math.random(),
        content: (
          <CarouselItem
            type="default"
            data={{
              description: 'Brooklyn, São Paulo',
              degrees: '27',
            }}
          />
        ),
      },
    ];

    return initialSlides;
  });

  return (
    <>
      <CarouselContainer>
        <Carousel slides={slides} />
      </CarouselContainer>
      <DaysDegreesList isLoading />
    </>
  );
}

export { Home };
