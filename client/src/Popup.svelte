<script lang="ts">
  import { MessageState } from "./types";
  import { onMount } from "svelte";
  let {
    msg = $bindable(),
    stateInfo,
  }: { msg: string | null; stateInfo: MessageState } = $props();
  let isMoved = $state(false);
  let visible = $state(true);

  onMount(() => {
    setTimeout(() => {
      isMoved = true;
    }, 200);

    setTimeout(() => {
      visible = false;
      msg = null;
    }, 2000);
  });
</script>

{#if visible}
  <div
    class="absolute bg-slate-950/90 rounded-lg left-1/2 -translate-x-1/2 top-0 transition-all duration-500"
    class:top-12={isMoved}
  >
    <div class="m-4">
      <p class="text-sky-100">{msg}</p>
    </div>
    {#if stateInfo == MessageState.LOADING}
      <div class="h-1 bg-gray-700 rounded-lg"></div>
    {:else if stateInfo == MessageState.SUCCESS}
      <div class="h-1 bg-green-700 rounded-lg"></div>
    {:else}
      <div class="h-1 bg-red-700 rounded-lg"></div>
    {/if}
  </div>
{/if}
