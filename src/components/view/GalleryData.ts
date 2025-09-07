import { ICard } from '../../types';
import { IEvents } from '../base/events';

export class GalleryData {
	protected _cards: ICard[] = [];
	protected _preview: string | null = null;
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	set cards(cards: ICard[]) {
		this._cards = cards;
		this.events.emit('cards:changed')
	}

	get cards() {
		return this._cards;
	}
}