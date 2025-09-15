import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { CDN_URL } from '../../utils/constants';

export class Card<T> extends Component<T>{
	protected cardClass: Record<string, string>;
	protected cardCategory: HTMLSpanElement;
	protected cardImage: HTMLImageElement;
	protected cardTitle: HTMLElement;
	protected cardPrice: HTMLSpanElement;
	protected events: IEvents;
	protected id: string;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this.cardTitle = ensureElement<HTMLElement>('.card__title', container);
		this.cardPrice = ensureElement<HTMLElement>('.card__price', container);
	}
	set category(value: string) {
		const valueClass: string = this.cardClass[value];
		this.setText(this.cardCategory, value);
		this.toggleClass(this.cardCategory, valueClass, true);
	}

	set image(value: string) {
		const trueValue = `${CDN_URL}${value.slice(0, -3) + 'png'}`;
		this.setImage(this.cardImage, trueValue);}

	set title(value: string) { this.setText(this.cardTitle, value) };
	set price(value: number | null) {
		if (value === null) {
			this.setText(this.cardPrice, 'Бесценно');
		} else {
			this.setText(this.cardPrice, `${value} синапсов`);
		}
	}
	set _id (value: string) {this.id = value;};
}