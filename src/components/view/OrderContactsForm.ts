import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { TOrderNumberMail } from '../../types';
import { Form } from './Form';

export class OrderContactsForm extends Form<TOrderNumberMail>  {
	protected emailInput: HTMLInputElement;
	protected phoneInput: HTMLInputElement;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container, events);

		this.emailInput = ensureElement<HTMLInputElement>('input[name=email]', container);
		this.phoneInput = ensureElement<HTMLInputElement>('input[name=phone]', container);

		this.emailInput.addEventListener('input', () => {
			console.log('Фиксирую ввод почты', this.emailInput.value);
			this.events.emit('orderContactsForm:changedEmailInput', {email: this.emailInput.value});
		});

		this.phoneInput.addEventListener('input', () => {
			console.log('Фиксирую ввод номера', this.phoneInput.value);
			this.events.emit('orderContactsForm:changedPhoneInput', {phone: this.phoneInput.value});
		});

		this.form.addEventListener('submit', (evt: SubmitEvent) => {
			evt.preventDefault();
			events.emit('orderContactsForm:submit');
		});
	}
}