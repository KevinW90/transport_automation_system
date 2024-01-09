// all transport logic

export const default_transport_data: TransportData = {
	id: '',
	status: 'current',
	monitor: '',
	coordinator: ''
};

export type TransportData = {
	id: string;
	status: 'current' | 'completed';
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

	// getters
	get id(): string {
		return this._data.id;
	}

	get status(): 'current' | 'completed' {
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
}
