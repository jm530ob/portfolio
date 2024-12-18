<script lang="ts">
  let { snippet, index }: { snippet: BlogSnippet; index: number } = $props();
</script>

<div>
  <span>{snippet.author} -- {snippet.title} -- {snippet.language}</span>
  <div>
    <textarea>{snippet.description}</textarea>
  </div>
</div>
