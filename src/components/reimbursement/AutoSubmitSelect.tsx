'use client';

import { useRef } from 'react';

export function AutoSubmitSelect({
  name,
  defaultValue,
  children,
  className,
}: {
  name: string;
  defaultValue: string;
  children: React.ReactNode;
  className?: string;
}) {
  const formRef = useRef<HTMLFormElement | null>(null);

  return (
    <select
      name={name}
      defaultValue={defaultValue}
      onChange={(e) => {
        const form = e.currentTarget.closest('form');
        form?.submit();
      }}
      className={className}
    >
      {children}
    </select>
  );
}
