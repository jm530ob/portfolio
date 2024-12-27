declare global {
  namespace App {

  }

  interface BlogSnippet {
    author: string,
    title: string,
    language: string | null,
    description: string,
    body: string,
  }

}

export { };
