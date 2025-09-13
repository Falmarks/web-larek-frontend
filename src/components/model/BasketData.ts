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
	getTotalBasketPrice(): number {
		return this.cards.reduce((acc, card) => {
			const price = card.price ?? 0;
			return acc + price;
		}, 0);
	}

	addCard(card: ICardBasket) {
		this.cards.push(card);
		this.events.emit(`basketCards:changed`, this.cards);
	}

	deleteCard(id: string) {
		this.cards = this.cards.filter(card => card.id !== id);
		this.events.emit(`basketCards:changed`, this.cards);
	}

	clearCards() {
		this.cards = [];
		this.events.emit(`basketCards:changed`, this.cards);
	}

	cardInBasket(id: string) {
		return this.cards.some(card => card.id === id);
	}


}