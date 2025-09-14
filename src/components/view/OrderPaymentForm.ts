import { TOrderPaymentAddress } from '../../types';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { Form } from './Form';

export class OrderPaymentForm extends Form<TOrderPaymentAddress> {
	protected cashButton: HTMLButtonElement;
	protected onlineButton: HTMLButtonElement;
	protected addressInput: HTMLInputElement;


	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this.cashButton = ensureElement<HTMLButtonElement>('button[name=cash]', container);
		this.onlineButton = ensureElement<HTMLButtonElement>('button[name=card]', container);
		this.addressInput = ensureElement<HTMLInputElement>('input[name=address]', container);

		this.cashButton.addEventListener('click', ()=> {
			this.events.emit('orderPaymentForm:changedButton', {payment:'cash'});
		});

		this.onlineButton.addEventListener('click', ()=> {
			this.events.emit('orderPaymentForm:changedButton', {payment: 'card'});
		});

		this.addressInput.addEventListener('input', () => {
			this.events.emit('orderPaymentForm:changedInput', {address: this.addressInput.value});
		});

		this.form.addEventListener('submit', (evt: SubmitEvent) => {
			evt.preventDefault();
			this.clear();
			events.emit('orderPaymentForm:submit');
		});
	}

	set paymentMethod(value: string) {
		if (value === 'card') {
			this.onlineButton.classList.add('button_alt-active');
			this.cashButton.classList.remove('button_alt-active');
		} else {
			this.cashButton.classList.add('button_alt-active');
			this.onlineButton.classList.remove('button_alt-active');
		}
	}
}