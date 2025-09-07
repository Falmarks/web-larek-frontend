import {Card} from './Card';
import { ICard } from '../../types';
import { IEvents } from '../base/events';

export class CardPreview extends Card {
	protected cardCategory: HTMLSpanElement;
	protected cardImage: HTMLDivElement;
	protected cardDescription: HTMLElement;
	protected putButton: HTMLButtonElement;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container, events);
		this.cardCategory = this.container.querySelector('.card__category');
		this.cardImage = this.container.querySelector('.card__image');
		this.cardDescription = this.container.querySelector('.card__text');
		this.putButton = this.container.querySelector('.card__button');

		this.cardImage.addEventListener('click', () =>
			super.events.emit('card:select', { card: this })
		);
		this.putButton.addEventListener('click', () =>
			super.events.emit('card:put', { card: this })
		);
	}
}