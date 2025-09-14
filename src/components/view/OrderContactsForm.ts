import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { TOrderNumberMail } from '../../types';


export class OrderContactsForm extends Component<TOrderNumberMail>  {

	protected emailInputElement: HTMLInputElement;
	protected phoneInputElement: HTMLInputElement;
	protected events: IEvents;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container);
		this.events = events;
		this.emailInputElement = ensureElement<HTMLInputElement>('input[name=email]', container);
		this.phoneInputElement = ensureElement<HTMLInputElement>('input[name=phone]', container);
	}

	set email(value: string) {
		this.emailInputElement.value = value;
	}

	set phone(value: string) {
		this.phoneInputElement.value = value;
	}
}