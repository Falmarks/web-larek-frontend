import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class Form<T> extends Component<T> {
	protected form: HTMLFormElement;
	protected errorsElement: HTMLElement;
	protected submitButton: HTMLButtonElement;
	protected events: IEvents;

	constructor(container: HTMLFormElement, events: IEvents) {
		super(container);
		this.form = container;
		this.events = events;
		this.submitButton = ensureElement<HTMLButtonElement>('button[type=submit]', container);
		this.errorsElement = ensureElement<HTMLElement>('.form__errors', container);

	}

	set errors(value: string) {
		this.setText(this.errorsElement, value);
	}

	set valid(value: boolean) {
		this.setDisabled(this.submitButton, !value);
	}
	protected clear(): void {
		this.form.reset();
		this.errors = '';
	}

}