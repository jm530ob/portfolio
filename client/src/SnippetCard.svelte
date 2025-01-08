<script lang="ts">
  let { item, idx }: { item: BlogSnippet; idx: number } = $props();
</script>

<div class="flex w-full bg-main px-6 py-4 gap-3">
  <div
    class="flex-col items-start bg-slate-700/50 rounded-tr-2xl px-3 py-6 shrink-0 basis-64"
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

  <div class="px-3 py-6 min-w-0 bg-slate-700/50 rounded-bl-2xl w-full">
    <h1 class="">{item.title}</h1>
    <p class="">{item.description}</p>
  </div>
</div>
<div class="flex items-end justify-end">
  <button class="btn w-fit">Read more</button>
</div>
