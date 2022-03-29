import { useRouter } from 'next/router';

export default function Repos() {
  const routes = useRouter();
  const { username } = routes.query;
  return <h1>{username}/repos</h1>;
}
