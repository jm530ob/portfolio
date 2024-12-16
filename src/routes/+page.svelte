<script lang="ts">
  let firstName = $state("");
  let lastName = $state("");
  let fullName = $derived(`${firstName} - ${lastName}`);
  let text: string | null = "";

  function stlacMa() {
    // text = e.target.value;
    // console.log(e.target.value);
  }

  function handleInput(e: any) {
    firstName = e.target.value;
  }

  
</script>


<h1 style="color: {text};">{text}</h1>
<p>{fullName}</p>
<!-- <input type="text" on:input={handleInput}> -->
<input type="text" bind:value={firstName}>
<input type="text" bind:value={lastName}>
<button on:click="{stlacMa}" style="background-color: #f8f9fa;border: 1px solid #f8f9fa;border-radius: 4px;color: #3c4043;cursor: pointer;font-family: arial,sans-serif;font-size: 14px;height: 36px;line-height: 27px;min-width: 54px;padding: 0 16px;text-align: center; user-select: none; -webkit-user-select: none; touch-action: manipulation;">Gombik</button>
