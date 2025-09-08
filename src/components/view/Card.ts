import { cloneTemplate } from '../../utils/utils';
import { Component } from '../base/Component';
import { ICard } from '../../types';
import { IEvents } from '../base/events';
export class Card extends Component<ICard>{
	protected cardTitle: HTMLElement;
	protected price: HTMLSpanElement;
	protected events: IEvents;

	constructor(protected template: HTMLTemplateElement) {
		super(template);
		this.template = cloneTemplate(template);
		this.cardTitle = this.template.querySelector('.card__title');
		this.price = this.template.querySelector('.card__price');
	}
}