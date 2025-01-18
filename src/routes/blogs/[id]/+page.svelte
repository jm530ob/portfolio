<script lang="ts">
  import "../../../app.css";
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import type { PageData } from "./$types";
  import Popup from "../../../Popup.svelte";
  import { MessageState } from "../../../types";
  import { goto } from "$app/navigation";

  let { data }: { data: PageData } = $props();

  let copied = $state(false);
  function copyUrl() {
    navigator.clipboard.writeText(window.location.href);
    copied = true;

    setTimeout(() => {
      copied = false;
    }, 2000);
  }

  function goHome() {
    goto("/");
  }
</script>

<header
  class="flex flex-col m-auto text-left text-lg px-6 py-4 gap-4 md:text-xl md:mt-3 md:py-2 md:w-5/6 lg:w-1/2 bg-main"
>
  <div class="app-nav">
    <button
      onclick={() => {
        goHome();
      }}
    >
      <div>
        <i class="fa-solid fa-house"></i>
      </div>
    </button>
  </div>
  <h1 class="text-3xl font-extrabold">{data.title}</h1>
  <p class="text-xl text-sky-100/80">{data.description}</p>
  <div>
    <span class="text-sky-100/80">Published by</span>
    <span>{data.author}</span>
    <span class="mx-2">&middot;</span>
    <span class="text-sky-100/80">{data.date}</span>
  </div>
  <hr class="!border-solid !border-gray-500/50" />
  <div class="app-nav">
    <button
      onclick={() => {
        copyUrl();
      }}
    >
      <div>
        <i class="fa-solid fa-share"></i>
        <span>Share</span>
      </div>
    </button>
  </div>
  {#if copied}
    <Popup msg="Copied!" stateInfo={MessageState.SUCCESS} />
  {/if}
  <hr class="!border-solid !border-gray-500/50" />
</header>

<article
  class="px-6 py-4 m-auto md:w-5/6 lg:w-1/2 text-left flex flex-col gap-6 bg-main h-screen"
>
  <div class="text-xl">
    {data.body}
  </div>
</article>

<style lang="postcss">
  .app-nav div {
    @apply w-fit rounded-2xl px-4 py-2 border-2 border-gray-500/50 border-solid;
  }
</style>
