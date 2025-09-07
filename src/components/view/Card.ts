import { ICard, IClient } from '../../types';
import { cloneTemplate } from '../../utils/utils';
import { Component } from '../base/Component';
import { IEvents } from '../base/events';
export class Card extends Component<ICard> {
	protected events: IEvents;
	protected cardTitle: HTMLElement;
	protected cardPrice: HTMLSpanElement;
	protected cardId: string;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);
		this.events = events;
		this.cardTitle = this.container.querySelector('.card__title');
		this.cardPrice = this.container.querySelector('.card__price');
		}
}
