import type { TransportData } from '$lib/systems/transport';

const database: {
	transports: TransportData[];
} = {
	transports: [
		{
			id: '1',
			status: 'completed',
			monitor: 'a',
			coordinator: 'b'
		},
		{
			id: '2',
			status: 'completed',
			monitor: 'c',
			coordinator: 'd'
		},
		{
			id: '3',
			status: 'completed',
			monitor: 'e',
			coordinator: 'f'
		}
	]
};

export function find(value: string): TransportData | null {
	for (const t of database.transports) {
		for (const key of Object.keys(t)) {
			if (t[key as keyof TransportData] === value) {
				return t;
			}
		}
	}

	return null;
}
