import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params, fetch }) => {
  let id = params.id;
  let blogs = await fetch(`/res/${id}`);
  if (blogs.ok) {
    return await blogs.json();
  }

  error(404, 'Not found');
};
