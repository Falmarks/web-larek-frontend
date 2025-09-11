import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';
export class Card<T> extends Component<T>{
	protected cardTitle: HTMLElement;
	protected priceCard: HTMLSpanElement;
	protected events: IEvents;
	protected id: string;

	constructor(protected container: HTMLElement) {
		super(container);
		this.cardTitle = ensureElement<HTMLElement>('.card__title', container);
		this.priceCard = ensureElement<HTMLElement>('.card__price', container);
	}
	set title(value: string) { this.setText(this.cardTitle, value) };
	set price(value: number | null) { this.setText(this.priceCard, value) };
}