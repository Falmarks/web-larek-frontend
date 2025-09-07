import './scss/styles.scss';

import { API_URL} from './utils/constants';
import { EventEmitter, IEvents } from './components/base/events';
import {cloneTemplate, createElement, ensureElement} from "./utils/utils";
import { GalleryData } from './components/view/GalleryData';
import { Api } from './components/base/api';
import { IApi } from './types';
import { AppApi } from './components/AppApi';
import { Card } from './components/view/Card';
const events: IEvents = new EventEmitter();

const baseApi: IApi = new Api(API_URL);
const api = new AppApi(baseApi);
const galleryData = new GalleryData(events);

api.getCards()
	.then((data) => {
		console.log('kartochki', data);
	})



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
const gallery = ensureElement<HTMLElement>('#gallery');
const header = ensureElement<HTMLElement>('#header');
const modal = ensureElement<HTMLElement>('#modal');