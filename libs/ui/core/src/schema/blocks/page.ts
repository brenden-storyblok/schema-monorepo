import { defineBlock } from '@storyblok/schema';

export const pageBlock = defineBlock({
    name: 'page',
    display_name: 'Page',
    is_root: true,
    is_nestable: false,
    fields: []
});