import {Card} from './Card';
import { IEvents } from '../base/events';
import { ICardBasket } from '../../types';
import { ensureElement } from '../../utils/utils';

export class CardBasket extends Card<ICardBasket> {
	protected events: IEvents;
	protected cardIndex: HTMLSpanElement;
	protected deleteButton: HTMLButtonElement;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		this.cardIndex = ensureElement<HTMLSpanElement>('.basket__item-index', container);
		this.deleteButton = ensureElement<HTMLButtonElement>('.card__button', container);
		this.events = events;

		this.deleteButton.addEventListener('click', () =>
			this.events.emit('card:delete', this)
		);
	}

	set index(value: number) {this.setText(this.cardIndex, value);}
}