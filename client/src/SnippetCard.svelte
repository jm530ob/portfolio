<script lang="ts">
  import { parseText } from "./utils/renderHtml";
  let { item, idx }: { item: BlogSnippet; idx: number } = $props();
</script>

<div class="flex flex-col bg-slate-700/30 rounded-xl">
  <div class="flex w-full px-6 py-4 gap-3 flex-wrap 2xl:flex-nowrap">
    <div
      class="flex-col items-start bg-slate-900/70 rounded-xl px-3 py-6 shrink-0 basis-64 grow 2xl:grow-0"
    >
      <div class="">
        <p class="font-bold inline">Author:</p>
        <p class="ml-1 inline">{item.author}</p>
      </div>

      <img
        alt=""
        src="https://skillicons.dev/icons?i={item.language}"
        width="40"
        class="mt-2"
      />
      <!-- todo: foreach language -->
    </div>

    <div
      class="px-3 py-6 min-w-0 bg-slate-900/70 rounded-xl overflow-hidden grow"
    >
      <h1
        class="underline underline-offset-4 decoration-yellow-100 decoration-1"
      >
        {item.title}
      </h1>
      {@html parseText(item.description)}
    </div>
  </div>
  <div class="flex items-end justify-end">
    <button class="btn w-fit m-4">Read more</button>
  </div>
</div>
