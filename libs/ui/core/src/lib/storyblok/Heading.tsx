import type { ReactNode } from 'react';
import type { HeadingLevel } from '../../schema/headings';

type HeadingProps = {
  level: HeadingLevel;
  id?: string;
  className?: string;
  children: ReactNode;
};

// Renders the tag for a document-outline level. Blocks style it with their own
// class, so the level never decides the visual size.
export default function Heading({
  level: Tag,
  id,
  className,
  children,
}: HeadingProps) {
  return (
    <Tag id={id} className={className}>
      {children}
    </Tag>
  );
}
