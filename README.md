# Abhivyakti React

The official website for Abhivyakti, Los Angeles' premier Marathi theater group. Built with Next.js, TypeScript, and Contentful.

## Getting Started

1. Clone the repository
2. Install dependencies:
   ```bash
   yarn install
   ```
3. Copy `.env.local.example` to `.env.local` and fill in your Contentful credentials:
   ```bash
   cp .env.local.example .env.local
   ```
4. Run the development server:
   ```bash
   yarn dev
   ```

## Updating Content

The site automatically fetches content from Contentful during the build process. To trigger a new build and update the content:

### Using GitHub UI (Recommended for content managers)

1. Go to the repository on GitHub and navigate to `version.json`
2. Click the pencil icon (Edit this file) in the top-right corner of the file view
3. Update the version number:
   ```json
   {
     "version": "1.0.1" // Increment this number
   }
   ```
4. At the bottom of the page, select "Create a new branch for this commit and start a pull request"
5. Name your branch something descriptive like `update-content-march-23`
6. Click "Propose changes"
7. On the next screen, click "Create pull request"
8. Once the pull request is approved and merged, the site will automatically rebuild with fresh content

### Using Git CLI (For developers)

1. Update the `version.json` file:
   ```json
   {
     "version": "1.0.1" // Increment this
   }
   ```
2. Commit and push the change:
   ```bash
   git add version.json
   git commit -m "chore: trigger rebuild"
   git push
   ```

## Development

- `yarn dev` - Start the development server
- `yarn build` - Build the production site
- `yarn fetch-data` - Manually fetch latest content from Contentful
- `yarn fetch-schema` - Update TypeScript types from Contentful schema
- `yarn lint` - Run ESLint
- `yarn type-check` - Run TypeScript checks

## Project Structure

- `/src/app` - Next.js app router pages
- `/src/components` - React components
- `/src/types` - TypeScript types and interfaces
- `/src/utils` - Utility functions
- `/src/data` - Generated content from Contentful
- `/public` - Static assets

## Content Updates

Content is managed in Contentful and includes:

- Productions/Plays
- Cast & Crew Members
- Homepage Content

The site will automatically display the latest content after each build.
