'use client';

import * as React from 'react';
import { cn } from '@/lib/utils';

interface ProgressProps extends React.HTMLAttributes<HTMLDivElement> {
  value?: number;
}

const Progress = React.forwardRef<HTMLDivElement, ProgressProps>(
  ({ className, value = 0, ...props }, ref) => {
    const safeValue = typeof value === 'number' && !isNaN(value) ? Math.max(0, Math.min(100, value)) : 0;
    return (
      <div
        ref={ref}
        className={cn('relative h-4 w-full overflow-hidden rounded-full bg-secondary', className)}
        aria-valuenow={safeValue}
        aria-valuemin={0}
        aria-valuemax={100}
        role="progressbar"
        {...props}
      >
        <div
          className="h-full bg-primary transition-all"
          style={{ width: `${safeValue}%` }}
        />
      </div>
    );
  }
);
Progress.displayName = 'Progress';

export { Progress };
