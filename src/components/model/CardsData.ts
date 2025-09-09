import { ICard, ICardsData } from '../../types';
import { IEvents } from '../base/events';

export class CardsData implements ICardsData {
	protected _cards: ICard[];
	protected events: IEvents;
	//protected cardid: string | null;
	constructor(events: IEvents) {
	this.events = events;
	}

	setCards(cards: ICard[]) {
		this._cards = cards;
		this.events.emit(`cards:changed`);
	}

	getCard(cardId: string) {
		return this._cards.find((item) => item._id === cardId)
	}
	getCards () {
		return this._cards;

	}
}