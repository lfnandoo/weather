import { Cloud } from './components/cloud/cloud.component';
import { DayItem, DayInterface } from './components/day-item/day-item.component';
import { DaysDegreesListContainer } from './days-degrees-list.styles';

function DaysDegreesList() {
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
        {days.map((dayData) => (
          <DayItem data={dayData} />
        ))}
      </DaysDegreesListContainer>
    </div>
  );
}

export { DaysDegreesList };
