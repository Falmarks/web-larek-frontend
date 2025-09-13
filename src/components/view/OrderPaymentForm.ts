import { Payment, TClientModalPaymentAddress } from '../../types';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class OrderPaymentForm extends Component<TClientModalPaymentAddress> {
	protected cashButton: HTMLButtonElement;
	protected onlineButton: HTMLButtonElement;
	protected addressInput: HTMLInputElement;
	protected events: IEvents;
	protected checkPayment: boolean;
	protected payment: string;


	constructor(container: HTMLFormElement, events: IEvents) {
		super(container);

		this.events = events;
		this.cashButton = ensureElement<HTMLInputElement>('.button_alt[name=cash]', container);
		this.onlineButton = ensureElement<HTMLInputElement>('.button_alt[name=card]', container);
		this.addressInput = ensureElement<HTMLInputElement>('input[name=address]', container);
		let _payment = '';

		this.cashButton.addEventListener('click', ()=> {
			_payment = 'cash';
			this.payment = _payment;
			this.events.emit(`orderPayment:changed`, {payment: this.payment});
		});

		this.onlineButton.addEventListener('click', ()=> {
			_payment = 'online';
			this.payment = _payment;
			this.events.emit(`orderPayment:changed`, {payment: this.payment});
		});

	}

	set address(value: string) {
		this.addressInput.value = value;
	}

	set paymentMethod(value: Payment) {
		if (value === 'online') {
			this.onlineButton.classList.add('button_alt-active');
			this.cashButton.classList.remove('button_alt-active');
		} else {
			this.cashButton.classList.add('button_alt-active');
			this.onlineButton.classList.remove('button_alt-active');
		}
	}
}