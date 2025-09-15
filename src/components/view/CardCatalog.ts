import {Card} from './Card';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { ICardCatalog } from '../../types';

export class CardCatalog extends Card <ICardCatalog>{
	constructor(protected container: HTMLElement, events: IEvents, category: Record<string, string>) {
		super(container, events);
		this.cardCategory = ensureElement<HTMLElement>('.card__category', container);
		this.cardImage = ensureElement<HTMLImageElement>('.card__image', container);
		this.cardClass = category;

		this.container.addEventListener('click', () => {
			this.events.emit('card:open', {id: this.id})
			console.log(this.id)}
		);
	};
}