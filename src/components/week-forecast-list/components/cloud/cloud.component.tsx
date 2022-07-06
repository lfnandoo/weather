import cloud from '../../../../assets/cloud.svg';
import { CloudContainer } from './cloud.styles';

function Cloud() {
  return (
    <>
      <CloudContainer>
        <img src={cloud} />
        <img src={cloud} />
      </CloudContainer>
      <CloudContainer isFar>
        <img src={cloud} />
      </CloudContainer>
    </>
  );
}

export { Cloud };
