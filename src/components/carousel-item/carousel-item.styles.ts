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
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 5px;
  border-radius: 5px;
  border: 1px solid rgba(255, 255, 255, 0.2);
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(4px);
  padding: 8px;
  height: 14rem;
  width: 14rem;

  span {
    font-size: 30px;
    font-weight: 100;
    opacity: 0.6;
  }
`;

export { CarouselItemContainer, CarouselItemHeader, CarouselItemContent };
