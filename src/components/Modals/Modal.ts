import {Component} from '../base/Component';
import {ensureElement } from '../../utils/utils';
import {IEvents } from '../base/events';
import { IModal } from '../../types';

export class Modal extends Component<IModal> {
    protected _closeButton: HTMLButtonElement;
		protected _content: HTMLElement

	constructor(container: HTMLElement, protected events: IEvents) {
        super(container);
				this.events = events;
        this._closeButton = ensureElement<HTMLButtonElement>('.modal__close', container);
        this._content = ensureElement<HTMLElement>('.modal__content', container);
        this._closeButton.addEventListener('click', this.close.bind(this));
				this.container.addEventListener('mousedown', (event) => {
					if (event.target === event.currentTarget) {
						this.close();
					}
				});
				this.handleEscUp = this.handleEscUp.bind(this);
    }

    set content(value: HTMLElement) {
        this._content.replaceChildren(value);
    }

    open() {
        this.container.classList.add('modal_active');
        this.events.emit('modal:open');
				document.addEventListener('keyup', this.handleEscUp);
    }

    close() {
        this.container.classList.remove('modal_active');
        this.content = null;
        this.events.emit('modal:close');
			  document.removeEventListener('keyup', this.handleEscUp);
    }

		handleEscUp(event: KeyboardEvent) {
			if (event.key === 'Escape') {
				this.close();
			}
		}

		render(data: IModal): HTMLElement {
			super.render(data);
			this.open();
			return this.container;
		}

}