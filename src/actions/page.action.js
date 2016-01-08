import {PAGE_CHANGE_TITLE} from './types/page.types';

// Fetches a single user from Github API.
// Relies on the custom API middleware defined in ../middleware/api.js.
export function updatePageTitle(title, titleSmall) {
  return {
    type: PAGE_CHANGE_TITLE,
    title,
    titleSmall,
  };
}
