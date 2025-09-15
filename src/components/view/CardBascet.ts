import { IEvents } from '../base/events';
import { Card } from './Card';
import { ICardBasket } from '../../types';
import { ensureElement } from '../../utils/utils';

export class CardBasket extends Card<ICardBasket>{
	protected deleteButton: HTMLButtonElement;
	protected cardIndex: HTMLSpanElement;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container, events);
		this.cardIndex = ensureElement<HTMLSpanElement>('.basket__item-index', container);
		this.deleteButton = ensureElement<HTMLButtonElement>('.card__button', container);
		this.deleteButton.addEventListener('click', () =>
			this.events.emit('card:delete', this)
		);
	}
	set index(value: number) {this.setText(this.cardIndex, value);}
}