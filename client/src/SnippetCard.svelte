<script lang="ts">
  let { item, idx }: { item: BlogSnippet; idx: number } = $props();
</script>

<!-- todo: fetchnut cas a dat ho na pravo -->
<div class="flex bg-main rounded shadow-md px-6 py-4 gap-3">
  <div class="w-fit flex-col flex gap-4">
    <span class="font-bold">
      {item.author}
    </span>
    <span class="font-bold">
      {item.language}
    </span>
  </div>
  <div class="flex flex-col">
    <div class="w-fit text-sky-200">
      <h1>{item.title}</h1>
    </div>
    <div class="overflow-hidden">
      <span class="w-full">{item.description}</span>
    </div>
    <button class="btn w-fit">Read more</button>
  </div>
</div>
