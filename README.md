#  Memories Gallery

A React-based photo gallery web application to upload, view, filter, and sort your  memories. The app allows users to upload photos, add titles, descriptions, and tags, and browse them in different view modes with filtering and sorting options.

## Features

- Display a gallery of photos with grid and masonry view modes.
- Upload photos via drag-and-drop or file selection.
- Add titles, descriptions, and tags to uploaded photos.
- Filter photos by search term, tags, and date range.
- Sort photos by date, title, or number of tags.
- View photos in a modal with navigation to next/previous photos.
- Responsive and user-friendly UI.

## Project Structure

- `src/pages/gallery/Gallery.jsx`: Main gallery page component managing photo state, filtering, sorting, and modals.
- `src/components/upload-modal/UploadModal.jsx`: Modal component for uploading photos with drag-and-drop and file selection.
- `src/components/photo-modal/PhotoModal.jsx`: Modal component for viewing photos in detail.
- `src/components/photocard/PhotoCard.jsx`: Component to display individual photo cards.
- `src/components/filter-bar/FilterBar.jsx`: Component for filtering and sorting controls.
- Other components: NavBar, Footer, HeroSection, FeaturesCard, Journal, etc.
- `src/assets/`: Contains sample images used as initial photos.

## Installation

1. Clone the repository:

   ```bash
   git clone <repository-url>
   cd <repository-folder>
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Start the development server:

   ```bash
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:3000` (or the port shown in the terminal).

## Usage

- Navigate to the Gallery page to view photos.
- Click "Upload Photos" to open the upload modal.
- Drag and drop images or click to select files.
- Add titles, descriptions, and tags to your photos.
- Click "Upload" to add photos to the gallery.
- Use the filter bar to search, filter by tags, and sort photos.
- Click on a photo card to view it in detail and navigate between photos.

## Development

- The app is built with React and uses CSS modules for styling.
- Components are organized under `src/components/`.
- Pages are under `src/pages/`.
- State management is done using React hooks.
- Image previews use `URL.createObjectURL` for local preview.




## License

This project is open source and available under the MIT License.
