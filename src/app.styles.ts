import styled from 'styled-components';

const AppContainer = styled.div`
  height: 100vh;
  background-image: linear-gradient(130deg, #bf9dff 0%, #a066eb 50%, #7280fd 75%);
  display: flex;
  flex-direction: column;
  justify-content: space-between;

  main {
    height: 90vh;
    display: flex;
    flex-direction: column;
    justify-content: flex-end;
  }
`;

export { AppContainer };
