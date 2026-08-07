/**
 * Twitter/X reads `twitter:image` rather than falling back to `og:image`, so
 * this re-exports the Open Graph card instead of maintaining a second design.
 */
export { default, alt, size, contentType } from './opengraph-image';
