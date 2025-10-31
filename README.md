# Image Search Gallery

Woolf University. GoIT Neoversity. Advanced JavaScript Homework #3

## Task Description

Create an image search application using keyword search and gallery view. Add
styling to interface elements according to the provided mockup.

### Requirements

#### Code Organization

Use modularity and export/import syntax:

- `pixabay-api.js` - functions for HTTP requests
- `render-functions.js` - functions for displaying interface elements
- `main.js` - main application logic

#### Search Form

The search form is contained in the HTML document. Users will enter a search
string in the text field, and upon form submission, an HTTP request should be
made with this search string.

When the submit button is pressed, add validation for the text field content to
ensure the user cannot submit a request if the search field is empty.

#### HTTP Requests

Use the public Pixabay API service for the backend. Register, get your unique
access key, and familiarize yourself with the documentation.

Required query string parameters:

- `key` - your unique API access key
- `q` - search word (user input)
- `image_type` - image type. Only photos needed, so set to "photo"
- `orientation` - photo orientation. Set to "horizontal"
- `safesearch` - age filter. Set to "true"

If the backend returns an empty array, nothing suitable was found. In this case,
show a message with the text "Sorry, there are no images matching your search
query. Please try again!" using the iziToast library.

#### Gallery and Image Cards

The gallery element (list of similar elements) is contained in the HTML
document, and image card markup should be added to it after HTTP requests.

Each image is described by an object with these properties:

- `webformatURL` - link to small image for gallery card list
- `largeImageURL` - link to large image for modal window
- `tags` - string with image description (suitable for alt attribute)
- `likes` - number of likes
- `views` - number of views
- `comments` - number of comments
- `downloads` - number of downloads

Before searching with a new keyword, completely clear the gallery content to
avoid mixing request results.

#### SimpleLightbox Library

Add display of large image version using SimpleLightbox library for a complete
gallery.

In the markup, each image card needs to be wrapped in a link, as specified in
the documentation's "Markup" section.

The library contains a `refresh()` method that must be called every time new
elements are added to the gallery.

#### Loading Indicator

Add an element that notifies the user about the image loading process from the
backend. The loader should appear just before the HTTP request starts and
disappear after the request completes.

## Implementation

### Technologies Used

- **Vite** - build tool and development server
- **Vanilla JavaScript** - ES6+ modules with import/export
- **Pixabay API** - image search service
- **iziToast** - notification library
- **SimpleLightbox** - image gallery modal library

### Project Structure

```
src/
├── index.html          # Main HTML file
├── main.js            # Main application logic
├── css/
│   ├── styles.css     # Main styles import
│   ├── base.css       # Base styles
│   ├── reset.css      # CSS reset
│   ├── container.css  # Container styles
│   ├── header.css     # Header styles
│   ├── footer.css     # Footer styles
│   ├── search-form.css # Search form styles
│   ├── gallery.css    # Gallery styles
│   ├── loader.css     # Loading indicator styles
│   └── animations.css # Animation styles
└── js/
    ├── pixabay-api.js      # API functions
    └── render-functions.js # Rendering functions
```

### Key Features

1. **Modular Architecture** - Clean separation of concerns with ES6 modules
2. **Responsive Design** - Mobile-first approach with responsive grid
3. **Error Handling** - Comprehensive error handling with user-friendly
   notifications
4. **Loading States** - Visual feedback during API requests
5. **Image Gallery** - Interactive gallery with modal view using SimpleLightbox
6. **Form Validation** - Client-side validation for search input

### API Configuration

The application uses Pixabay API with the following parameters:

- Image type: photo
- Orientation: horizontal
- Safe search: enabled
- Results per page: 12

### How to Run

1. Clone the repository
2. Install dependencies: `npm install`
3. Start development server: `npm run dev`
4. Build for production: `npm run build`

### Live Demo

[View Live Demo](https://b01ma.github.io/goit-advancedjs-hw-03/)

## Author

Created as part of GoIT Neoversity Advanced JavaScript course.
