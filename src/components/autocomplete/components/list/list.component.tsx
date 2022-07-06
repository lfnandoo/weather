import { Skeleton } from '../../../skeleton/skeleton.styles';
import { ListContainer, UlList } from './list.styles';

function List({
  items,
  isLoading,
  onClick,
}: {
  items: { description: string }[];
  isLoading: boolean;
  onClick: (index: number) => void;
}) {
  return (
    <ListContainer>
      <UlList>
        {!isLoading && (
          <>
            {items.map((item, index) => (
              <li key={Math.random()} onClick={() => onClick(index)}>
                {item.description}
              </li>
            ))}
            {items.length === 0 && <p>Nenhum resultado encontrado</p>}
          </>
        )}
        {isLoading &&
          Array.from({ length: 3 }).map(() => (
            <li key={Math.random()}>
              <Skeleton width="150px" height="20px" />
            </li>
          ))}
      </UlList>
    </ListContainer>
  );
}

export { List };
