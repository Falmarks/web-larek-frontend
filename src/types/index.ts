
export interface IClient {
	payment: string;
	address: string;
	email: string;
	phone: string;
}



export interface IOrderData {
	payment: string;
	email: string;
	phone: string;
	address: string;
	total: number;
	valid?: boolean;
	errors?: string;
	items: string[];
}

export type TOrderPaymentAddress = Pick<IOrderData, 'payment' | 'address' | 'valid' | 'errors'>;

export type TOrderNumberMail = Pick<IOrderData, 'email' | 'phone' | 'valid' | 'errors'>;

export interface  ICheck {
	id: string;
	total: number;
}

export interface ICardData {
	id: string;
	title: string;
	price: number | null;
	displayPrice: string | number;
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
	count: number;
}

export interface IBasket {
	list: HTMLElement[];
	button: string;
	total: number;
	valid: boolean;
}

export interface ISuccess {
	total: number;
}

export type ApiPostMethods = 'POST' | 'PUT' | 'PATCH' | 'DELETE';
export type Payment = 'cash' | 'card' | '';

export interface IApi {
	baseURL: string;
	get<T>(url: string): Promise<T>;
	post<T>(url: string, data: object, method?: ApiPostMethods): Promise<T>;
}