import { defineFolder } from '@storyblok/schema';

export const coreFolder = defineFolder({ name: 'core' });
// Blocks that only render inside another block (buttons, list items). The
// editor treats an allowed folder as including its subfolders, so this folder
// sits beside `core`, not inside it, to stay out of page body pickers.
export const coreItemsFolder = defineFolder({ name: 'core-items' });
