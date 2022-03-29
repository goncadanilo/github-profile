import { RepositoryCard } from 'src/components/RepositoryCard';
import { BackButton } from 'src/components/BackButton';
import { Repository } from 'src/types/github';

import styles from './styles.module.scss';

interface RepositoryListProps {
  repositories: Repository[];
  title: string;
  displayOwner?: boolean;
}

export function RepositoryList({
  repositories,
  title,
  displayOwner = false,
}: RepositoryListProps) {
  return (
    <div className={styles.container}>
      <BackButton />

      <h2>{title}</h2>

      {repositories?.length > 0 ? (
        <div className={styles.list}>
          {repositories.map((repository) => (
            <RepositoryCard
              displayOwner={displayOwner}
              key={repository.id}
              repository={repository}
            />
          ))}
        </div>
      ) : (
        <span>Nenhum repositório encontrado</span>
      )}
    </div>
  );
}
