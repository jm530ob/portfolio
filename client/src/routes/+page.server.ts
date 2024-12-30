import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  const res = await fetch(`/api`);
  const items: BlogSnippet[] = await res.json();

  return { items };
};
