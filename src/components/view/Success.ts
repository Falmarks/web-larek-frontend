import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { ISuccess } from '../../types';

export class Success extends Component<ISuccess> {
	protected successButton: HTMLButtonElement;
	protected totalPrice: HTMLElement;
	protected events: IEvents;

	constructor(container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this.successButton = ensureElement<HTMLButtonElement>('.order-success__close', container);
		this.totalPrice = ensureElement<HTMLElement>('.order-success__description', container);

		this.successButton.addEventListener('click', () => {
			events.emit('success');
		});
	}

	set total(value: number) {
		this.setText(this.totalPrice, `Списано ${value} синапсов`);
	}
}