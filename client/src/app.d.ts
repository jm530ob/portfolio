declare global {
  namespace App {

  }

  interface BlogSnippet {
    author: string,
    title: string,
    language?: string,
    description: string,
    body: string,
    date?: string
  }

}

export { };
