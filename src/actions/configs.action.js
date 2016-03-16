import {CONFIG_CLEAR} from './types/configs.types';

export function clearConfigs() {
  return {
    type: CONFIG_CLEAR,
  };
}
