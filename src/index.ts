import './scss/styles.scss';

import { API_URL, cardClass } from './utils/constants';
import { EventEmitter, IEvents } from './components/base/events';
import {cloneTemplate, ensureElement} from "./utils/utils";
import { Gallery } from './components/view/Gallery';
import { AppApi } from './components/AppApi';
import { CardCatalog } from './components/view/CardCatalog';
import { CardsData } from './components/model/CardsData';
import {BasketData} from './components/model/BasketData';
import { CardPreview } from './components/view/CardPreview';
import { Modal } from './components/Modals/Modal';
import { Basket } from './components/view/Basket';
import { Header } from './components/view/Header';
import { CardBasket } from './components/view/CardBascet';
import { ICardBasket, Payment } from './types';
import { OrderPaymentForm } from './components/view/OrderPaymentForm';
import { ClientData } from './components/model/ClientData';
import { Page } from './components/view/Page';
const events: IEvents = new EventEmitter();

// Отладка
//events.onAll(({ eventName, data }) => {
//	console.log(eventName, data);
//})

// Шаблоны
const cardPreviewTemplate = ensureElement<HTMLTemplateElement>('#card-preview');
const cardCatalogTemplate = ensureElement<HTMLTemplateElement>('#card-catalog');
const cardBasketTemplate = ensureElement<HTMLTemplateElement>('#card-basket');
const basketTemplate = ensureElement<HTMLTemplateElement>('#basket');
const orderTemplate = ensureElement<HTMLTemplateElement>('#order');
const successTemplate = ensureElement<HTMLTemplateElement>('#success');
const contactsTemplate = ensureElement<HTMLTemplateElement>('#contacts');
const galleryElement = ensureElement<HTMLElement>('.gallery');
const headerElement = ensureElement<HTMLElement>('.header');
const api: AppApi = new AppApi(API_URL);

const cardsData = new CardsData(events);
const basketData = new BasketData(events);
const clientData = new ClientData(events);

const page = new Page(document.body, events);
const header = new Header(headerElement, events);
const gallery = new Gallery(galleryElement, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);
const basket = new Basket(cloneTemplate(basketTemplate), events);
const Order = new OrderPaymentForm(cloneTemplate(orderTemplate), events);

header.render();

api.getCards()
	.then((data) => {
		cardsData.setCards(data);
		console.log('Получены данные с сервера:', data);
	})

events.on(`cards:changed`, () => {
	const cardsArray = cardsData.getCards()
	const newArr = cardsArray.map((cards) => {
		const cardInstant = new CardCatalog(cloneTemplate(cardCatalogTemplate), events, cardClass);
		return cardInstant.render(cards);
		})
	gallery.render({galleryLoad: newArr });
	console.log('До рендера галереи: ',cardsArray,'после: ',gallery.render);
})

events.on('card:open', ({id}: {id: string})  => {
	const cardData = cardsData.getCard(id);
	const cardInstant = new CardPreview(cloneTemplate(cardPreviewTemplate), events);
	const cardRendered = cardInstant.render({
		id: cardData.id,
		title: cardData.title,
		price: cardData.price,
		category: cardData.category,
		image: cardData.image,
		description: cardData.description
	});
	modal.render({content: cardRendered});
	//console.log('Эта картдата',cardsData.getCard(id), 'Эта кардрендеред',cardRendered)
})

events.on ('card:put', ({id}: {id: string})  => {
	const cardData = cardsData.getCard(id);
	const indexLength = basketData.getCardsCount()+1;
	basketData.addCard({
		id: cardData.id,
		title: cardData.title,
		price: cardData.price,
		index: indexLength
	});
//	console.log(basketData);
})

events.on ('card:delete', ( card: ICardBasket)  => {
	basketData.deleteCard(card.id);
})

events.on ('basketCards:changed', (cards: ICardBasket[])  => {
	header.render({count: cards.length});
	const basketCardsArray = basketData.getCards().map((card) => {
		const cardInstant = new CardBasket(cloneTemplate(cardBasketTemplate), events);
		return cardInstant.render({
			...card
		});
	});
	const totalPrice = basketData.getTotalBasketPrice();
	const isEmpty = basketData.getCards().length !== 0;
	//console.log('Значения до рендера',totalPrice, isEmpty, basket)
	basket.render({
		list: basketCardsArray,
		total: totalPrice,
		valid: isEmpty
	});
});

events.on('basket:open',() => {
	const isEmpty = basketData.getCards().length !== 0;
	const renderedBasket = basket.render({valid: isEmpty});
		modal.render({
			content: renderedBasket
		});
})

events.on('orderPaymentForm:open',() => {
	const renderedFormOrder = Order.render();
	modal.render({content: renderedFormOrder});
	Order.valid = false;
	events.on('orderPaymentForm:changed',({inputsValues}: {inputsValues: Record<string,string>})  => {
		console.log('я маненький папищик, я палутяю ',inputsValues);
		//clientData.setClientAddress(inputsValues.address);
		//clientData.setClientPayment(inputsValues.payment);
		Order.render();
	});

	events.on('clientData:changed', () => {
		const data = clientData.getClientData()
		const isValid = clientData.checkUserValidation(data.address);
		Order.paymentMethod = data.payment;
		Order.render({
			valid: isValid,
			errors: clientData.getErrorMessage()
		});
		console.log('isValid ',isValid);
		console.log('Order.valid: ',Order.valid);
	});
})

events.on('orderPaymentForm:submit', (value) => {
		const Data  = clientData.getClientData();
		const isAddressValid = clientData.checkUserValidation(Data.address);
		const isPaymentValid = Data.payment !== '';
		const isValid = isAddressValid && isPaymentValid;

		Order.render({
			valid: isValid,
			errors: clientData.getErrorMessage()
		});
});

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
})