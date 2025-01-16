<script lang="ts">
  import { parseText } from "./utils/renderHtml";
  import { goto } from "$app/navigation";
  let { item, idx }: { item: BlogSnippet; idx: number } = $props();
  let id = item._id.toString();

  function redirectToBlog() {
    goto(`/blogs/${id}`);
  }
</script>

<div class="flex flex-col bg-slate-700/30 rounded-xl">
  <div class="flex w-full px-6 pt-4 pb-1 gap-3 flex-wrap 2xl:flex-nowrap">
    <div
      class="flex-col items-start bg-slate-900/70 rounded-xl px-3 py-6 shrink-0 basis-64 grow 2xl:grow-0"
    >
      <div class="">
        <p class="inline">By</p>
        <p class="ml-1 inline font-bold">{item.author}</p>
      </div>

      {#if Array.isArray(item.language)}
        <ul class="flex flex-wrap gap-2">
          {#each item.language as language}
            <li class="inline">
              <img
                alt=""
                src="https://skillicons.dev/icons?i={language}"
                width="40"
                class="mt-2 inline"
              />
            </li>
          {/each}
        </ul>
      {:else}
        <img
          alt=""
          src="https://skillicons.dev/icons?i={item.language}"
          width="40"
          class="mt-2"
        />
      {/if}
    </div>

    <div
      class="px-3 py-6 min-w-0 bg-slate-900/70 rounded-xl overflow-hidden grow"
    >
      <h1
        class="underline underline-offset-4 decoration-yellow-100 decoration-1"
      >
        {item.title}
      </h1>
      <div class="text-sky-100/80 pt-2 line-clamp-2">
        {@html parseText(item.description)}
      </div>
    </div>
  </div>
  <div class="flex items-end justify-start metadata relative">
    <div class="">
      {item.date}
    </div>
    <div class="hidden sm:flex sm: gap-6">
      <span class="">
        <i class="fa-solid fa-thumbs-up"></i> 0
      </span>
      <span class="">
        <i class="fa-solid fa-comment"></i> 0
      </span>
    </div>
    <div class="absolute right-0">
      <button
        class="btn w-fit"
        onclick={() => {
          redirectToBlog();
        }}>Read more</button
      >
    </div>
  </div>
</div>

<style lang="postcss">
  .metadata div {
    @apply m-4;
  }
</style>
