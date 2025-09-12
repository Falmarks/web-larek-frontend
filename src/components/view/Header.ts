import { IHeader } from '../../types';
import { Component } from '../base/Component';
import {IEvents} from '../base/events';
import { ensureElement } from '../../utils/utils';

export class Header extends Component<IHeader> {
	protected events: IEvents;
	protected counter: HTMLSpanElement;
	protected basketButton: HTMLButtonElement;


	constructor(protected container: HTMLElement, events: IEvents) {
		super(container);

		this.counter = ensureElement<HTMLSpanElement>('.header__basket-counter')
		this.basketButton = ensureElement<HTMLButtonElement>('.header__basket')
		this.events = events;

		this.basketButton.addEventListener('click', () => {
			this.events.emit('basket:open');
			console.log('Отрабатывает ивент открытия корзины');
		});
	}

	set _counter (value: number) {
		this._counter = value;
	}

	set countUpdate(value:number) {
		this.setText(this.counter, value);
	}
}