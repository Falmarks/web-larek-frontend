import {Card} from './Card';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { ICardData } from '../../types';
import { CDN_URL } from '../../utils/constants';

export class CardPreview extends Card<ICardData> {
	protected cardClass: Record<string, string>
	protected cardCategory: HTMLSpanElement
	protected cardImage: HTMLImageElement;
	protected cardDescription: HTMLElement;
	protected putButton: HTMLButtonElement;
	protected isInCart = false;
	protected events: IEvents;

	constructor(protected container: HTMLElement, events: IEvents, category: Record<string, string>) {
		super(container);
		this.cardCategory = ensureElement<HTMLSpanElement>('.card__category', container);
		this.cardImage = ensureElement<HTMLImageElement>('.card__image', container);
		this.cardDescription = ensureElement<HTMLElement>('.card__text', container);
		this.putButton = ensureElement<HTMLButtonElement>('.card__button', container);
		this.events = events;
		this.cardClass = category;

		//events.on('modal:open', )

		this.putButton.addEventListener('click', () => {
			// Переключаем состояние
			this.isInCart = !this.isInCart;

			// Меняем текст кнопки в зависимости от состояния
			this.putButton.textContent = this.isInCart
				? 'Удалить из корзины'
				: 'Купить';

			// Эмиттим событие с текущим состоянием
			this.events.emit('card:put', {
				id: this.id,
				action: this.isInCart ? 'remove' : 'add'
			});
		});
	}
		set category(value: string) {
			const valueClass: string = this.cardClass[value];
			this.setText(this.cardCategory, value);
			this.toggleClass(this.cardCategory, valueClass, true)
		};
		set image(value: string) {
			const trueValue = `${CDN_URL}`+`${value.slice(0, -3) + 'png'}`;
			this.setImage(this.cardImage, trueValue)
		};
		set description (value: string) {
			this.setText(this.cardDescription, value)
		};
}