import { Component } from '../base/Component';
import { IEvents } from '../base/events';
import { ensureElement } from '../../utils/utils';

interface IPage {
	locked: boolean;
}
export class Page extends Component<IPage> {
	protected _wrapper: HTMLElement;

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this._wrapper = ensureElement<HTMLElement>('.page__wrapper');
	}

	set locked(value: boolean) {
		if (value) {
			this.toggleClass(this._wrapper, 'page__wrapper_locked', true);

		} else {
			this.toggleClass(this._wrapper, 'page__wrapper_locked', false);
		}
	}
}