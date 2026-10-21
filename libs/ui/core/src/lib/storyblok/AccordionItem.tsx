import type { Block } from '../../schema/schema';
import { AccordionItem as Item } from './Accordion';

// Registry entry for a stray `accordion_item`, which the schema keeps out of
// page bodies. Inside an `accordion` the parent renders items itself, because
// it passes the heading level and exclusive group down.
export default function AccordionItem({
  blok,
}: {
  blok: Block<'accordion_item'>;
}) {
  return <Item blok={blok} open={Boolean(blok.open_by_default)} />;
}
