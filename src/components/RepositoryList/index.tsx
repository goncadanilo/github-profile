import { RepositoryCard } from 'src/components/RepositoryCard';
import { BackButton } from 'src/components/BackButton';
import { Repository } from 'src/types/github';

import styles from './styles.module.scss';

interface RepositoryListProps {
  repositories: Repository[];
  title: string;
}

export function RepositoryList({ repositories, title }: RepositoryListProps) {
  return (
    <div className={styles.container}>
      <BackButton />

      <h2>{title}</h2>

      <div className={styles.list}>
        {repositories?.map((repository) => (
          <RepositoryCard key={repository.id} repository={repository} />
        ))}
      </div>
    </div>
  );
}
