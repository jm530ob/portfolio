export let snippets = $state<BlogSnippet[]>([]);


// todo: add snippet
export function addSnippet(snippet: BlogSnippet) {
  snippets.push(snippet);
}


// todo: remove snippet
export function removeSnippet(index: number) {
  snippets.splice(index, 1);
}


export function updateSnippet(index: number, snippet: BlogSnippet) {
  snippets.splice(index, 1, snippet);
}
