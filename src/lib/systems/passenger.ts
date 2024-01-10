// all passenger logic

import { get } from 'svelte/store';
import { current_transport } from './transport';

type PassengerType = 'puppy' | 'small adult' | 'adult';
type PassengerCategory = 'dog' | 'cat';
type PassengerGender = 'M' | 'F';

type PassengerData = {
	transport_id: string;
	// id: string;
	// image_id: string;
	// type: PassengerType;
	// category: PassengerCategory;
	name: string;
	// age: string;
	// description: string;
	// gender: PassengerGender;
	// weight: number;
	// start: string;
	// destination: string;
	// is_altered: boolean;
	// is_flight_risk: boolean;
	// is_hw_treated: boolean;
	routes: string[][];
	// medications: string[]
	// ride_option: 'crate' | 'tether' | 'any'
};

export class Passenger {
	private _data: PassengerData;

	constructor(data: PassengerData) {
		this._data = { ...data };
	}

	get data() {
		return this._data;
	}
}

export function createFakePassengerData(count: number): Passenger[] {
	const cur_transport = get(current_transport);

	const passengers: Passenger[] = [];
	for (let i = 0; i < count; i++) {
		const p = new Passenger({
			transport_id: cur_transport.id,
			name: `Passenger ${i + 1}`,
			routes: [['a', 'b', 'c']]
		});

		passengers.push(p);
	}

	return passengers;
}
