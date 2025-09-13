import { IEvents } from '../base/events';
import { IBasket, ICardBasket } from '../../types';
import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

export class Basket extends Component<IBasket> {
	protected events: IEvents;
	protected basketList: HTMLElement;
	protected totalPrice: HTMLSpanElement;
	protected orderButton: HTMLButtonElement;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		this.totalPrice = ensureElement<HTMLSpanElement>('.basket__price', container);
		this.orderButton = ensureElement<HTMLButtonElement>('.button', container);
		this.basketList = ensureElement<HTMLElement>('.basket__list', container);
		this.events = events;

		this.orderButton.addEventListener('click', () => {
			this.events.emit('orderPaymentForm:open');
		});
	}
	set list(value: HTMLElement[]) {
		this.basketList.replaceChildren(...value);
	}

	set total(value: string) {
		this.setText(this.totalPrice, `${value} синапсов`);
	}

	set valid(value: boolean) {
		this.setDisabled(this.orderButton, !value);
	}

}