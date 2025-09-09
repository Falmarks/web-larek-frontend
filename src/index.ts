import './scss/styles.scss';

import { API_URL} from './utils/constants';
import { EventEmitter, IEvents } from './components/base/events';
import {cloneTemplate, createElement, ensureElement} from "./utils/utils";
import { GalleryData } from './components/view/GalleryData';
import { AppApi } from './components/AppApi';
import { CardCatalog } from './components/view/CardCatalog';
import { CardsData } from './components/model/CardsData';
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
const header = ensureElement<HTMLElement>('.header');
const modal = ensureElement<HTMLElement>('#modal-container');

const api: AppApi = new AppApi(API_URL);
const cardsData = new CardsData(events);
const Gallery = new GalleryData(galleryElement, events);

api.getCards()
	.then((data) => {
		cardsData.setCards(data);
	})

events.on(`cards:changed`, () => {
	const cardsArray = cardsData.getCards()
	const newArr = cardsArray.map((cards) => {
		const cardInstant = new CardCatalog(cloneTemplate(cardCatalogTemplate), events);
		return cardInstant.render(cards);
		})
	Gallery.render({galleryLoad: newArr });
	console.log(cardsArray);
})
events.on('card:open', ({id}: {id: string})  => {
	console.log(id);
})