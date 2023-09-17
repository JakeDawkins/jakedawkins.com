// Place any global data in this file.
// You can import this data from anywhere in your site by using the `import` keyword.

export const SITE_TITLE = "Jake Dawkins";
export const SITE_DESCRIPTION =
  "Welcome to my site! I write about modern web development, accessibility, and what I'm learning.";
export const THREADS_HANDLE = "@jakedawkins";
export const MY_NAME = "Jake Dawkins";

// setup in astro.config.mjs
const BASE_URL = new URL(import.meta.env.SITE);
export const SITE_URL = BASE_URL.origin;
