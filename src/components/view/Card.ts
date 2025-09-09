import { ensureElement } from '../../utils/utils';
import { Component } from '../base/Component';
import { ICard } from '../../types';
import { IEvents } from '../base/events';
export class Card extends Component<ICard>{
	protected cardTitle: HTMLElement;
	protected priceCard: HTMLSpanElement;
	protected events: IEvents;
	protected _id: string;

	constructor(protected container: HTMLElement) {
		super(container);
		this.cardTitle = ensureElement<HTMLElement>('.card__title', container);
		this.priceCard = ensureElement<HTMLElement>('.card__price', container);
	}
	set title(value: string) { this.setText(this.cardTitle, value) };
	set price(value: number | null) { this.setText(this.priceCard, value) };
	set id(value: string) { this._id = value;}
}