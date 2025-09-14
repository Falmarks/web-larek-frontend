import {
	ICheck,
	ICardData,
	IOrderData,
} from '../types';
import { Api } from './base/api';


export interface IProductsData {
	items: ICardData[];
	preview: string | null;
	total: number;
}

export class AppApi extends Api {

	constructor(baseUrl: string) {
		super(baseUrl);
	}

	getCards(): Promise<ICardData[]> {
		return this.get('/product')
			.then((cards: IProductsData) => {
				return cards.items
			})
	}

	postOrder(data: IOrderData): Promise<ICheck> {
		return this.post<ICheck>('/order', data, 'POST')
			.then((response: ICheck) => {
				return response;
			})
	}
}