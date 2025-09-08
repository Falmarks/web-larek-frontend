import { IApi, ICard, IClient, IOrder, ICheck } from '../types';
import { Api } from './base/api';

export class AppApi extends Api {

	constructor(baseUrl: string) {
		super(baseUrl);
	}

	getCards(): Promise<ICard[]> {
		return this.get<ICard[]>('/product')
			.then((cards: ICard[]) => {
				return cards;
			})
	}

	postOrder(data: IOrder): Promise<ICheck> {
		return this.post<ICheck>('/order', data)
			.then((response: ICheck) => {
				return response;
			})
	}
}
