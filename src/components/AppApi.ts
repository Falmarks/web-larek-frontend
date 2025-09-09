import { IApi, ICard, IClient, IOrder, ICheck } from '../types';
import { Api } from './base/api';


export interface IProductsData {
	items: ICard[];
	preview: string | null;
	total: number;
}

export class AppApi extends Api {

	constructor(baseUrl: string) {
		super(baseUrl);
	}

	getCards(): Promise<ICard[]> {
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