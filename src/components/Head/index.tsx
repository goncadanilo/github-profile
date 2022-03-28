import NextHead from 'next/head';

interface HeadProps {
  title: string;
}

export function Head({ title }: HeadProps) {
  return (
    <NextHead>
      <meta name="description" content="Encontre usuários do Github" />
      <title>{title}</title>
    </NextHead>
  );
}
