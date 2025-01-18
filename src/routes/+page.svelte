<script lang="ts">
  import "../app.css";
  import "@fortawesome/fontawesome-free/css/all.min.css";
  import SnippetCard from "../SnippetCard.svelte";
  import Dialog from "../Dialog.svelte";
  import type { PageData } from "./$types";
  import Popup from "../Popup.svelte";
  import { MessageState } from "../types";

  let { data }: { data: PageData } = $props();

  // svelte-ignore non_reactive_update
  let dialog;

  let authMode = $state("");
  let username = $state("");
  let user: string | null = $state(null);
  if (data.userObj) {
    // server callback
    user = data.userObj.user;
  }
  let password = $state("");
  let errorMsg: string | null = $state(null);
  let successMsg: string | null = $state(null);
  let userRole: string | null = $state(null);
  if (data.userObj) {
    userRole = data.userObj.role;
  }
  let isLoading = $state(false);

  async function authenticate(mode: string) {
    isLoading = true;
    const url = mode == "Register" ? "/auth/register" : "/auth/login";
    const res = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    let json = await res.json();

    if (!res.ok) {
      errorMsg = json.msg;
    } else {
      successMsg = json.msg;
    }

    if (mode == "Login" && res.ok) {
      user = json.username;
      userRole = json.role;
    }
    isLoading = false;
  }
</script>

<svelte:head>
  <title>Portfolio</title>
</svelte:head>

<Dialog bind:this={dialog} />

<header
  class="flex flex-col m-auto text-center items-center bg-main text-lg px-6 py-4 md:text-lg md:mt-3 md:py-2 md:w-5/6 lg:w-1/2"
>
  <div class="flex flex-col w-fit text-left mt-2">
    <h1>Jakub Martenek</h1>
    <span>
      <i class="fa-brands fa-github"></i>
      <a href="https://github.com/jm530ob" class="link"> jm530ob </a></span
    >
    <p>This is where I will be blogging about my projects!</p>
  </div>
  <div class="w-full py-3 flex justify-evenly nav">
    <div>
      <a href="mailto:j.martenek@azet.sk">
        <i class="fa-solid fa-envelope"></i>
        <p class="link hidden md:inline">j.martenek@azet.sk</p></a
      >
    </div>
    <div>
      <a
        href="https://docs.google.com/document/d/1Go7pligLtMZwBMgWZKwnPfTS8JBuGiGPmoThUaiFDRk/edit?usp=sharing"
      >
        <i class="fa-solid fa-file"></i>
        <p class="link hidden md:inline">CV</p></a
      >
    </div>
    <div>
      <a href="https://www.linkedin.com/in/jakub-martenek-a15915282/">
        <i class="fa-brands fa-linkedin"></i>
        <p class="link hidden md:inline">linkedin</p></a
      >
    </div>
  </div>
  <div class="w-full text-right">
    <hr />

    {#snippet authBlock(authMethod: string)}
      <div class="flex flex-col items-end">
        <input
          type="text"
          class="input"
          placeholder="Username"
          bind:value={username}
        />
        <input
          type="password"
          class="input"
          placeholder="Password"
          bind:value={password}
        />
        <button
          class="btn w-fit mb-2"
          onclick={async () => {
            authenticate(authMode);
          }}>{authMethod}</button
        >
      </div>
      <hr />
    {/snippet}

    {#if user == null}
      <div class="mx-2 mt-1">
        <button
          class="link"
          onclick={() => {
            authMode = authMode == "Login" ? "" : "Login";
          }}
          >login
        </button>
        <span> / </span>
        <button
          class="link"
          onclick={() => {
            authMode = authMode == "Register" ? "" : "Register";
          }}>register</button
        >
      </div>
      {#if authMode != ""}
        {@render authBlock(authMode)}
      {/if}
    {:else}
      <div class="my-2">
        <span class="text-lg">Logged in:</span>
        <span class="font-bold text-lg">{user}</span>
      </div>
    {/if}
    {#if userRole == "Admin"}
      <div>
        <button class="btn" onclick={dialog.toggle}>Submit blog</button>
      </div>
    {/if}
  </div>

  {#if isLoading}
    <Popup msg={"Loading..."} stateInfo={MessageState.LOADING} />
  {/if}

  {#if errorMsg}
    <Popup bind:msg={errorMsg} stateInfo={MessageState.ERROR} />
  {/if}

  {#if successMsg}
    <Popup bind:msg={successMsg} stateInfo={MessageState.SUCCESS} />
  {/if}
</header>

<main
  class="px-6 py-4 m-auto md:w-5/6 lg:w-1/2 text-left bg-main flex flex-col gap-6"
>
  {#if data.blogs}
    {#each data.blogs.slice().reverse() as item, idx}
      <SnippetCard {item} {idx} />
    {/each}
  {:else}
    <!-- todo: error popup -->
    {console.log("Error")}
  {/if}
</main>

<footer class="bg-slate-800/40 pt-10 pb-10 m-auto md:w-5/6 lg:w-1/2">
  <div class="flex justify-center gap-9 my-8 footer-icons">
    <a href="https://github.com/jm530ob">
      <i class="fa-brands fa-github"></i></a
    >
    <a href="https://www.linkedin.com/in/jakub-martenek-a15915282/">
      <i class="fa-brands fa-linkedin"></i>
    </a>

    <a href="https://stackoverflow.com/users/15371533/anathrax">
      <i class="fa-brands fa-stack-overflow"></i>
    </a>
    <a href="https://medium.com/@jmartenek">
      <i class="fa-brands fa-medium"></i>
    </a>
    <a href="https://dev.to/jm530ob">
      <i class="fa-brands fa-dev"></i>
    </a>
  </div>
  <div class="flex content-center justify-center text-slate-300 footer">
    <div>
      <p>Developed by Jakub Martenek</p>
    </div>
    <div>
      <p class="inline font-bold">&copy;</p>
      <p class="inline">Copyright 2024-2025</p>
    </div>
    <div><a href="https://github.com/jm530ob/portfolio">Source Code</a></div>
  </div>
</footer>
