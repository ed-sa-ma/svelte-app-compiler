<script>
  export let tabs = [];
  export let selected = tabs[0];
</script>

<div class="tabs">
  {#each tabs as tab}
  <button class={`tab no-btn ${selected === tab ? "selected" : ""}`.trim()} on:click="{() => selected = tab}" tab-index="0">
    <div class="background" />
      <span class="text">{`${tab}.svelte`}</span>
      <div class="hightlight left" />
      <div class="hightlight right" />
    </button>
  {/each}
</div>

<style>
  .tabs {
    width: 100%;
    display: flex;
  }

  .tab {
    position: relative;

    background: transparent;
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    padding: 1rem 2rem;
  }

  .tab .background {
    --selected-background: linear-gradient(transparent,rgba(255, 51, 0, 0.4));
    --focus-background: linear-gradient(transparent, rgba(255, 51, 0, 0.2));
    position: absolute;
    bottom: 0;
    left: 0;
    right: 0;

    transition: max-height 0.5s ease-out;
    height: 100%;
    max-height: 0;
    border-top-right-radius: 5px;
    border-top-left-radius: 5px;
  }
  
  .tab:focus .background {
    background: var(--focus-background);
  }

  .tab.selected .background {
    background: var(--selected-background);
  }

  .tab.selected .background,
  .tab:focus .background {
    max-height: 100%;
  }
  
  .tab .text {
    position: relative;
  }

  .tab .hightlight {
    position: absolute;
    bottom: 0;
    
    transition: max-width 0.3s ease-in-out;
    height: 3px;
    max-width: 0;
    width: 50%;
    background-color: var(--primary);
  }
  
  .tab .hightlight.right {
    left: 50%;
  }

  .tab .hightlight.left {
    right: 50%;
  }

  .tab:hover .hightlight, .tab.selected .hightlight {
    max-width: 50%;
  }

</style>
