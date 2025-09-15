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
		this.events.emit('clientData:changed');
	}

	setClientAddress(value: Partial<TOrderPaymentAddress>) {
		this.client.address = value.address;
		this.events.emit('clientData:changed');
	}

	setClientPhone(value: Partial<TOrderNumberMail>) {
		this.client.phone = value.phone;
		this.events.emit('clientData:changed');
	}

	setClientEmail(value: Partial<TOrderNumberMail>) {
		this.client.email = value.email;
		this.events.emit('clientData:changed');
	}

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
	clearData() {
		if (this.client) {
			this.client = {
				payment: '',
				phone: '',
				email: '',
				address: ''
			};
		} else {
			console.error('Клиент не инициализирован');
		}
		this.events.emit(`clientData:changed`);
	};
}
