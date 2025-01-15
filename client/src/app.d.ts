declare global {
  namespace App {

  }

  interface BlogSnippet {
    _id: ObjectID,
    author: string,
    title: string,
    language?: string,
    description: string,
    body: string,
    date?: string
  }

  export type PageData = {
    blogs: BlogSnippet[];
    userObj: any;
  };

}

export { };
