import {PAGE_CHANGE_TITLE, PAGE_BACK} from './types/page.types';


export function updatePageTitle(title, titleSmall, path) {
  return {
    type: PAGE_CHANGE_TITLE,
    data: {
      title,
      path,
      titleSmall,
    },
  };
}

export function pageBack(active) {
  return {
    type: PAGE_BACK,
    data: {
      back: active,
    },
  };
}
