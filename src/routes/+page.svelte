<script lang="ts">
	import * as Database from '$lib/services/database';
	import {
		Transport,
		default_transport_data,
		type TransportData,
		current_transport
	} from '$lib/systems/transport';
	import { onMount } from 'svelte';

	// state
	let routes: string[] = [];
	let loading = false;
	let error: string = '';

	// Page loads with 'current' as the selected view option
	onMount(() => {
		// Database tries to find a current transport (status)
		let data = Database.find('current');
		// If it exists, it is loaded into the transport object
		if (data) current_transport.set(new Transport(data));
	});

	// Database tries to find a transport with that date
	// If it exists, we know it is not current or it would have found it, so error
	// If it does not exist, we can update the transport object with the new date

	// Transport does not exist (create a new one)
	let adminList = ['Melissa Helgerburth', 'Kenneth Bronstein', 'Angela DeCote'];

	/**
	 * Handle change event
	 * @param e Event
	 */
	function handleChange(e: Event) {
		const target = e.target as HTMLSelectElement;
		const field = target.name as keyof TransportData;
		const value = target.value;

		error = '';
		// User has selected a date
		if (field === 'id' && value) {
			// Let the user know it is loading
			loading = true;

			// Database tries to find a transport with that date
			const db_transport = Database.find(value);
			// Mock the database returning a response
			setTimeout(() => {
				// No longer loading when response is received
				loading = false;

				// If it exists, we know it is not current or it would have found it, so error
				if (db_transport) return (error = 'Transport already exists');

				// At this point, we know it does not exist, so we can find the details
				current_transport.update((prev) => {
					const updated_transport = prev!.update('id', value);
					return updated_transport;
				});
				// TODO: Get the passengers from the Transport Chart
				// routes = ['1', '2', '3'];
			}, 2000);
		}
		// User has selected the default date option
		if (field === 'id' && !value) loading = false;

		// Update the transport object with the new value
		current_transport.update((prev) => {
			const updated_transport = prev!.update(field, value);
			return updated_transport;
		});
	}
</script>

{#if $current_transport.status !== 'current'}
	<div>There is no current transport</div>
	<button
		on:click={() => {
			current_transport.update((prev) => {
				const updated_transport = prev.update('status', 'current');
				return updated_transport;
			});
		}}>New Transport</button
	>
{:else}
	<label>
		Start Date
		<select name="id" bind:value={$current_transport.id} on:change={handleChange}>
			<option value="">Choose a date</option>
			<option value="01-06-24">01-06-24</option>
			<option value="1">1</option>
		</select>
	</label>

	{#if $current_transport.id}
		<label>
			Coordinator
			<select
				name="coordinator"
				bind:value={$current_transport.coordinator}
				on:change={handleChange}
			>
				<option value="">Choose a coordinator</option>
				{#each adminList as c}
					<option value={c}>{c}</option>
				{/each}
			</select>
		</label>

		<label>
			Monitor
			<select name="monitor" bind:value={$current_transport.monitor} on:change={handleChange}>
				<option value="">Choose a monitor</option>
				{#each adminList as c}
					<option value={c}>{c}</option>
				{/each}
			</select>
		</label>
	{/if}

	{#if error}
		<div>{error}</div>
	{:else if !$current_transport.id}
		<div>Choose a date to find the transport data</div>
	{:else if loading}
		<div>Creating transport for {$current_transport.id}</div>
	{:else if routes.length === 0}
		<div>There were no routes found. Check the Transport Chart.</div>
	{:else}
		{#each routes as route}
			<div>{route}</div>
		{/each}
	{/if}
{/if}
