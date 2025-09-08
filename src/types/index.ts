import { Card } from '../components/view/Card';

export interface ICard {
	_id: string;
	title: string;
	category: string;
	description: string;
	price: number | null;
	image: string;
	putValidation(price: number | null): boolean;
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

export interface ICardsData {
	//_cards: ICard[];
	//cardid: string | null;
	getCard(cardId: string): ICard;
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
