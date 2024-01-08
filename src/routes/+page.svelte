<script lang="ts">
	import { Transport, type TransportData } from '$lib/systems/transport';

	let transport: Transport | null = null;

	let adminList = ['Melissa Helgerburth', 'Kenneth Bronstein', 'Angela DeCote'];
	let searching = false;
	let searchTimer: ReturnType<typeof setTimeout> | null = null;

	function update(e: Event) {
		const t = e.target as HTMLSelectElement;
		const field = t.name as keyof TransportData;
		const value = (e.target as HTMLSelectElement).value;

		console.log(t.name);
		transport = transport?.update(field, value) || null;

		if (field === 'id' && value) {
			searching = true;

			if (searchTimer) clearTimeout(searchTimer);

			searchTimer = setTimeout(() => {
				routes = Math.random() < 0.5 ? ['1', '2', '3'] : [];
				searching = false;
			}, 5000);
		}

		if (field === 'id' && !value) searching = false;
	}

	const default_transport: TransportData = {
		id: '',
		status: 'current',
		coordinator: '',
		monitor: ''
	};

	let routes: string[] = [];
</script>

{#if !transport}
	<div>There is no current transport</div>
	<button
		on:click={() => {
			transport = new Transport(default_transport);
		}}>New Transport</button
	>
{:else}
	<label>
		Start Date
		<select name="id" bind:value={transport.id} on:change={update}>
			<option value="">Choose a date</option>
			<option value="01-06-24">01-06-24</option>
		</select>
	</label>

	<label>
		Coordinator
		<select name="coordinator" bind:value={transport.coordinator} on:change={update}>
			<option value="">Choose a coordinator</option>
			{#each adminList as c}
				<option value={c}>{c}</option>
			{/each}
		</select>
	</label>

	<label>
		Monitor
		<select name="monitor" bind:value={transport.monitor} on:change={update}>
			<option value="">Choose a monitor</option>
			{#each adminList as c}
				<option value={c}>{c}</option>
			{/each}
		</select>
	</label>

	{#if searching}
		<div>Searching for transport: {transport.id}</div>
	{:else if !transport.id}
		<div>Choose a date to find the transport data</div>
	{:else if routes.length === 0}
		<div>There were no routes found. add passengers</div>
	{:else}
		{#each routes as route}
			<div>{route}</div>
		{/each}
	{/if}
{/if}
