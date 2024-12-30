<script lang="ts">
  let { item, idx }: { item: BlogSnippet; idx: number } = $props();
</script>

<div class="flex flex-col bg-main rounded shadow-md px-6 py-4 gap-3">
  <div class="w-fit flex gap-4">
    <span class="font-bold">
      {item.author}
    </span>
    <span> • </span>
    <span class="font-bold">
      Primary language : {item.language}
    </span>
  </div>
  <div class="w-fit text-sky-200">
    <h1>{item.title}</h1>
  </div>
  <div class="overflow-hidden">
    <span class="w-full">{item.description}</span>
  </div>
  <button class="btn w-fit">Read more</button>
</div>
