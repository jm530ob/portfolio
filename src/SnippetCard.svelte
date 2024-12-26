<script lang="ts">
  let { snippet, idx }: { snippet: BlogSnippet; index: number } = $props();
</script>

<div class="flex flex-col bg-main rounded shadow-md px-6 py-4 gap-3">
  <div class="w-fit flex gap-4">
    <span class="text-sm font-bold">
      {snippet.author}
    </span>
    <span> • </span>
    <span class="text-sm font-bold">
      Primary language : {snippet.language}
    </span>
  </div>
  <div class="w-fit text-sky-200">
    <h1>{snippet.title}</h1>
  </div>
  <div class="overflow-hidden">
    <span class="w-full text-sky-100">{snippet.description}</span>
  </div>
  <button class="btn w-fit">Read more</button>
</div>
