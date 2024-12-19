<script lang="ts">
  let { snippet, index }: { snippet: BlogSnippet; index: number } = $props();
</script>

<div class="bg-zinc-50 rounded shadow-md">
  <p class="text-left ml-4 font-bold">
    {snippet.author} -- {snippet.title} -- {snippet.language}
  </p>
  <div class="overflow-hidden">
    <textarea class="w-full bg-zinc-50 text-left m-4 text-sm"
      >{snippet.description}</textarea
    >
  </div>
</div>
