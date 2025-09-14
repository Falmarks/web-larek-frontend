import {
	IClient,
	TOrderNumberMail,
	TOrderPaymentAddress
} from '../../types';
import { IEvents } from '../base/events';

export class ClientData {
	protected events: IEvents;
	protected client: IClient = {
		payment: '',
		phone: '',
		email: '',
		address: ''
	};
	protected paymentErrors = '';
	protected contactsErrors = '';

	constructor(events: IEvents) {
		this.events = events;
	}

	setClientPayment(value: { payment: string }) {
		this.client.payment = value.payment;
		console.log('Текущие данные платежа: ',this.client.payment);
		this.events.emit('clientData:changed');
	}

	setClientAddress(value: Partial<TOrderPaymentAddress>) {
		this.client.address = value.address;
		console.log('Текущие данные адреса: ',this.client.address);
		this.events.emit('clientData:changed');
	}

	setClientPhone(value: Partial<TOrderNumberMail>) {
		this.client.phone = value.phone;
		console.log('Текущие данные номера: ',this.client.phone);
		console.dir(this.client.phone);
		console.dir(value.phone);
		console.dir(value);
		this.events.emit('clientData:changed');
	}

	setClientEmail(value: Partial<TOrderNumberMail>) {
		this.client.email = value.email;
		console.log('Текущие данные почты: ',this.client.phone);
		console.dir(this.client.email);
		console.dir(value.email);
		console.dir(value);
		this.events.emit('clientData:changed');
	}

	// Валидация для формы оплаты
	validatePayment(): boolean {
		const { payment, address } = this.client;
		this.paymentErrors = '';

		if (!payment) {
			this.paymentErrors = 'Необходимо выбрать способ оплаты';
			return false;
		}
		if (!address) {
			this.paymentErrors = 'Необходимо указать адрес';
			return false;
		}
		return true;
	}

	// Валидация для формы контактов
	validateContacts(): boolean {
		const { phone, email } = this.client;
		this.contactsErrors = '';

		if (!phone) {
			this.contactsErrors = 'Необходимо указать телефон';
			return false;
		}
		if (!email) {
			this.contactsErrors = 'Необходимо указать email';
			return false;
		}
		return true;
	}

	getPaymentErrorMessage() {
		return this.paymentErrors;
	}

	getContactsErrorMessage() {
		return this.contactsErrors;
	}

	getClientData(): IClient {
		return this.client;
	}
}
