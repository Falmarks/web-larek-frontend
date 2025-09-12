import { IEvents } from '../base/events';
import { IBasket } from '../../types';
import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

export class Basket extends Component<IBasket> {
	protected events: IEvents;
	protected basketList: HTMLElement;
	protected orderButton: HTMLButtonElement;
	protected totalPrice: HTMLSpanElement;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		this.totalPrice = ensureElement<HTMLSpanElement>('.basket__price', container);
		this.orderButton = ensureElement<HTMLButtonElement>('.button', container);
		this.basketList = ensureElement<HTMLElement>('.basket__list', container);
		this.events = events;

		this.orderButton.addEventListener('click', () => {
			this.events.emit('order:open');
		});
	}

	set valid(value: boolean) {
		this.setDisabled(this.orderButton, !value);
	}


	set total(value: string) {
			this.setText(this.totalPrice, '${value} синапсов');
	}
}