import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

let lightbox; 

export function renderGallery(images) {
  const gallery = document.querySelector('.gallery');


const markup = images.map(({ webformatURL, largeImageURL, tags, likes, views, comments, downloads }) => `
  <a href="${largeImageURL}" class="gallery-item">
    <div class="photo-card">
      <img src="${webformatURL}" alt="${tags}" />
      <div class="info">
        <div class="item"><h3>Likes</h3><p>${likes}</p></div>
        <div class="item"><h3>Views</h3><p>${views}</p></div>
        <div class="item"><h3>Comments</h3><p>${comments}</p></div>
        <div class="item"><h3>Downloads</h3><p>${downloads}</p></div>
      </div>
    </div>
  </a>
`).join('');

  gallery.insertAdjacentHTML('beforeend', markup);

  if (!lightbox) {
    lightbox = new SimpleLightbox('.gallery a', { captionsData: 'alt', captionDelay: 250 });
  } else {
    lightbox.refresh();
  }
}

export function clearGallery() {
  const gallery = document.querySelector('.gallery');
  gallery.innerHTML = '';
}

export function showLoader() {
  const loader = document.querySelector('#loader');
  loader.classList.remove('hidden');
}

export function hideLoader() {
  const loader = document.querySelector('#loader');
  loader.classList.add('hidden');
}

export function showNoResultsMessage() {
  import('izitoast').then((iziToast) => {
    iziToast.info({
      title: 'No Results',
      message: 'No images found for your search query. Please try again.',
      position: 'topRight',
    });
  });
}

export function showErrorMessage() {
  import('izitoast').then((iziToast) => {
    iziToast.error({
      title: 'Error',
      message: 'Something went wrong. Please try again later.',
      position: 'topRight',
    });
  });
}
