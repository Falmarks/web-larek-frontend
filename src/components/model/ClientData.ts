import {
	IClient,
	Payment,
	TClientModalNumberMail,
	TClientModalPaymentAddress,
} from '../../types';
import { IEvents } from '../base/events';

export class ClientData {
	protected events: IEvents;
	protected client: IClient = {
		payment: '',
		phone: '',
		email: '',
		address: '',
		checkPayment: false
	}
	protected errorMessage: string;

	constructor(events: IEvents) {
		this.events = events;
	}

	setClientPayment (value: Payment){
		this.client.payment = value;
		this.events.emit('clientData:changed');
	}

	setClientAddress (value: TClientModalPaymentAddress){
		this.client.address = value.address;
		this.events.emit('clientData:changed');
	}

	setClientNumberMail (value: TClientModalNumberMail) {
		this.client.email = value.email;
		this.client.phone = value.phone;
		this.events.emit('clientData:changed');
	}

	checkUserValidation(inputValue: string) {
		const isPayment = this.client.payment !== '';

		this.errorMessage = '';

		if (!isPayment) {
			this.errorMessage = 'Необходимо выбрать способ оплаты'
		}
		if (!this.client.address) {
			this.errorMessage = 'Необходимо указать адрес'
		}

		return !!inputValue;
	}

	getClientData(): IClient {
		return this.client;
}

}