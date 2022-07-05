import { Cloud } from './components/cloud/cloud.component';
import { DayItem, DayInterface } from './components/day-item/day-item.component';
import { DaysDegreesListContainer } from './days-degrees-list.styles';

function DaysDegreesList({ isLoading }: { isLoading: boolean }) {
  const days: DayInterface[] = [
    {
      description: 'Amanhã',
      nowDegrees: '32',
      minimumDegrees: '21',
    },
    {
      description: 'Terça-feira',
      nowDegrees: '32',
      minimumDegrees: '21',
    },
    {
      description: 'Quarta-feira',
      nowDegrees: '32',
      minimumDegrees: '21',
    },
    {
      description: 'Quinta-feira',
      nowDegrees: '32',
      minimumDegrees: '21',
    },
    {
      description: 'Sexta-feira',
      nowDegrees: '32',
      minimumDegrees: '21',
    },
  ];

  return (
    <div>
      <Cloud />
      <DaysDegreesListContainer>
        {!isLoading && days.map((dayData) => <DayItem key={Math.random()} data={dayData} />)}
        {isLoading &&
          Array.from({ length: 5 }).map(() => <DayItem key={Math.random()} isLoading />)}
      </DaysDegreesListContainer>
    </div>
  );
}

export { DaysDegreesList };
