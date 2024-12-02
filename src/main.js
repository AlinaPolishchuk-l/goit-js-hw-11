import './css/styles.css';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

import { fetchImages } from './js/pixabay-api';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showNoResultsMessage,
  showErrorMessage,
} from './js/render-functions';

const form = document.querySelector('#search-form');
const gallery = document.querySelector('.gallery');
let currentPage = 1;
let currentQuery = '';

form.addEventListener('submit', onSearch);

async function onSearch(event) {
  event.preventDefault();

  const query = event.target.elements.query.value.trim();

  if (!query || query === currentQuery) {
    return;
  }

  currentQuery = query;
  currentPage = 1;
  clearGallery();
  showLoader();

  try {
    const data = await fetchImages(currentQuery, currentPage);

    if (data.hits.length === 0) {
      showNoResultsMessage();
      return;
    }

    renderGallery(data.hits);
  } catch (error) {
    showErrorMessage();
  } finally {
    hideLoader();
  }
}

window.addEventListener('scroll', onScroll);

async function onScroll() {
  if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 200) {
    currentPage += 1;

    showLoader();

    try {
      const data = await fetchImages(currentQuery, currentPage);

      if (data.hits.length === 0) {
        showNoResultsMessage();
        return;
      }

      renderGallery(data.hits);
    } catch (error) {
      showErrorMessage();
    } finally {
      hideLoader();
    }
  }
}
