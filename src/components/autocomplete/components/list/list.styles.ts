import styled from 'styled-components';

const ListContainer = styled.div`
  display: grid;
  place-items: center;
  position: absolute;
  height: 80px;
  z-index: 1;
  overflow-y: auto;
  width: 100%;
  padding: 5px 0;
  background-color: #fff;
  border-radius: 5px;
`;

const UlList = styled.ul`
  display: flex;
  align-items: center;
  flex-direction: column;
  gap: 5px;
  list-style: none;
  padding: 5px 0;
  margin: 0 auto;
  background-color: #fff;
  border-radius: 0 0 5px 5px;
  width: 100%;
  position: absolute;
  z-index: 1;
  overflow-y: auto;
`;

export { ListContainer, UlList };
