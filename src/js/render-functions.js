/**
 * Creates HTML markup for a single image card
 * @param {Object} image - Image object from Pixabay API
 * @returns {string} - HTML string for image card
 */
export function createImageCardMarkup(image) {
  const {
    webformatURL,
    largeImageURL,
    tags,
    likes,
    views,
    comments,
    downloads,
  } = image;

  return `
    <li class="gallery-item">
      <a class="gallery-link" href="${largeImageURL}">
        <img 
          class="gallery-image" 
          src="${webformatURL}" 
          alt="${tags}" 
          loading="lazy" 
        />
        <div class="image-info">
          <div class="info-item">
            <span class="info-label">Likes</span>
            <span class="info-value">${likes}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Views</span>
            <span class="info-value">${views}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Comments</span>
            <span class="info-value">${comments}</span>
          </div>
          <div class="info-item">
            <span class="info-label">Downloads</span>
            <span class="info-value">${downloads}</span>
          </div>
        </div>
      </a>
    </li>
  `;
}

/**
 * Renders gallery markup from array of images
 * @param {Array} images - Array of image objects
 * @returns {string} - Combined HTML string for all image cards
 */
export function renderGallery(images) {
  return images.map(createImageCardMarkup).join('');
}

/**
 * Clears the gallery content
 * @param {HTMLElement} galleryElement - Gallery container element
 */
export function clearGallery(galleryElement) {
  galleryElement.innerHTML = '';
}

/**
 * Shows loading indicator
 * @param {HTMLElement} loaderElement - Loader element
 */
export function showLoader(loaderElement) {
  loaderElement.style.display = 'flex';
}

/**
 * Hides loading indicator
 * @param {HTMLElement} loaderElement - Loader element
 */
export function hideLoader(loaderElement) {
  loaderElement.style.display = 'none';
}
