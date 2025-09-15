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
import { ICardBasket, ICheck} from './types';
import { OrderPaymentForm } from './components/view/OrderPaymentForm';
import { ClientData } from './components/model/ClientData';
import { Page } from './components/view/Page';
import { OrderContactsForm } from './components/view/OrderContactsForm';
import { Success } from './components/view/Success';
const events: IEvents = new EventEmitter();

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
const orderPayment = new OrderPaymentForm(cloneTemplate(orderTemplate), events);
const orderContacts = new OrderContactsForm(cloneTemplate(contactsTemplate), events);
const success = new Success(cloneTemplate(successTemplate), events);

header.render();

api.getCards()
	.then((data) => {
		cardsData.setCards(data);
	})
.catch(err => console.error(err));

events.on(`cards:changed`, () => {
	const cardsArray = cardsData.getCards()
	const newArr = cardsArray.map((cards) => {
		const cardInstant = new CardCatalog(cloneTemplate(cardCatalogTemplate), events, cardClass);
		return cardInstant.render(cards);
		})
	gallery.render({galleryLoad: newArr });
});

events.on('card:open', ({id}: {id: string}) => {
	const cardData = cardsData.getCard(id);
	const isInBasket = basketData.cardInBasket(id);

	const cardInstant = new CardPreview(
		cloneTemplate(cardPreviewTemplate),
		events,
		cardClass
	);

	cardInstant.setState(isInBasket);

	const cardRendered = cardInstant.render({
		id: cardData.id,
		title: cardData.title,
		price: cardData.price,
		category: cardData.category,
		image: cardData.image,
		description: cardData.description
	});

	modal.render({content: cardRendered});
});


events.on ('card:put', ({id}: {id: string})  => {
	const cardData = cardsData.getCard(id);
	if(basketData.cardInBasket(id)) {
		basketData.deleteCard(id)
	} else {
	const indexLength = basketData.getCardsCount()+1;
	basketData.addCard({
		id: cardData.id,
		title: cardData.title,
		price: cardData.price,
		index: indexLength
	});}
});

events.on ('card:delete', ( card: ICardBasket)  => {
	basketData.deleteCard(card.id);
});

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
});

events.on('orderPaymentForm:open',() => {
	const renderedFormOrder = orderPayment.render();
	modal.render({content: renderedFormOrder});
	orderPayment.valid = false;
});

events.on('orderPaymentForm:changedButton',(value: {payment: string})  => {
	clientData.setClientPayment(value);
	orderPayment.paymentMethod = value.payment;
});

events.on('orderPaymentForm:changedInput',(value: {address: string})  => {
	clientData.setClientAddress(value);
});

events.on('orderPaymentForm:submit', () => {
	const renderedOrderContacts = orderContacts.render();
	modal.render({content: renderedOrderContacts});
	orderContacts.valid = false;
});

events.on('orderContactsForm:changedEmailInput',(value: {email: string})  => {
	clientData.setClientEmail(value);
	orderPayment.render()
});

events.on('orderContactsForm:changedPhoneInput',(value: {phone: string})  => {
	clientData.setClientPhone(value);

	orderPayment.render()
});

events.on('clientData:changed', () => {

	const paymentValid = clientData.validatePayment();
	const contactsValid = clientData.validateContacts();

	orderPayment.render({
		valid: paymentValid,
		errors: clientData.getPaymentErrorMessage()
	});

	orderContacts.render({
		valid: contactsValid,
		errors: clientData.getContactsErrorMessage()
	});

});

events.on('orderContactsForm:submit', () => {
	const clientOrderData = clientData.getClientData();
	const totalPrice = basketData.getTotalBasketPrice();
	const basketList = basketData.getCards().map((product) => {
		return product.id;
	});

	const orderData = {
		items: basketList,
		total: totalPrice,
		...clientOrderData
	};

	api.postOrder(orderData)
		.then((data: ICheck) => {
			const renderedSuccess = success.render({total: data.total});
			modal.render({content: renderedSuccess});
		})
		.catch(err => console.error(err));
});

events.on('success', () => {
	clientData.clearData();
	basketData.clearCards();
	modal.close();
})

events.on('modal:open', () => {
	page.locked = true;
});

events.on('modal:close', () => {
	page.locked = false;
});