import type { PageServerLoad } from './$types';

export const load: PageServerLoad = async ({ fetch }) => {
  try {

    const res = await fetch(`/api`);
    const items: BlogSnippet[] = await res.json();
    return { items };
  }
  catch (e) {
    console.log(e);
  }

};
