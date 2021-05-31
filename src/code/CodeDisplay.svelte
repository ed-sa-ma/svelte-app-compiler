<script>
  import { fade } from "svelte/transition";
  import CodePanel from "./CodePanel.svelte";
  import * as compiled from "../../compiled/index.js";
  import Tabs from "./Tabs.svelte";

  $: tabs = Object.keys(compiled);
  $: files = Object.entries(compiled);

  let selected;
</script>

<Tabs {tabs} bind:selected />
<div class="pannels-wrapper">
  {#each files as [name, code]}
    {#if selected === name}
    <div class="pannel" in:fade="{{ duration: 200, delay: 400 }}" out:fade="{{ duration: 200 }}">
      <CodePanel code="{code}" />
    </div>
    {/if}
  {/each}
</div>

<style>
  .pannels-wrapper {
    position: relative;

    height: 500px;
    width: 100%;
    margin-top: 1rem;
  }

  .pannel {
    position: absolute;
    top: 0;
    left: 50%;
    
    max-width: 100%;
    transform: translateX(-50%);
  }
</style>
