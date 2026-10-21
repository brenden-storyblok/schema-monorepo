import type { ReactNode } from 'react';
import type { ResolvedLink } from '@monorepo/storyblok-utils';
import styles from './storyblok.module.css';

interface ButtonLinkProps {
  link: ResolvedLink;
  children: ReactNode;
  // Pass a class to style the link yourself (Teaser does); pass `variant` to
  // get the shared button look.
  className?: string;
  variant?: 'primary' | 'secondary' | 'link';
}

// Internal: not exported from server.ts. The anchor every button-like link
// uses, so new-tab announcements stay consistent.
export default function ButtonLink({
  link,
  children,
  className,
  variant,
}: ButtonLinkProps) {
  const classes = [variant ? styles.button : '', className ?? '']
    .filter(Boolean)
    .join(' ');

  return (
    <a
      className={classes || undefined}
      data-variant={variant}
      href={link.href}
      target={link.target}
      rel={link.rel}
    >
      {children}
      {link.target === '_blank' ? (
        <span className={styles.visuallyHidden}> (opens in a new tab)</span>
      ) : null}
    </a>
  );
}
