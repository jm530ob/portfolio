<script lang="ts">
  import type { PageData } from "./$types";
  import "../app.css";
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import SnippetCard from "../SnippetCard.svelte";
  import Dialog from "../Dialog.svelte";

  let { data }: { data: PageData } = $props();

  // svelte-ignore non_reactive_update
  let dialog;
</script>

<svelte:head>
  <title>Portfolio</title>
</svelte:head>

<Dialog bind:this={dialog} />

<header
  class="flex flex-col m-auto text-center items-center bg-main text-lg px-6 py-4 md:text-xl md:w-5/6 lg:w-1/2 md:mt-3 md:py-2"
>
  <div class="flex flex-col w-fit text-left mt-2">
    <h1>Jakub Martenek</h1>
    <span>
      <i class="fa-brands fa-github"></i>
      <a href="https://github.com/jm530ob" class="link"> jm530ob </a></span
    >
    <p>This is where I will be blogging about my projects!</p>
  </div>
  <div class="w-full py-3 flex justify-evenly">
    <span>
      <a href="mailto:j.martenek@azet.sk" class="ml-2">
        <i class="fa-regular fa-envelope icon"></i>
        <p class="link ml-2 hidden md:inline">j.martenek@azet.sk</p></a
      >
    </span>
    <span>
      <a href="" class="ml-2">
        <i class="fa-brands fa-discord icon"></i>
        <p class="link ml-2 hidden md:inline">anathrax</p></a
      >
    </span>
    <span>
      <a href="" class="ml-2">
        <i class="fa-brands fa-linkedin icon"></i>
        <p class="link ml-2 hidden md:inline">linkedin</p></a
      >
    </span>
  </div>
  <div class="w-full text-right">
    <hr class="border-dashed border-gray-500" />
    <button class="btn" onclick={dialog.toggle}>Submit blog</button>
  </div>
</header>

<main class="px-6 m-auto md:w-5/6 lg:w-1/2 text-left bg-main">
  {#if data.items}
    {#each data.items as item, idx}
      <SnippetCard {item} {idx} />
    {/each}
  {:else}
    <!-- todo: error popup -->
  {/if}
</main>

<style lang="postcss">
  :global(body) {
    @apply bg-slate-950;
    @apply text-sky-100;
    @apply text-xl;
  }
  :global(h1) {
    @apply text-3xl font-bold;
  }
  :global(.bg-main) {
    @apply bg-slate-900;
  }
  :global(.bg-scndary) {
    @apply bg-slate-950;
  }
  :global(.btn) {
    @apply mt-2 bg-slate-800 text-sky-100 text-base font-bold px-2 py-1 rounded-sm relative z-[1] before:content-[''] before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-yellow-100 before:rounded-sm before:-z-[1] before:duration-150 hover:before:w-full hover:duration-300 hover:text-slate-950;
  }
  .icon {
    @apply text-2xl px-2 py-1 border-slate-900 rounded-lg border bg-slate-800 md:text-xl md:border-0 md:px-0 md:py-0 md:bg-transparent;
  }
  .link {
    @apply font-bold text-lg text-yellow-50 hover:underline cursor-pointer;
  }
</style>
