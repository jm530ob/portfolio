"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.snippets = void 0;
exports.addSnippet = addSnippet;
exports.removeSnippet = removeSnippet;
exports.updateSnippet = updateSnippet;
exports.snippets = $state([]);
function addSnippet(snippet) {
    exports.snippets.push(snippet);
}
function removeSnippet(index) {
    exports.snippets.splice(index, 1);
}
function updateSnippet(index, snippet) {
    exports.snippets.splice(index, 1, snippet);
}
