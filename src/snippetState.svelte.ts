export let snippets = $state<BlogSnippet[]>([]);

export function addSnippet(snippet: BlogSnippet) {
  snippets.push(snippet);
}

export function removeSnippet(index: number) {
  snippets.splice(index, 1);
}

export function updateSnippet(index: number, snippet: BlogSnippet) {
  snippets.splice(index, 1, snippet);
}
