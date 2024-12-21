<script lang="ts">
  let open = $state(false);

  export function toggle() {
    open = !open;
  }
</script>

{#if open}
  <div class="bg-slate-950/70 fixed w-full h-full">
    <dialog {open} class="flex flex-col gap-2 mt-3 bg-slate-900 w-1/2">
      <div>
        <label>
          <p class="text-white inline">Author:</p>
          <input
            type="text"
            placeholder="Author name"
            class="bg-slate-950 rounded ml-2 placeholder-gray-600 text-white"
          />
        </label>
      </div>
      <div>
        <label>
          <p class="text-white inline">Blog title:</p>
          <input
            type="text"
            placeholder="Enter title"
            class="bg-slate-950 rounded ml-2 placeholder-gray-600 text-white"
          />
        </label>
      </div>
      <div>
        <label>
          <p class="text-white inline">Language:</p>
          <select class="bg-slate-950 placeholder-gray-600 text-white">
            <option>--Please choose a language--</option>
            <option>Rust</option>
            <option>C</option>
            <option>TypeScript</option>
            <option>JavaScript</option>
            <option>Other</option>
          </select>
        </label>
      </div>
    </dialog>
  </div>
{/if}
