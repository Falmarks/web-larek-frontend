import './scss/styles.scss';

import { API_URL} from './utils/constants';
import { EventEmitter, IEvents } from './components/base/events';
import {cloneTemplate, ensureElement} from "./utils/utils";
import { Gallery } from './components/view/Gallery';
import { AppApi } from './components/AppApi';
import { CardCatalog } from './components/view/CardCatalog';
import { CardsData } from './components/model/CardsData';
import { CardPreview } from './components/view/CardPreview';
import { Modal } from './components/Modals/Modal';
import { Basket } from './components/Modals/Basket';
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

const api: AppApi = new AppApi(API_URL);
const cardsData = new CardsData(events);
const gallery = new Gallery(galleryElement, events);
const basket = new Basket(basketTemplate, events);
const modal = new Modal(ensureElement<HTMLElement>('#modal-container'), events);

api.getCards()
	.then((data) => {
		cardsData.setCards(data);
		console.log('Получены данные с сервера:', data);
	})

events.on(`cards:changed`, () => {
	const cardsArray = cardsData.getCards()
	const newArr = cardsArray.map((cards) => {
		const cardInstant = new CardCatalog(cloneTemplate(cardCatalogTemplate), events);
		return cardInstant.render(cards);
		})
	gallery.render({galleryLoad: newArr });
	console.log('До рендера галереи: ',cardsArray,'после: ',gallery.render);
})

events.on('card:open', ({id}: {id: string})  => {
	const cardData = cardsData.getCard(id);
	const cardInstant = new CardPreview(cloneTemplate(cardPreviewTemplate), events);
	const cardRendered = cardInstant.render({
		title: cardData.title,
		price: cardData.price,
		category: cardData.category,
		image: cardData.image,
		description: cardData.description,
	});
	modal.render({content: cardRendered});
	//console.log('Эта картдата',cardsData.getCard(id), 'Эта кардрендеред',cardRendered)
})

//events.on('basket:open',() => {
//	const basketInstant = new Basket(cloneTemplate(cardBasketTemplate), events);
//	const basketRendered = basketInstant.render({
//	})
//})