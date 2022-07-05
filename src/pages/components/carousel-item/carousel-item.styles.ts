import styled from 'styled-components';

const CarouselItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  user-select: none;
  cursor: pointer;
`;

const CarouselItemHeader = styled.header`
  margin-bottom: 10px;

  h1 {
    margin: 0;
    opacity: 0.6;
    font-size: 20px;
    font-weight: 200;
  }
`;

const CarouselItemContent = styled.div`
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  padding: 8px;
  height: 14rem;
  width: 14rem;

  header {
    display: flex;
    justify-content: flex-end;
    height: 30%;
  }

  section {
    display: flex;
    flex-direction: column;
    align-items: center;
    height: 70%;
    margin: 0;
  }

  span {
    font-size: 30px;
    font-weight: 100;
    opacity: 0.6;
  }
`;

const Skeleton = styled.div<{ height: string; width: string }>`
  height: ${({ height }) => height};
  width: ${({ width }) => width};
  background-image: linear-gradient(-90deg, #e7edf1 0%, #cac2c2 50%, #e7edf1 100%);
  background-size: 400% 400%;
  animation: shimmer 1.2s ease-in-out infinite;
  opacity: 0.5;

  @keyframes shimmer {
    0% {
      background-position: 0% 0%;
    }
    100% {
      background-position: -135% 0%;
    }
  }
`;

export { CarouselItemContainer, CarouselItemHeader, CarouselItemContent, Skeleton };
