<script lang="ts">
  let text: string | null = "";

  function stlacMa() {
    // text = e.target.value;
    // console.log(e.target.value);
  }

  function handleInput(e: any) {
    text = e.target.value;
  }

  
</script>


<h1 style="color: {text};">{text}</h1>
<input type="text" on:input={handleInput}>
<button on:click="{stlacMa}">gombik</button>
