import styled from 'styled-components';

const DayItemContainer = styled.li`
  display: flex;
  height: 8vh;
  width: 85%;
  max-width: 600px;
  margin: 0 auto;

  p {
    z-index: 10;
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 65%;
    margin: 0;
    margin-right: 15vw;
  }

  p:nth-child(2) {
    width: 35%;
    margin: 0;
  }

  p:nth-child(2) > span:nth-child(2) {
    opacity: 0.7;
  }
`;

export { DayItemContainer };
