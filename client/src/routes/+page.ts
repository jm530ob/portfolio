import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch("/res");
  const blogs = await res.json() as BlogSnippet[];

  const auth = await fetch("/auth/user", {
    method: "POST",
    credentials: "include",
  });
  let userObj: any = await auth.json();


  return {
    blogs,
    userObj
  };

};
