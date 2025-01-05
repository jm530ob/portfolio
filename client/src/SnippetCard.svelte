<script lang="ts">
  let { item, idx }: { item: BlogSnippet; idx: number } = $props();
</script>

<!-- todo: fetchnut cas a dat ho na pravo -->
<div class="flex flex-col px-6">
  <div class="flex bg-main px-6 py-4 gap-3">
    <div
      class="flex-col flex w-64 gap-2 items-start bg-slate-700/50 rounded-lg px-3 py-6"
    >
      <div>
        <span class="font-bold">Author: </span>
        <span class="ml-1">{item.author}</span>
      </div>

      <img
        alt=""
        src="https://skillicons.dev/icons?i={item.language}"
        width="40"
      />
      <!-- todo: foreach language -->
    </div>
    <div class="flex flex-col rounded-lg px-3 py-6">
      <div class="w-fit">
        <h1>{item.title}</h1>
      </div>
      <div class="">
        <p class="">{item.description}</p>
      </div>
    </div>
  </div>
  <div class="flex items-end justify-end">
    <button class="btn w-fit">Read more</button>
  </div>
</div>
