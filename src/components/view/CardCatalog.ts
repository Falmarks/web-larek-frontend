import {Card} from './Card';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { ICardCatalog } from '../../types';
import { CDN_URL } from '../../utils/constants';

export class CardCatalog extends Card <ICardCatalog>{
	protected cardCategory: HTMLSpanElement;
	protected cardImage: HTMLImageElement;
	protected events: IEvents;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		this.cardCategory = ensureElement<HTMLElement>('.card__category', container);
		this.cardImage = ensureElement<HTMLImageElement>('.card__image', container);
		this.events = events;

		this.container.addEventListener('click', () => {
			this.events.emit('card:open', {id: this.id})
			console.log(this.id)}
		);
	};

	set category(value: string) {
		this.setText(this.cardCategory, value);
		this.toggleClass(this.cardCategory, value)
	};
	set image(value: string) {
		const trueValue = `${CDN_URL}`+`${value.slice(0, -3) + 'png'}`;
		this.setImage(this.cardImage, trueValue)
	};
}