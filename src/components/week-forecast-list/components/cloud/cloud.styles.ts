import styled, { css } from 'styled-components';

interface CloudContainer {
  isFar?: boolean;
}

const styles = {
  isFar: {
    value: css`
      transform: rotateY(180deg);
      opacity: 0.3;
      bottom: 3.5rem;
    `,
    media400: css`
      bottom: 5rem;
    `,
    media500: css`
      bottom: 6rem;
    `,
    media600: css`
      bottom: 6.5rem;
    `,
    media700: css`
      bottom: 7.5rem;
    `,
  },
};

const CloudContainer = styled.div<CloudContainer>`
  margin: 0 auto;
  position: relative;
  bottom: 3rem;
  max-width: calc(600px + 20%);
  ${(props) => props.isFar && styles.isFar.value}

  img {
    position: absolute;
    width: 100%;
  }

  img:nth-child(2) {
    left: 4px;
    top: -6px;
    opacity: 0.6;
    width: calc(100% - 4px);
  }

  @media (min-width: 400px) {
    bottom: 4.5rem;

    ${(props) => props.isFar && styles.isFar.media400}
  }

  @media (min-width: 500px) {
    bottom: 5.5rem;

    ${(props) => props.isFar && styles.isFar.media500}
  }

  @media (min-width: 600px) {
    bottom: 6rem;

    ${(props) => props.isFar && styles.isFar.media600}
  }

  @media (min-width: 700px) {
    bottom: 7rem;

    ${(props) => props.isFar && styles.isFar.media700}
  }
`;

export { CloudContainer };
