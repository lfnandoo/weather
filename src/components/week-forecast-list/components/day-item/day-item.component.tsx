import { WiDaySunny } from 'react-icons/wi';
import { Skeleton } from '../../../skeleton/skeleton.component';
import { DayItemContainer } from './day-item.styles';

interface DayInterface {
  description: string;
  max: number;
  min: number;
}

interface DayProps {
  data?: DayInterface;
  isLoading?: boolean;
}

function DayItem({ data, isLoading }: DayProps) {
  return (
    <DayItemContainer data-testid={isLoading ? 'day-item-loading' : 'day-item'}>
      <div>
        {!isLoading && (
          <>
            <span>{data?.description}</span>
            <WiDaySunny fontSize="24" fillOpacity="0.6" />
          </>
        )}
        {isLoading && (
          <>
            <Skeleton width="100px" height="20px" />
            <Skeleton width="30px" height="24px" />
          </>
        )}
      </div>
      <div>
        {!isLoading && typeof data?.max !== 'undefined' && typeof data?.min !== 'undefined' && (
          <>
            <span>{Math.floor(data.max)}°C</span>
            <span>{Math.floor(data.min)}°C</span>
          </>
        )}
        {isLoading && (
          <>
            <Skeleton width="30px" height="24px" />
            <Skeleton width="30px" height="24px" />
          </>
        )}
      </div>
    </DayItemContainer>
  );
}

export { DayItem };
export type { DayInterface };
