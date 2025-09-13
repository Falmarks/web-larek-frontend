import {Card} from './Card';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { ICardData } from '../../types';
import { CDN_URL } from '../../utils/constants';

export class CardPreview extends Card<ICardData> {
	protected cardCategory: HTMLSpanElement
	protected cardImage: HTMLImageElement;
	protected cardDescription: HTMLElement;
	protected putButton: HTMLButtonElement;
	protected events: IEvents;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		this.cardCategory = ensureElement<HTMLSpanElement>('.card__category', container);
		this.cardImage = ensureElement<HTMLImageElement>('.card__image', container);
		this.cardDescription = ensureElement<HTMLElement>('.card__text', container);
		this.putButton = ensureElement<HTMLButtonElement>('.card__button', container);
		this.events = events;

		//events.on('modal:open', )

		this.putButton.addEventListener('click', () => {
			this.events.emit('card:put', { id: this.id });
			console.log(this.id)
		});
	}
		set category(value: string) {
			this.setText(this.cardCategory, value);
			this.toggleClass(this.cardCategory, value)
		};
		set image(value: string) {
			const trueValue = `${CDN_URL}`+`${value.slice(0, -3) + 'png'}`;
			this.setImage(this.cardImage, trueValue)
		};
		set description (value: string) {
			this.setText(this.cardDescription, value)
		};
}