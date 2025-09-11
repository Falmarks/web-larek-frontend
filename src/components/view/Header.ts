import { IHeader } from '../../types';
import { Component } from '../base/Component';
import {IEvents} from '../base/events';
import { ensureElement } from '../../utils/utils';

export class Page extends Component<IHeader> {
	protected events: IEvents;
	protected _counter: HTMLSpanElement;
	protected basketButton: HTMLButtonElement;

	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);

		this._counter = ensureElement<HTMLSpanElement>('header__basket-counter')
		this.basketButton = ensureElement<HTMLButtonElement>('header__basket')
		this.events = events;
		this.basketButton.addEventListener( 'click', () =>
			this.events.emit('basket:open'));
	}

	set counter(value: number) {
		this.setText(this._counter, String(value));
	}

}