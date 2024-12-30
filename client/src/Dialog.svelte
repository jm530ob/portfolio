<script lang="ts">
  import { stringify } from "postcss";
  import { addSnippet } from "./snippetState.svelte";

  let showDialog = $state(false);
  let showDropMenu = $state(true);

  let template: BlogSnippet = {
    author: "",
    title: "",
    language: "",
    description: "",
    body: "",
  };

  export function toggle() {
    showDialog = !showDialog;
  }

  function toggleMenu() {
    showDropMenu = !showDropMenu;
  }
</script>

{#if showDialog}
  <div class="bg-slate-950/70 fixed w-full h-full">
    <dialog open={showDialog} class="flex flex-col gap-5 bg-slate-900 w-1/2">
      <!-- header -->
      <div class="flex flex-col items-end gap-1 px-4">
        <button aria-label="Close" onclick={toggle}>
          <i class="fa-solid fa-xmark text-red-800"></i>
        </button>
        {#if showDropMenu}
          <button aria-label="Wrap" onclick={toggleMenu}>
            <i class="fa-solid fa-sort-up text-gray-300"></i>
          </button>
        {:else}
          <button aria-label="Unwrap" onclick={toggleMenu}>
            <i class="fa-solid fa-sort-down text-gray-300"></i>
          </button>
        {/if}
      </div>
      <!-- -->
      {#if showDropMenu}
        <div class="ml-2">
          <label>
            <p class="text-white font-bold mb-1">Author:</p>
            <input
              type="text"
              placeholder="Author name"
              class="bg-scndary rounded placeholder-gray-600 text-white px-2 py-2"
              bind:value={template.author}
            />
          </label>
        </div>
        <div class="ml-2">
          <label>
            <p class="text-white font-bold mb-1">Blog title:</p>
            <input
              type="text"
              placeholder="Enter title"
              class="bg-scndary rounded placeholder-gray-600 text-white px-2 py-2"
              bind:value={template.title}
            />
          </label>
        </div>
        <div class="ml-2">
          <label>
            <p class="text-white font-bold mb-1">Language:</p>
            <select
              class="bg-scndary placeholder-gray-600 text-white px-2 py-2"
              bind:value={template.language}
            >
              <option>--Please choose a language--</option>
              <option>Rust</option>
              <option>C</option>
              <option>TypeScript</option>
              <option>JavaScript</option>
              <option>Other</option>
            </select>
          </label>
        </div>
        <div class="mx-2">
          <label>
            <span class="text-white font-bold mb-1">Description</span>
            <span class="text-xs text-white ml-1">(Optional)</span>
            <textarea
              placeholder="Brief description"
              class="bg-scndary placeholder-gray-600 text-white w-full h-10 resize-none px-2 py-2"
              bind:value={template.description}
            ></textarea>
          </label>
          <hr class="border-dashed border-gray-500 mt-1" />
        </div>
      {/if}
      <div class="mx-2">
        <label>
          <p class="text-white font-bold mb-1">Body</p>
          <textarea
            class="bg-scndary placeholder-gray-600 text-white w-full px-2 py-2"
            placeholder="Write your blog"
            bind:value={template.body}
          ></textarea>
        </label>
      </div>
      <button
        class="btn self-end last:mt-0 mr-2 mb-2"
        onclick={async () => {
          toggle();
          addSnippet(template);
          try {
            let obj: BlogSnippet = {
              author: template.author,
              language: template.language,
              title: template.title,
              description: template.description,
              body: template.body,
            };

            let response = await fetch("/api", {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(obj),
            });
            if (!response.ok) {
              // todo: error popup
              throw new Error("Failed to submit data");
            }
          } catch (e) {
            console.log(e);
          }
        }}>Submit</button
      >
    </dialog>
  </div>
{/if}
