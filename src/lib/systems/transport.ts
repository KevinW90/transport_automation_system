// all transport logic

import { writable } from 'svelte/store';
import type { Passenger } from './passenger';

export const default_transport_data: TransportData = {
	id: '',
	status: '',
	monitor: '',
	coordinator: ''
};

type TransportStatus = 'current' | 'completed' | '';

export type TransportData = {
	id: string;
	status: TransportStatus;
	monitor: string;
	coordinator: string;
};

export class Transport {
	private _data: TransportData;

	/**
	 * A transport should be initialized with data.
	 *
	 * This data data can come from two sources:
	 * 1) Database
	 * 2) Frontend
	 */
	constructor(data: TransportData) {
		this._data = { ...data };
	}

	// getters
	get id(): string {
		return this._data.id;
	}

	get status(): TransportStatus {
		return this._data.status;
	}

	get monitor(): string {
		return this._data.monitor;
	}

	get coordinator(): string {
		return this._data.coordinator;
	}
	///////////

	// setters
	set id(value: TransportData['id']) {
		this._data.id = value;
	}

	set status(value: TransportData['status']) {
		this._data.status = value;
	}

	set monitor(value: TransportData['monitor']) {
		this._data.monitor = value;
	}

	set coordinator(value: TransportData['coordinator']) {
		this._data.coordinator = value;
	}
	///////////

	/**
	 * Allows update to any field on the class.
	 * Ensures field provided exists on the class.
	 *
	 * @param field The field to change
	 * @param value The new value for the field
	 * @returns Updated class instance
	 */
	update<K extends keyof TransportData>(field: K, value: TransportData[K]): Transport {
		// TODO: set the values in the database
		this._data[field] = value;

		return this;
	}

	findRoutes(passengerList: Passenger[]): { [key: string]: Passenger[] } {
		let routes: { [key: string]: Passenger[] } = {};
		passengerList.forEach((p) => {
			p.data.routes.forEach((route) => {
				route.forEach((leg) => {
					if (!routes[leg]) routes[leg] = [];
					routes[leg].push(p);
				});
			});
		});
		return routes;
	}
}

export let current_transport = writable<Transport>(new Transport(default_transport_data));
