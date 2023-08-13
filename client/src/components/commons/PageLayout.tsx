import { css } from '@emotion/css';
import { ReactNode } from 'react';

export function PageLayout({ children }: { children: ReactNode }) {
  return (
    <div
      className={css`
        width: 100%;
        margin: 0 auto;
        height: auto;
      `}
    >
      <div
        className={css`
        `}
      >
        {children}
      </div>
    </div>
  );
}
