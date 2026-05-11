#!/bin/bash

echo "Setting up Leibniz Search Development Environment..."

# Install dependencies if node_modules doesn't exist
if [ ! -d "node_modules" ]; then
    echo "Installing dependencies..."
    npm install
fi

# Generate pages from JSON data if entries directory doesn't exist
if [ ! -d "src/pages/entries" ]; then
    echo "Generating entry pages from JSON data..."
    node generate-pages.mjs
fi

# Build the project
echo "Building project..."
npm run build

echo "Setup complete! You can now run:"
echo "  npm run dev      # Start development server"
echo "  npm run preview  # Preview built site"
echo ""
echo "The search interface will be available at http://localhost:4321/"