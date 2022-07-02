import { WiDaySunny } from 'react-icons/wi';
import { DayItemContainer } from './day-item.styles';

type weekdayPrefix = 'Segunda' | 'Terça' | 'Quarta' | 'Quinta' | 'Sexta';
type weekday = `${weekdayPrefix}-feira`;

interface DayInterface {
  description: 'Amanhã' | weekday | 'Sábado' | 'Domingo';
  nowDegrees: string;
  minimumDegrees: string;
}

interface DayProps {
  data: DayInterface;
}

function DayItem({ data }: DayProps) {
  return (
    <DayItemContainer>
      <p>
        <span>{data.description}</span>
        <WiDaySunny fontSize="24" fillOpacity="0.6" />
      </p>
      <p>
        <span>{data.nowDegrees}°</span>
        <span>{data.minimumDegrees}°</span>
      </p>
    </DayItemContainer>
  );
}

export { DayItem };
export type { DayInterface };
