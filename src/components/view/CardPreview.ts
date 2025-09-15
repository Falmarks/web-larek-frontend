import {Card} from './Card';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';
import { ICardData } from '../../types';

export class CardPreview extends Card<ICardData> {
	protected cardDescription: HTMLElement;
	protected putButton: HTMLButtonElement;
	protected isInCart = false; // Хранит состояние

	constructor(
		protected container: HTMLElement,
		events: IEvents,
		category: Record<string, string>
	) {
		super(container, events);
		this.cardDescription = ensureElement<HTMLElement>('.card__text', container);
		this.putButton = ensureElement<HTMLButtonElement>('.card__button', container);
		this.cardImage = ensureElement<HTMLImageElement>('.card__image', container);
		this.cardClass = category;
		this.cardCategory = ensureElement<HTMLSpanElement>('.card__category', container);
		this.cardClass = category;

		this.updateButtonText();

		this.putButton.addEventListener('click', () => {
			this.isInCart = !this.isInCart;
			this.updateButtonText();

			this.events.emit('card:put', {
				id: this.id,
				action: this.isInCart ? 'remove' : 'add'
			});
		});
	}

	setState(isInCart: boolean) {
		this.isInCart = isInCart;
		this.updateButtonText();
	}

	protected updateButtonText() {
		this.setText(this.putButton, this.isInCart ? 'Удалить из корзины' : 'Купить');
	}

	set price(value: number | null) {
		if (value === null) {
			this.setText(this.cardPrice, 'Бесценно');
			this.setDisabled(this.putButton, true);
		} else {
			this.setText(this.cardPrice, `${value} синапсов`);
			this.setDisabled(this.putButton, false);
		}
	}

	set description(value: string) {
		this.setText(this.cardDescription, value);
	}
}
