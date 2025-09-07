import { IApi, ICard, IClient, IOrder, ICheck } from '../types';

export class AppApi {
	private _baseApi: IApi;

	constructor(baseApi: IApi) {
		this._baseApi = baseApi;
	}

	getCards(): Promise<ICard[]> {
		return this._baseApi.get<ICard[]>(`/product`).then((cards: ICard[]) => cards);
	}

	postOrder(data: IOrder) :Promise<ICheck> {
		return this._baseApi.post<ICheck>(`/order`, data).then((response: ICheck) => response);
	}

}
