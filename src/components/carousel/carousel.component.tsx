import { ReactNode, useState } from 'react';
import RSCarousel from 'react-spring-3d-carousel';

function Carousel({ slides }: { slides: { key: number | string; content: ReactNode }[] }) {
  const [rsConfig, setRsConfig] = useState({
    goToSlide: 1,
    offsetRadius: 1,
    showNavigation: false,
    slides: slides.map((slide, index) => {
      return {
        ...slide,
        onClick: () => setRsConfig((prevState) => ({ ...prevState, goToSlide: index })),
      };
    }),
  });

  return <RSCarousel {...rsConfig} />;
}

export { Carousel };
