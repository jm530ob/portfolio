<script lang="ts">
  import "../app.css";
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import SnippetCard from "../SnippetCard.svelte";
  import Dialog from "../Dialog.svelte";
  import { snippets, addSnippet } from "../snippetState.svelte";

  // svelte-ignore non_reactive_update
  let dialog;
  let open = $state(false);

  let template: BlogSnippet = {
    author: "",
    title: "",
    language: "",
    description: "",
    body: "",
  };
</script>

<svelte:head>
  <title>Portfolio</title>
</svelte:head>

<Dialog bind:this={dialog} />

<header
  class="flex flex-col m-auto w-1/2 text-center items-center bg-slate-900"
>
  <div class="flex flex-col w-fit text-left mt-2">
    <h1>Jakub Martenek</h1>
    <span>
      <i class="fa-brands fa-github"></i>
      <a href="https://github.com/jm530ob" class="link"> jm530ob </a></span
    >
    <p>This is where I will be blogging about my projects!</p>
  </div>
  <div class="w-full flex justify-evenly py-3">
    <span>
      <i class="fa-regular fa-envelope"></i>
      <p class="inline ml-2 link">j.martenek@azet.sk</p>
    </span>
    <span>
      <i class="fa-brands fa-discord"></i>
      <p class="inline ml-2 link">anathrax</p>
    </span>
    <span>
      <i class="fa-brands fa-linkedin"></i>
      <p class="inline ml-2 link">linkedin</p>
    </span>
  </div>
  <div class="w-full text-right px-6 py-2">
    <hr class="border-dashed border-gray-500" />
    <button
      class="mt-2 bg-yellow-100 hover:bg-yellow-200 text-black font-bold text-sm px-2 py-1 rounded"
      onclick={dialog.toggle}>Submit blog</button
    >
  </div>
</header>

<style lang="postcss">
  :global(body) {
    @apply bg-slate-950;
    @apply text-sky-100;
  }
  :global(h1) {
    @apply text-2xl font-bold;
  }
  .link {
    @apply font-bold text-sm text-yellow-50 hover:underline cursor-pointer inline;
  }
</style>
