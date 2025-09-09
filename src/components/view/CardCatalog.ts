import {Card} from './Card';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

export class CardCatalog extends Card {
	protected cardCategory: HTMLSpanElement;
	protected cardImage: HTMLDivElement;
	protected openButton: HTMLButtonElement;
	protected events: IEvents;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		this.cardCategory = ensureElement<HTMLElement>('.card__category', container);
		this.cardImage = ensureElement<HTMLDivElement>('.card__image', container);
		//this.openButton = ensureElement<HTMLButtonElement>('.gallery__item', container);
		//this.events = events;
		//this.openButton.addEventListener('click', () =>
		//	super.events.emit('card:open', { card: this })
		//);
	}

}