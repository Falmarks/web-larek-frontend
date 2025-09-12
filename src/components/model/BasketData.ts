import { IEvents } from '../base/events';
import { ICardBasket } from '../../types';

export class BasketData {
	protected cards: ICardBasket[] = [];
	protected events: IEvents;

	constructor(events: IEvents) {
		this.events = events;
	}

	getCards() {
		return this.cards;
	}

	getCardsCount() {
		return this.cards.length;
	}

	addCard(card: ICardBasket) {
		this.cards.unshift(card);
		this.events.emit(`cards:changed`, this.cards);
	}

	deleteCard(id: string) {
		this.cards = this.cards.filter(card => card.id !== id);
		this.events.emit(`cards:changed`, this.cards);
	}

	clearCards() {
		this.cards = [];
		this.events.emit(`cards:changed`, this.cards);
	}

	cardInBasket(id: string) {
		return this.cards.some(card => card.id === id);
	}
}