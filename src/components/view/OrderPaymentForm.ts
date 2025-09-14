import { Payment, TOrderPaymentAddress } from '../../types';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class OrderPaymentForm extends Component<TOrderPaymentAddress> {
	protected errorsElement: HTMLElement;
	protected submitButton: HTMLButtonElement;
	protected cashButton: HTMLButtonElement;
	protected onlineButton: HTMLButtonElement;
	protected addressInput: HTMLInputElement;
	protected events: IEvents;
	protected payment: string;
	protected inputsValues: Record<string, string> = {};


	constructor(container: HTMLFormElement, events: IEvents) {
		super(container);

		this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', container);
		this.events = events;
		this.cashButton = ensureElement<HTMLButtonElement>('button[name=cash]', container);
		this.onlineButton = ensureElement<HTMLButtonElement>('button[name=card]', container);
		this.addressInput = ensureElement<HTMLInputElement>('input[name=address]', container);
		this.errorsElement = ensureElement<HTMLElement>('.form__errors', container);
		let _payment = '';

		this.cashButton.addEventListener('click', ()=> {
			_payment = 'cash';
			this.payment = _payment;
			this.inputOrder();
			console.log('Я кнопка, и слыыышу', this.payment);

		});

		this.onlineButton.addEventListener('click', ()=> {
			_payment = 'online';
			this.payment = _payment;
			this.inputOrder();
			console.log('Я кнопка, и яслыышу', this.payment);

		});

		this.addressInput.addEventListener('input', () => {
			this.inputOrder();
			console.log('Я инпут, и я слыышу', this.inputsValues);
		});

		this.submitButton.addEventListener('submit', (evt: SubmitEvent) => {
			evt.preventDefault();
			events.emit('orderPaymentForm:submit');
		});

	}

	set errors(value: string) {
		this.setText(this.errorsElement, value);
	}

	set valid(value: boolean) {
		this.setDisabled(this.submitButton, !value);
	}

	set address(value: string) {
		this.addressInput.value = value;
	}

	protected inputOrder() {
		this.updateInputValues();
		this.events.emit('orderPaymentForm:changed', this.inputsValues);
		console.log('Я эмиттер, я отправляю',this.inputsValues);
	}

	protected updateInputValues() {
		this.inputsValues = {
			address: this.addressInput.value,
			payment: this.payment
		};
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