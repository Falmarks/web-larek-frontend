import { IEvents } from '../base/events';
import { Component } from '../base/Component';

interface IGallery {
	galleryLoad: HTMLElement[]
}

export class Gallery extends Component<IGallery>{

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this.events = events;
	}

	set galleryLoad (cards: HTMLElement[]) {
		this.container.replaceChildren(...cards);
	}
}