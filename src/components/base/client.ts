export interface IClient {
	payment: 'cash' | 'card';
	address: string;
	email: string;
	phone: string;
}