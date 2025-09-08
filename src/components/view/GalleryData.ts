import { IEvents } from '../base/events';
import { Component } from '../base/Component';

interface IGallery {
	gallery: HTMLElement[]
}

export class GalleryData extends Component<IGallery>{

	constructor(container: HTMLElement, protected events: IEvents) {
		super(container);
		this.events = events;
	}

	galleryLoad(cards: HTMLElement[]) {
		this.container.replaceChildren(...cards);
	}
}