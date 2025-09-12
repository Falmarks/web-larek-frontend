import { ICardData} from '../../types';
import { IEvents } from '../base/events';

export class CardsData {
	protected _cards: ICardData[];
	protected events: IEvents;

	constructor(events: IEvents) {
	this.events = events;
	}

	setCards(cards: ICardData[]) {
		this._cards = cards;
		this.events.emit(`cards:changed`);
	}

	getCard(cardId: string) {
		return this._cards.find((item) => item.id === cardId)
	}

	getCards () {
		return this._cards;
	}
}