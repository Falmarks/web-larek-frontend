import {Card} from './Card';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { ICardCatalog } from '../../types';
import { CDN_URL } from '../../utils/constants';

export class CardCatalog extends Card <ICardCatalog>{
	protected cardCategory: HTMLSpanElement;
	protected cardClass: Record<string, string>
	protected cardImage: HTMLImageElement;
	protected events: IEvents;

	constructor(protected container: HTMLElement, events: IEvents, category: Record<string, string>) {
		super(container);
		this.cardClass = category;
		this.cardCategory = ensureElement<HTMLElement>('.card__category', container);
		this.cardImage = ensureElement<HTMLImageElement>('.card__image', container);
		this.events = events;

		this.container.addEventListener('click', () => {
			this.events.emit('card:open', {id: this.id})
			console.log(this.id)}
		);
	};

	set category(value: string) {
		const valueClass: string = this.cardClass[value];
		this.setText(this.cardCategory, value);
		this.toggleClass(this.cardCategory, valueClass)
	};
	set image(value: string) {
		const trueValue = `${CDN_URL}`+`${value.slice(0, -3) + 'png'}`;
		this.setImage(this.cardImage, trueValue)
	};
}