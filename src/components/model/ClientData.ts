import { IClient, TClientModalNumberMail, TClientModalPaymentAddress } from '../../types';
import { IEvents } from '../base/events';

export class ClientData implements IClient {
	 payment:'cash' | 'card' | '';
	 address: string;
	 email: string;
	 phone: string;
	 events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	setClientPaymentAddress (data: IClient){
		this.payment = data.payment;
		this.address = data.address;
		this.events.emit('clientData:changed');
	}

	setClientNumberMail (data: IClient) {
		this.email = data.email;
		this.phone = data.phone;
		this.events.emit('clientData:changed');
	}

}