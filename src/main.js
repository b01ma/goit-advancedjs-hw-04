// Import modules and libraries
import fetchImages from './js/pixabay-api.js';
import {
  renderGallery,
  clearGallery,
  showLoader,
  hideLoader,
  showLoadMoreBtn,
  hideLoadMoreBtn,
  appendToGallery,
  smoothScrollToNewImages,
} from './js/render-functions.js';
import iziToast from 'izitoast';
import 'izitoast/dist/css/iziToast.min.css';
import SimpleLightbox from 'simplelightbox';
import 'simplelightbox/dist/simple-lightbox.min.css';

// DOM elements
const searchForm = document.getElementById('search-form');
const gallery = document.getElementById('gallery');
const loader = document.getElementById('loader');
const loadMoreBtn = document.getElementById('load-more-btn');

// Global state for pagination
let currentSearchQuery = '';
let currentPage = 1;
let totalHits = 0;

// SimpleLightbox instance
let lightbox = new SimpleLightbox('.gallery a', {
  captionsData: 'alt',
  captionDelay: 250,
});

// Event listeners
searchForm.addEventListener('submit', handleSearchSubmit);
loadMoreBtn.addEventListener('click', handleLoadMore);

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

  if (query.length < 2) {
    iziToast.warning({
      title: 'Warning',
      message: 'Search query must be at least 2 characters long!',
      position: 'topRight',
    });
    return;
  }

  // Reset pagination for new search
  currentSearchQuery = query;
  currentPage = 1;
  totalHits = 0;

  // Clear previous results and hide Load More button
  clearGallery(gallery);
  hideLoadMoreBtn(loadMoreBtn);
  showLoader(loader);

  // Fetch images
  try {
    const data = await fetchImages(query, currentPage);
    hideLoader(loader);

    // Store total hits
    totalHits = data.totalHits;

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

    // Show Load More button if there are more images to load
    const totalPages = Math.ceil(totalHits / 15);
    if (currentPage < totalPages) {
      showLoadMoreBtn(loadMoreBtn);
    }
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

/**
 * Handles Load More button click
 */
async function handleLoadMore() {
  currentPage += 1;

  // Disable button and show loading state
  loadMoreBtn.disabled = true;
  loadMoreBtn.textContent = 'Loading...';
  showLoader(loader);

  try {
    const data = await fetchImages(currentSearchQuery, currentPage);
    hideLoader(loader);

    // Append new images to gallery
    appendToGallery(gallery, data.hits);

    // Refresh SimpleLightbox for new images
    lightbox.refresh();

    // Smooth scroll to new images
    smoothScrollToNewImages();

    // Check if there are more images to load
    const totalPages = Math.ceil(totalHits / 15);
    if (currentPage < totalPages) {
      // Re-enable button for next load
      loadMoreBtn.disabled = false;
      loadMoreBtn.textContent = 'Load more';
      showLoadMoreBtn(loadMoreBtn);
    } else {
      // Hide button and show end message
      hideLoadMoreBtn(loadMoreBtn);
      iziToast.info({
        title: 'End of Results',
        message: "We're sorry, but you've reached the end of search results.",
        position: 'topRight',
      });
    }
  } catch (error) {
    hideLoader(loader);

    // Re-enable button on error
    loadMoreBtn.disabled = false;
    loadMoreBtn.textContent = 'Load more';
    showLoadMoreBtn(loadMoreBtn);

    iziToast.error({
      title: 'Error',
      message: 'Failed to load more images. Please try again.',
      position: 'topRight',
    });

    console.error('Error loading more images:', error);
  }
}
