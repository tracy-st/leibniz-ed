import fs from 'fs';
import path from 'path';

// Read the sample entries
const entriesData = JSON.parse(fs.readFileSync('sample_entries.json', 'utf-8'));

// Create entries directory
const entriesDir = 'src/pages/entries';
if (!fs.existsSync(entriesDir)) {
  fs.mkdirSync(entriesDir, { recursive: true });
}

console.log(`Processing ${entriesData.length} entries...`);

// Function to clean text for better display
function cleanText(text) {
  if (!text) return '';

  // Remove [[x.x]] patterns and HTML tags for cleaner display
  return text
    .replace(/\[\[\d+\.\d+\]\]/g, '')
    .replace(/<[^>]*>/g, '')
    .replace(/\s+/g, ' ')
    .trim();
}

// Function to create safe filename
function createSafeFilename(id, seq) {
  return `${id.replace(/[^a-zA-Z0-9]/g, '_')}_${seq}.astro`;
}

// Generate a page for each entry
entriesData.forEach((entry, index) => {
  const filename = createSafeFilename(entry.id, entry.seq);
  const cleanedText = cleanText(entry.text);
  const excerpt = cleanedText.substring(0, 300) + (cleanedText.length > 300 ? '...' : '');

  const pageContent = `---
import Layout from '../../layouts/Layout.astro';

const entry = ${JSON.stringify(entry, null, 2)};
---

<Layout title={\`\${entry.title || entry.id} - Leibniz Writings\`}>
  <article data-pagefind-body>
    <header class="entry-header">
      <h1 data-pagefind-meta="title">{entry.title || entry.id}</h1>

      <div class="entry-meta">
        {entry.date && (
          <div class="meta-item">
            <strong>Date:</strong>
            <span data-pagefind-meta="date">{entry.date}</span>
          </div>
        )}

        <div class="meta-item">
          <strong>Series:</strong>
          <span data-pagefind-meta="series">{entry.series}</span>
        </div>

        {entry.number && (
          <div class="meta-item">
            <strong>Number:</strong>
            <span data-pagefind-meta="number">{entry.number}</span>
          </div>
        )}

        <div class="meta-item">
          <strong>Sequence:</strong>
          <span>{entry.seq}</span>
        </div>
      </div>
    </header>

    <div class="entry-content" data-pagefind-meta="excerpt:${excerpt.replace(/"/g, '\\"')}">
      <div class="text-content">
        {entry.text.split('\\n').map(paragraph =>
          paragraph.trim() && <p set:html={paragraph} />
        )}
      </div>
    </div>
  </article>

  <nav class="entry-navigation">
    <a href="/" class="back-link">← Back to Search</a>
  </nav>
</Layout>

<style>
  .entry-header {
    margin-bottom: 30px;
    padding-bottom: 20px;
    border-bottom: 2px solid var(--border);
  }

  .entry-header h1 {
    color: var(--primary);
    font-size: 2rem;
    margin-bottom: 20px;
    line-height: 1.3;
  }

  .entry-meta {
    display: grid;
    gap: 8px;
    font-size: 0.95rem;
  }

  .meta-item {
    display: flex;
    align-items: flex-start;
    gap: 8px;
  }

  .meta-item strong {
    color: var(--text);
    min-width: 80px;
  }

  .meta-item span {
    color: var(--text-secondary);
    flex: 1;
  }

  .entry-content {
    margin-bottom: 40px;
  }

  .text-content {
    background: var(--surface);
    border: 1px solid var(--border);
    border-radius: 8px;
    padding: 30px;
    line-height: 1.7;
  }

  .text-content :global(p) {
    margin-bottom: 16px;
  }

  .text-content :global(p:last-child) {
    margin-bottom: 0;
  }

  .text-content :global(b) {
    font-weight: 600;
    color: var(--primary);
  }

  .entry-navigation {
    border-top: 1px solid var(--border);
    padding-top: 20px;
  }

  .back-link {
    color: var(--primary);
    text-decoration: none;
    font-weight: 500;
    display: inline-flex;
    align-items: center;
    gap: 8px;
    transition: color 0.2s;
  }

  .back-link:hover {
    color: var(--primary-dark);
    text-decoration: underline;
  }

  @media (min-width: 768px) {
    .entry-meta {
      grid-template-columns: repeat(2, 1fr);
    }
  }
</style>`;

  const filepath = path.join(entriesDir, filename);
  fs.writeFileSync(filepath, pageContent);

  if (index % 100 === 0) {
    console.log(`Generated ${index + 1} pages...`);
  }
});

console.log(`Successfully generated ${entriesData.length} entry pages!`);
console.log(`Pages created in: ${entriesDir}`);