import { Repository } from 'src/types/github';
import { FaRegStar } from 'react-icons/fa';
import { HiCode } from 'react-icons/hi';
import { BiBookBookmark, BiGitRepoForked } from 'react-icons/bi';

import styles from './styles.module.scss';

interface RepositoryCardProps {
  repository: Repository;
}

export function RepositoryCard({ repository }: RepositoryCardProps) {
  return (
    <div className={styles.repositoryCard}>
      <a href={repository.html_url} target="_blank" rel="noreferrer">
        <BiBookBookmark />
        {repository.name}
      </a>

      <div className={styles.repositoryInfo}>
        <p>
          <FaRegStar />
          {repository.stargazers_count}
        </p>

        <p>
          <BiGitRepoForked />
          {repository.forks}
        </p>

        {repository.language && (
          <p>
            <HiCode />
            {}
            {repository.language}
          </p>
        )}
      </div>

      <p>{repository.description}</p>
    </div>
  );
}
