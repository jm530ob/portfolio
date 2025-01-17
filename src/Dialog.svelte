<script lang="ts">
  import Popup from "./Popup.svelte";
  import { addSnippet } from "./snippetState.svelte";
  import { MessageState } from "./types";

  let showDialog = $state(false);
  let showDropMenu = $state(true);

  let errMessage: string | null = $state(null);
  let successMessage: string | null = $state(null);
  let isLoading = $state(false);

  let template: BlogSnippet = {
    _id: "",
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

  async function submit() {
    isLoading = true;
    try {
      let obj: BlogSnippet = {
        _id: "",
        author: template.author,
        language: template.language,
        title: template.title,
        description: template.description,
        body: template.body,
        date: new Date().toLocaleDateString(),
      };

      let response = await fetch("/res", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(obj),
      });
      let json = await response.json();

      if (!response.ok) {
        errMessage = json.msg;
      } else {
        successMessage = json.msg;
      }
    } catch (e) {
      console.log(e);
    } finally {
      isLoading = false;
    }
  }
</script>

{#if showDialog}
  <div class="bg-slate-950/70 fixed w-full h-full z-10">
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
            <span class="text-white font-bold mb-1">Author</span>
            <span class="text-red-700">*</span>
            <input
              type="text"
              placeholder="Author name"
              class="bg-scndary rounded placeholder-gray-600 text-white px-2 py-2 block"
              bind:value={template.author}
            />
          </label>
        </div>
        <div class="ml-2">
          <label>
            <span class="text-white font-bold mb-1">Blog title</span>
            <span class="text-red-700">*</span>
            <input
              type="text"
              placeholder="Enter title"
              class="bg-scndary rounded placeholder-gray-600 text-white px-2 py-2 block"
              bind:value={template.title}
            />
          </label>
        </div>
        <div class="ml-2">
          <label>
            <span class="text-white font-bold mb-1">Language</span>
            <select
              multiple
              class="bg-scndary placeholder-gray-600 text-white px-2 py-2 block"
              bind:value={template.language}
            >
              <option value="" selected>--Please choose a language--</option>
              <option value="rust">Rust</option>
              <option value="c">C</option>
              <option value="ts">TypeScript</option>
              <option value="js">JavaScript</option>
              <option value="svelte">Svelte</option>
              <option value="react">React</option>
              <option value="tailwind">Tailwindcss</option>
            </select>
          </label>
        </div>
        <div class="mx-2">
          <label>
            <span class="text-white font-bold mb-1">Description</span>
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
          <span class="text-white font-bold mb-1">Body</span>
          <span class="text-red-700">*</span>
          <textarea
            class="bg-scndary placeholder-gray-600 text-white w-full px-2 py-2"
            placeholder="Write your blog"
            bind:value={template.body}
          ></textarea>
        </label>
      </div>
      <button
        class="btn self-end last:mt-0 mr-2 mb-2"
        onclick={() => {
          submit();
        }}>Submit</button
      >
      {#if isLoading}
        <Popup msg={"Loading..."} stateInfo={MessageState.LOADING} />
      {/if}

      {#if errMessage}
        <Popup bind:msg={errMessage} stateInfo={MessageState.ERROR} />
      {/if}

      {#if successMessage}
        <Popup bind:msg={successMessage} stateInfo={MessageState.SUCCESS} />
      {/if}
    </dialog>
  </div>
{/if}
