import {Card} from './Card';
import { IEvents } from '../base/events';
import { ICardBasket } from '../../types';

export class CardBasket extends Card<ICardBasket> {
	protected events: IEvents;
	protected cardIndex: HTMLSpanElement;
	protected deleteButton: HTMLButtonElement;

	constructor(protected template: HTMLTemplateElement, events: IEvents) {
		super(template);
		this.cardIndex = this.template.querySelector('.basket__item-index');
		this.deleteButton = this.template.querySelector('.card__button');
		this.events = events;

		this.deleteButton.addEventListener('click', () =>
			super.events.emit('card:delete', { card: this })
		);
	}

	set index(value: number) {this.setText(this.cardIndex, value);}
}