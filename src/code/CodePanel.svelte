<script>
  import Prism from 'svelte-prismjs';
	
  export let code = "";
</script>

<div class="prism-wrapper">
  {#if code}
   <Prism language="js">{code}</Prism>
  {/if}
</div>

<style>
  .prism-wrapper {
    max-width: 100%;
    overflow: auto;
    max-height: 500px;
  }
</style>
