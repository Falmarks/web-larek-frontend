import {Card} from './Card';
import { IEvents } from '../base/events';

export class CardCatalog extends Card {
	protected cardCategory: HTMLSpanElement;
	protected cardImage: HTMLDivElement;
	protected openButton: HTMLButtonElement;
	protected events: IEvents;

	constructor(protected template: HTMLTemplateElement, events: IEvents) {
		super(template);
		this.cardCategory = this.template.querySelector('.card__category');
		this.cardImage = this.template.querySelector('.card__image');
		this.openButton = this.template.querySelector('.gallery__item');
		//this.events = events;
		//this.openButton.addEventListener('click', () =>
		//	super.events.emit('card:open', { card: this })
		//);
	}

}