import { WiDaySunny } from 'react-icons/wi';
import { Skeleton } from '../../../../pages/components/carousel-item/carousel-item.styles';
import { DayItemContainer } from './day-item.styles';

type weekdayPrefix = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta';
type weekday = `${weekdayPrefix}-feira`;

interface DayInterface {
  description: 'Amanhã' | weekday | 'Sábado' | 'Domingo';
  nowDegrees: string;
  minimumDegrees: string;
}

interface DayProps {
  data?: DayInterface;
  isLoading?: boolean;
}

function DayItem({ data, isLoading }: DayProps) {
  return (
    <DayItemContainer>
      <p>
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
      </p>
      <p>
        {!isLoading && (
          <>
            <span>{data?.nowDegrees}°</span>
            <span>{data?.minimumDegrees}°</span>
          </>
        )}
        {isLoading && (
          <>
            <Skeleton width="30px" height="24px" />
            <Skeleton width="30px" height="24px" />
          </>
        )}
      </p>
    </DayItemContainer>
  );
}

export { DayItem };
export type { DayInterface };
