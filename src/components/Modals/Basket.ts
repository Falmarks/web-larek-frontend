import { IEvents } from '../base/events';
import { IBasket } from '../../types';
import { Component } from '../base/Component';
import { ensureElement } from '../../utils/utils';

export class Basket extends Component<IBasket> {
	protected events: IEvents;
	protected list: HTMLElement;
	protected orderButton: HTMLButtonElement;
	protected totalPrice: string;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		//this.list = ensureElement<HTMLElement>('.basket__list', container);
		//this.orderButton = ensureElement<HTMLButtonElement>('button', container);
		this.events = events;
		//this.orderButton.addEventListener( 'click', () => {this.events.emit('order:open');
		//});
	}


	set selected(items: string[]) {
		if (items.length) {
			this.setDisabled(this.orderButton, false);
		} else {
			this.setDisabled(this.orderButton, true);
		}
	}
//	set total(total: number) {
//		this.setText(this.total, formatNumber(total));
//	}
}