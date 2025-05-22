#  Memora

A React-based photo gallery web application to upload, view, filter, and sort your  memories. The app allows users to upload photos, add titles, descriptions, and tags, and browse them in different view modes with filtering and sorting options.

## ❓ Why Memora?

In a world overflowing with photos, it's easy to lose track of the moments that matter. From travel pictures buried in phone storage to family events mixed up in cloud folders, managing memories has become frustrating.

### 🧩 The Problem

- Disorganized photo folders across devices and platforms  
- Lack of context — no titles, tags, or descriptions to recall the story  
- Hard to find specific memories  
- No personalized or emotional connection to how photos are presented  

### ✅ The Solution

Memora offers a beautiful and intuitive space to:

- **Upload** your moments  
- **Describe** them with metadata  
- **Sort & Filter** memories meaningfully  
- **View** them in aesthetic layouts  

No more scrolling endlessly through unnamed files. Just memories that make sense.


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

## 🧭 Usage Guide

1. **Navigate to the Gallery page**  
   Go to the gallery section to see all uploaded photos displayed in a clean grid or masonry layout.

2. **Click "Upload Photos"**  
   Opens a modal allowing you to upload new images.

3. **Choose Photos**  
   Drag and drop your images or click to browse and select files.

4. **Add Details**  
   For each photo, you can enter:
   - **Title**: Name your memory.
   - **Description**: Add a short story or context.
   - **Tags**: Add keywords to make searching easier.

5. **Upload**  
   Once you've added the metadata, click "Upload" to add the photo to your gallery.

6. **Browse and Filter**  
   - Use the filter bar to search photos by keywords.
   - Filter by tags or date ranges.
   - Sort photos by title, date, or number of tags.

7. **View in Detail**  
   Click on any photo to open it in a modal and navigate through your memories in full view.


## Development

- The app is built with React and uses CSS modules for styling.
- Components are organized under `src/components/`.
- Pages are under `src/pages/`.
- State management is done using React hooks.

## 🛠️ Tech Stack

| Technology     | Description                                 |
|----------------|---------------------------------------------|
| **React**      | Frontend library for building UI components |
| **CSS Modules**| Scoped styling for individual components    |
| **Vite**       | Fast build tool and development server      |
| **JavaScript** | Core language used for building the app     |
| **HTML5**      | Semantic structure for the UI               |
| **ESLint**     | Linting tool to maintain code quality       |
| **React Hooks**| State and side-effect management            |


## 📹 Demo

Check out the demo video:

[🎬 Watch Demo](https://drive.google.com/file/d/1hVpVbC6pDk6l6xhQhgPO5zbVeF4cwzbb/view?usp=sharing)

## License

This project is open source and available under the MIT License.
