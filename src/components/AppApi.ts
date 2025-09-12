import {
	IApi,
	IClient,
	IOrder,
	ICheck,
	ICardData,
	ICardCatalog,
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

	postOrder(data: IOrder): Promise<ICheck> {
		return this.post<ICheck>('/order', data)
			.then((response: ICheck) => {
				return response;
			})
	}
}