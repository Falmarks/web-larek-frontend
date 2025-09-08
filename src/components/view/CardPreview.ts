import {Card} from './Card';
import { IEvents } from '../base/events';

export class CardPreview extends Card {
	protected cardCategory: HTMLSpanElement;
	protected cardImage: HTMLDivElement;
	protected cardDescription: HTMLElement;
	protected putButton: HTMLButtonElement;
	protected events: IEvents;

	constructor(protected template: HTMLTemplateElement, events: IEvents) {
		super(template);
		this.cardCategory = this.container.querySelector('.card__category');
		this.cardImage = this.container.querySelector('.card__image');
		this.cardDescription = this.container.querySelector('.card__text');
		this.putButton = this.container.querySelector('.card__button');
		this.events = events;

		this.putButton.addEventListener('click', () =>
			super.events.emit('card:put', { card: this })
		);
	}
}