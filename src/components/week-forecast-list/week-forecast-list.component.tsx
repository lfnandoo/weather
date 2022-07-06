import { Cloud } from './components/cloud/cloud.component';
import { DayItem, DayInterface } from './components/day-item/day-item.component';
import { WeekForecastListContainer } from './week-forecast-list.styles';

interface WeekForecastListProps {
  data: DayInterface[];
  isLoading: boolean;
}

function WeekForecastList({ isLoading, data }: WeekForecastListProps) {
  return (
    <div>
      <Cloud />
      <WeekForecastListContainer>
        {!isLoading && (
          <>
            {data.map((dayData) => (
              <DayItem key={Math.random()} data={dayData} />
            ))}
          </>
        )}
        {isLoading &&
          Array.from({ length: 5 }).map(() => <DayItem key={Math.random()} isLoading />)}
      </WeekForecastListContainer>
    </div>
  );
}

export { WeekForecastList };
