import { ApiPostMethods, IApi } from '../../types';

export type ApiListResponse<Type> = {
	total: number,
	items: Type[]
};

export class Api implements IApi {
    readonly baseUrl: string;

    constructor(baseUrl: string) {
        this.baseUrl = baseUrl;
    }
    baseURL: string;

    protected handleResponse<T>(response: Response): Promise<T> {
        if (response.ok) return response.json();
        else return response.json()
            .then(data => Promise.reject(data.error ?? response.statusText));
    }

    get<T>(uri: string) {
        return fetch(this.baseUrl + uri, {
            method: 'GET'
        }).then(this.handleResponse<T>);
    }

    post<T>(uri: string, data: object, method: ApiPostMethods = 'POST') {
        return fetch(this.baseUrl + uri, {
					method,
					body: JSON.stringify(data),
				}).then(this.handleResponse<T>);
    }
}