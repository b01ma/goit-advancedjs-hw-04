// Import modules and libraries
import fetchImages from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// DOM elements
const searchForm = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');

// SimpleLightbox instance
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Event listeners
searchForm.addEventListener('submit', handleSearchSubmit);

/**
 * Handles search form submission
 * @param {Event} event - Form submit event
 */
async function handleSearchSubmit(event) {
  event.preventDefault();

  const formData = new FormData(event.target);
  const query = formData.get('searchQuery').trim();

  // Validate search query
  if (!query) {
    iziToast.warning({
      title: 'Warning',
      message: 'Please enter a search query!',
      position: 'topRight',
    });
    return;
  }

  // Clear previous results and show loader
  clearGallery(gallery);
  showLoader(loader);

  // Fetch images
  try {
    const data = await fetchImages(query);
    hideLoader(loader);

    // Render gallery
    const galleryMarkup = renderGallery(data.hits);
    gallery.innerHTML = galleryMarkup;

    // Refresh SimpleLightbox
    lightbox.refresh();

    // Show success message
    iziToast.success({
      title: 'Success',
      message: `Found ${data.totalHits} images!`,
      position: 'topRight',
    });
  } catch (error) {
    hideLoader(loader);

    // Show error message
    if (error.message === 'No images found for your search query.') {
      iziToast.info({
        title: 'No Results',
        message:
          'Sorry, there are no images matching your search query. Please try again!',
        position: 'topRight',
      });
    } else {
      iziToast.error({
        title: 'Error',
        message: 'Something went wrong. Please try again later.',
        position: 'topRight',
      });
    }

    console.error('Error fetching images:', error);
  }

  // Clear form
  event.target.reset();
}
