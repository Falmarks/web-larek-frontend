
export interface IClient {
	payment: 'cash' | 'card' | '';
	address: string;
	email: string;
	phone: string;
}

export interface IOrder extends IClient {
	total: number;
	items: string[];
}

export interface  ICheck {
	id: string;
	total: number;
}

export interface ICardData {
	id: string;
	title: string;
	price: number | null;
	category: string;
	image: string;
	description: string;
	index?: number;
}

export type ICardCatalog = Pick <ICardData, 'id' | 'title' | 'price' | 'category' | 'image'>

export type ICardBasket = Pick <ICardData, 'id' | 'title' | 'price' | 'index'>

export interface IModal {
	content: HTMLElement;
}

export interface IHeader {
	counter: number;
}

export interface IBasket {
	list: string;
	button: string;
	total: string;
}

export type ApiPostMethods = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface IApi {
	baseURL: string;
	get<T>(url: string): Promise<T>;
	post<T>(url: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TClientModalPaymentAddress = Pick<IClient, 'payment' | 'address'>;

export type TClientModalNumberMail = Pick<IClient, 'email' | 'phone'>;


