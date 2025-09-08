import {Card} from './Card';
import { IEvents } from '../base/events';

export class CardBasket extends Card {
	protected cardItemIndex: HTMLDivElement;
	protected deleteButton: HTMLButtonElement;
	protected events: IEvents;

	constructor(protected template: HTMLTemplateElement, events: IEvents) {
		super(template);
		this.cardItemIndex = this.template.querySelector('.card__category');
		this.deleteButton = this.template.querySelector('.card__button');
		this.events = events;

		this.deleteButton.addEventListener('click', () =>
			super.events.emit('card:delete', { card: this })
		);
	}
}