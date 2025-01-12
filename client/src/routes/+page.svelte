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
  class="flex flex-col m-auto text-center items-center bg-main text-lg px-6 py-4 md:text-xl md:mt-3 md:py-2 md:w-5/6 lg:w-1/2"
>
  <div class="flex flex-col w-fit text-left mt-2">
    <h1>Jakub Martenek</h1>
    <span>
      <i class="fa-brands fa-github"></i>
      <a href="https://github.com/jm530ob" class="link"> jm530ob </a></span
    >
    <p>This is where I will be blogging about my projects!</p>
  </div>
  <div class="w-full py-3 flex justify-evenly nav">
    <div>
      <a href="mailto:j.martenek@azet.sk">
        <i class="fa-regular fa-envelope"></i>
        <p class="link hidden md:inline">j.martenek@azet.sk</p></a
      >
    </div>
    <div>
      <a href="">
        <i class="fa-solid fa-file"></i>
        <p class="link hidden md:inline">CV</p></a
      >
    </div>
    <div>
      <a href="">
        <i class="fa-brands fa-linkedin"></i>
        <p class="link hidden md:inline">linkedin</p></a
      >
    </div>
  </div>
  <div class="w-full text-right">
    <hr />
    login
    <button class="btn" onclick={dialog.toggle}>Submit blog</button>
  </div>
</header>

<main
  class="px-6 py-4 m-auto md:w-5/6 lg:w-1/2 text-left bg-main flex flex-col gap-6"
>
  {#if data.items}
    {#each data.items as item, idx}
      <SnippetCard {item} {idx} />
    {/each}
  {:else}
    <!-- todo: error popup -->
    {console.log("Error oops")}
  {/if}
</main>

<footer class="bg-slate-900/70 px-4 pt-6 pb-3 m-auto md:w-5/6 lg:w-1/2">
  <div class="flex justify-center gap-6 footer-icons">
    <div>
      <i class="fa-brands fa-github"></i>
    </div>
    <div>
      <i class="fa-brands fa-linkedin"></i>
    </div>
    <div>
      <i class="fa-brands fa-discord"></i>
    </div>
    <div>
      <i class="fa-brands fa-stack-overflow"></i>
    </div>
    <div>
      <i class="fa-brands fa-dev"></i>
    </div>
  </div>
  <div class="flex content-center justify-center text-slate-300 footer">
    <div class="">
      <p class="inline text-slate-700/90 font-bold">©</p>
      <p class="inline">Jakub Martenek 2024-2025</p>
    </div>
    <div><a href="">Source Code</a></div>
    <div><a href="">MIT</a></div>
  </div>
</footer>

<style lang="postcss">
  :global(body) {
    @apply bg-slate-900 md:bg-slate-950;
    @apply text-sky-100 text-xl font-sans;
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
    @apply mt-2 bg-slate-700/70 text-sky-100 text-base font-bold px-2 py-1 rounded-sm relative z-[1] before:content-[''] before:absolute before:top-0 before:left-0 before:w-0 before:h-full before:bg-yellow-100 before:rounded-sm before:-z-[1] before:duration-150 hover:before:w-full hover:duration-300 hover:text-slate-950;
  }
  :global(hr) {
    @apply border-dashed border-gray-500;
  }
  .nav div {
    @apply bg-slate-800 md:bg-transparent rounded-[50%] w-12 h-12 md:w-fit md:h-fit;
  }
  .nav i {
    @apply text-2xl md:text-xl px-2 py-2 md:px-0 md:py-0;
  }
  .nav p {
    @apply md:ml-2;
  }
  .footer-icons div {
    @apply flex items-center justify-center w-10 h-10 md:w-12 md:h-12  bg-slate-700/50 rounded-[50%];
  }
  .footer-icons i {
    @apply text-xl md:text-2xl;
  }
  .footer div {
    @apply m-5 basis-full text-center text-lg;
  }
  .footer a {
    @apply underline;
  }
  .link {
    @apply font-bold text-lg text-yellow-50 hover:underline cursor-pointer;
  }
</style>
