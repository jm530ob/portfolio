<script lang="ts">
  import "../app.css";
  import SnippetCard from "../SnippetCard.svelte";
  import { snippets, addSnippet } from "../snippetState.svelte";

  let open = $state(false);

  let template: BlogSnippet = $state({
    author: "",
    title: "",
    language: "",
    description: "",
    body: "",
  });

  function toggleDialog() {
    open = !open;
  }
</script>

<svelte:head>
  <title>Portfolio</title>
</svelte:head>

<div class="m-auto w-1/2 text-font-bold text-center">
  <button
    class="mt-4 py-2 px-4 bg-zinc-100 rounded-xl shadow-md"
    onclick={toggleDialog}>Create blog</button
  >
  <div>
    {#each snippets as snippet, index}
      <SnippetCard {snippet} {index} />
    {/each}
  </div>
</div>

<div>
  <dialog {open}>
    <label>
      <p>Author:</p>
      <input
        type="text"
        placeholder="Enter your name"
        bind:value={template.author}
      />
    </label>
    <label>
      <p>Blog title</p>
      <input
        type="text"
        placeholder="Enter title"
        bind:value={template.title}
      />
    </label>
    <label>
      <p>Language</p>
      <select>
        <option value="">--Please choose a language--</option>
        <option value="rust">Rust</option>
        <option value="c">C</option>
        <option value="ts">TypeScript</option>
        <option value="js">JavaScript</option>
      </select>
    </label>
    <label>
      <p>Description (optional)</p>
      <textarea
        placeholder="Brief description"
        bind:value={template.description}
      ></textarea>
    </label>
    <label>
      <p>Body</p>
      <textarea placeholder="Write your blog" bind:value={template.body}
      ></textarea>
    </label>
    <div style="margin-top: 20px;">
      <button
        onclick={() => {
          addSnippet(template);
        }}>Submit</button
      >
      <button
        onclick={() => {
          toggleDialog();
        }}>Close</button
      >
    </div>
  </dialog>
</div>

<style lang="postcss">
  :global(html) {
    background-color: theme(colors.sky.100);
  }
</style>
