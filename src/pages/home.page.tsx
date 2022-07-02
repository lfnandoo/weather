import { Carousel } from '../components/carousel/carousel.component';
import { DaysDegreesList } from '../components/days-degrees-list/days-degrees-list.component';
import { CarouselContainer } from './home.styles';
import { CarouselItem } from './components/carousel-item/carousel-item.component';

function Home() {
  return (
    <>
      <CarouselContainer>
        <Carousel
          slides={[
            {
              key: Math.random(),
              content: <CarouselItem />,
            },
            {
              key: Math.random(),
              content: <CarouselItem />,
            },
            {
              key: Math.random(),
              content: <CarouselItem />,
            },
            {
              key: Math.random(),
              content: <CarouselItem />,
            },
            {
              key: Math.random(),
              content: <CarouselItem />,
            },
            {
              key: Math.random(),
              content: <CarouselItem />,
            },
          ]}
        />
      </CarouselContainer>
      <DaysDegreesList />
    </>
  );
}

export { Home };
