import axios from 'axios';

// Pixabay API configuration
const API_KEY = '53028647-447da87338472664aa918ac68'; // Your actual API key
const BASE_URL = 'https://pixabay.com/api/';

/**
 * Fetches images from Pixabay API
 * @param {string} query - Search query
 * @param {number} page - Page number (default: 1)
 * @param {number} perPage - Images per page (default: 12)
 * @returns {Promise} - Promise that resolves to the API response
 */
export default async function fetchImages(query, page = 1, perPage = 12) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: page,
    per_page: perPage,
  };

  try {
    const response = await axios.get(BASE_URL, { params });

    if (response.data.hits.length === 0) {
      throw new Error('No images found for your search query.');
    }

    return response.data;
  } catch (error) {
    if (error.response) {
      throw new Error(`HTTP error! status: ${error.response.status}`);
    }
    throw error;
  }
}
