import { SkeletonContainer } from './skeleton.styles';

export interface SkeletonProps {
  height: string;
  width: string;
}

function Skeleton(props: SkeletonProps) {
  return <SkeletonContainer data-testid="skeleton" {...props} />;
}

export { Skeleton };
