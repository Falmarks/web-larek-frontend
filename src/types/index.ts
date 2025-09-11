import { Card } from '../components/view/Card';

export interface ICard {
	id: string;
	title: string;
	category: string;
	price: number | null;
}

export interface ICardCatalog {
	id: string;
	title: string;
	price: number | null;
	category: string;
	image: string;
}

export interface ICardPreview {
	id: string;
	title: string;
	price: number | null;
	category: string;
	image: string;
	description: string;
}

export interface ICardBasket {
	id: string;
	title: string;
	price: number | null;
}

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
}

export interface ICardsData {
	getCard(cardId: string): ICard;
}

export interface IModal {
	content: HTMLElement;
}

export interface IHeader {counter: number;
}

export interface IBasket {
	content: HTMLElement;
}

export type ApiPostMethods = 'POST' | 'PUT' | 'PATCH' | 'DELETE';

export interface IApi {
	baseURL: string;
	get<T>(url: string): Promise<T>;
	post<T>(url: string, data: object, method?: ApiPostMethods): Promise<T>;
}

export type TClientModalPaymentAddress = Pick<IClient, 'payment' | 'address'>;

export type TClientModalNumberMail = Pick<IClient, 'email' | 'phone'>;

export type CardInfoInBasket = Pick<ICard, 'title'| 'price'>
