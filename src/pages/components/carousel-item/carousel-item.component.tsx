import { IoIosStar } from 'react-icons/io';
import { WiDayCloudyWindy } from 'react-icons/wi';
import {
  CarouselItemContainer,
  CarouselItemHeader,
  CarouselItemContent,
} from './carousel-item.styles';

function CarouselItem() {
  return (
    <CarouselItemContainer>
      <CarouselItemHeader>
        <h1>India, Ahli</h1>
      </CarouselItemHeader>
      <CarouselItemContent>
        <header>
          <IoIosStar fill="#FFDF00" fontSize="20px" />
        </header>
        <section>
          <WiDayCloudyWindy fontSize="50px" fillOpacity="0.6" />
          <span>26°C</span>
        </section>
      </CarouselItemContent>
    </CarouselItemContainer>
  );
}

export { CarouselItem };
