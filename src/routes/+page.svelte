<script lang="ts">
	import { fade } from 'svelte/transition';
  let firstName = $state("");
  let lastName = $state("");
  let fullName = $derived(`${firstName} - ${lastName}`);
  let text: string | null = "";
  let answer = 42;
  let items = [1, 2, 3, 4, 5];
	let visible = $state(false);
	let tortilla = $state('Plain');
  function stlacMa() {
    // text = e.target.value;
    // console.log(e.target.value);
  }

  function handleInput(e: any) {
    firstName = e.target.value;
  }

  
</script>

<svelte:head>
	<title>Hello world!</title>
	<meta name="description" content="This is where the description goes for SEO" />
</svelte:head>

<h1>Shopping list</h1>
<ul>
	{#each items as item}
		<li>{item} x {item}</li>
	{/each}
</ul>

{#if visible}
	<div transition:fade>fades in and out</div>
{/if}
{#if visible}
	<div transition:fade={{ duration: 2000 }}>fades in and out over two seconds</div>
{/if}
<button onclick={() => visible = !visible}>toggle</button>
<!-- grouped radio inputs are mutually exclusive -->
<input type="text" bind:group={tortilla} value="Plain" />
<input type="text" bind:group={tortilla} value="Whole wheat" />
<input type="text" bind:group={tortilla} value="Spinach" />
<h1 style="color: {text};">{text}</h1>
<p>{fullName}</p>
<!-- <input type="text" on:input={handleInput}> -->
<input type="text" bind:value={firstName}>
<input type="text" bind:value={lastName}>
<button onclick="{stlacMa}" style="background-color: #f8f9fa;border: 1px solid #f8f9fa;border-radius: 4px;color: #3c4043;cursor: pointer;font-family: arial,sans-serif;font-size: 14px;height: 36px;line-height: 27px;min-width: 54px;padding: 0 16px;text-align: center; user-select: none; -webkit-user-select: none; touch-action: manipulation;">Gombik</button>
