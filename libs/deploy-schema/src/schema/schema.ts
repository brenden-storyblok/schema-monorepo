import { defineSchema } from '@storyblok/schema';


import {schema as coreSchema} from '@monorepo/ui-core/schema';
import {schema as app1Schema} from '@monorepo/ui-app-1/schema';
import {schema as app2Schema} from '@monorepo/ui-app-2/schema';

const {blocks: coreBlocks, folders : coreFolders} = coreSchema;
const {blocks: app1Blocks, folders : app1Folders} = app1Schema;
const {blocks: app2Blocks, folders : app2Folders} = app2Schema;  

export const schema = defineSchema({
  blocks: { ...coreBlocks, ...app1Blocks, ...app2Blocks },
  folders: { ...coreFolders, ...app1Folders, ...app2Folders },
});





