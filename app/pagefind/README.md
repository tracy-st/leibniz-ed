# Leibniz Writings Search

A search interface for browsing Leibniz writings using Astro and Pagefind.

## Features

- Full-text search across all Leibniz entries
- Modern, responsive design
- Fast static site generation with Astro
- Pagefind for client-side search indexing
- Individual pages for each entry with metadata

## Setup

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Generate entry pages from JSON data:**
   ```bash
   node generate-pages.mjs
   ```

3. **Build for production:**
   ```bash
   npm run build
   ```

   This will:
   - Build the Astro site
   - Generate the Pagefind search index
   - Output everything to `dist/`

4. **Preview the built site (REQUIRED for search to work):**
   ```bash
   npm run preview
   ```

   **Important:** The search functionality only works in the built version (`npm run preview`), not in development mode (`npm run dev`). This is because Pagefind generates the search index during the build process.

5. **Development mode (no search):**
   ```bash
   npm run dev
   ```
   Use this for editing layouts and content, but search won't work.

## Data Structure

The search interface expects data in `sample_entries.json` with the following structure:

```json
{
  "id": "unique_identifier",
  "title": "Entry title",
  "series": "Collection or series name", 
  "seq": 1,
  "date": "Date if available",
  "number": "Document number if available",
  "text": "Full text content with markup"
}
```

## Features

- **Full-text search**: Search across all entry content using Pagefind
- **Browse interface**: View all entries organized by series
- **Metadata filtering**: Results show series, dates, and other metadata
- **Excerpt highlighting**: Search terms are highlighted in results
- **Individual entry pages**: Each result links to a detailed view with full text
- **Responsive design**: Works on desktop and mobile devices

## Customization

- **Styling**: Edit CSS custom properties in `src/layouts/Layout.astro`
- **Search behavior**: Modify options in `src/components/SearchInterface.astro`
- **Entry display**: Customize entry pages in the generate-pages.mjs template

## File Structure

```
src/
├── layouts/
│   └── Layout.astro          # Main layout template
├── pages/
│   ├── index.astro          # Search homepage
│   └── entries/             # Generated entry pages
└── components/
    └── SearchInterface.astro # Pagefind search component
```

## Development

The project uses:
- **Astro 4.15+** for static site generation
- **Pagefind 1.1+** for search indexing
- **Vanilla CSS** with custom properties for theming

To add new entries, update `sample_entries.json` and re-run `node generate-pages.mjs`.