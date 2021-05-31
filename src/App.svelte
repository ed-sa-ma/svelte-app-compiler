<script>
	import Header from "./Header.svelte";
	import Whiteboard from "./Whiteboard.svelte";
	import Sample from "./sample/Sample.svelte";
	import CodeDisplay from "./code/CodeDisplay.svelte";
</script>

<div class="content vertical-spacing-2">
	<Header />
	<Whiteboard>
		<Sample />
	</Whiteboard>
	<CodeDisplay />
</div>

<style>
	.content {
		max-width: 1000px;
		display: flex;
		flex-direction: column; 
		align-items: center;
		padding: 3rem 0;
		margin: auto;
	}
</style>