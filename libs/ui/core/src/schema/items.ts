import { accordionItemBlock } from './blocks/accordion-item';
import { buttonBlock } from './blocks/button';
import { statItemBlock } from './blocks/stat-item';

// Every block in `coreItemsFolder`. A deny list cannot mix blocks and folders,
// so containers that deny `section` exclude these by block instead.
export const coreItemBlocks = [
  accordionItemBlock,
  buttonBlock,
  statItemBlock,
] as const;
