import type { PageLoad } from './$types';

export const load: PageLoad = async ({ fetch }) => {
  const res = await fetch("/res");
  const data = await res.json();
  const blogs: BlogSnippet[] = data.data || [];
  // console.log(data.data);

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
