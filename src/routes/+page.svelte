<script lang="ts">
  let open = true;

  function displayDialog() {
    open = !open;
  }
</script>

<svelte:head>
  <title>Portfolio</title>
</svelte:head>

<div class="center">
  <div style="background-color: blue;">
    <p>Welcome</p>
  </div>
  <button onclick={displayDialog}>Create blog</button>
</div>

<div>
  <dialog {open}>
    <label>
      <p>Author:</p>
      <input type="text" placeholder="Enter your name" />
    </label>
    <label>
      <p>Blog title</p>
      <input type="text" placeholder="Enter title" />
    </label>
    <label>
      <p>Language</p>
      <select>
        <option value="">--Please choose a language--</option>
        <option value="rust">Rust</option>
        <option value="c">C</option>
        <option value="ts">TypeScript</option>
        <option value="js">JavaScript</option>
      </select>
    </label>
    <label>
      <p>Description (optional)</p>
      <textarea placeholder="Brief description"></textarea>
    </label>
    <label>
      <p>Body</p>
      <textarea placeholder="Write your blog"></textarea>
    </label>
  </dialog>
</div>

<style>
  :global {
    .center {
      margin: auto;
      width: 50%;
      text-align: center;
    }
    dialog {
      border-width: 1px;
      border-radius: 20px;
      border-color: gray;
    }
  }
</style>
