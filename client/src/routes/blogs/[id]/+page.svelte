<script lang="ts">
  import "../../../app.css";
  import type { PageData } from "./$types";

  let { data }: { data: PageData } = $props();
</script>

<h1>{data.title}</h1>
<p>{data.description}</p>
