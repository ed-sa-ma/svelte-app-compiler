<div class="header">
	<img class="image" src="https://upload.wikimedia.org/wikipedia/commons/thumb/1/1b/Svelte_Logo.svg/996px-Svelte_Logo.svg.png" alt="Svelte logo" />
	<div class="text vertical-spacing-2">
    <h1>Welcome</h1>
    <p>This is a test app where we can see the result ofk Svelte components along with the output JavaScript generated. Svelte itself is stored in this same repo to be able to make changes in the compiler and see the result live.</p>
  </div>
</div>

<style>
  .header {
    display: flex;
    align-items: center;
  }
  
  .text {
    display: flex;
    flex-direction: column; 
    align-items: center;
    margin-left: 2rem;
  }
  
	.image {
    width: 70%;
		max-width: 200px;
	}
  
  @media (max-width: 1000px) {
    .header {
      flex-direction: column;
    }

    .text {
      margin-left: 0;
      margin-top: 2rem;
    }
  }
</style>