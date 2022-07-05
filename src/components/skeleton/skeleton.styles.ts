import styled from 'styled-components';

interface SkeletonProps {
  height: string;
  width: string;
}

const Skeleton = styled.div<SkeletonProps>`
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

export { Skeleton };
