import React from 'react';

interface SectionProps {
  children: React.ReactNode;
}

function Section({ children }: SectionProps) {
  return (
    <section className="flex flex-col items-center gap-lg border border-text-secondary p-[2rem]">
      {children}
    </section>
  );
}

export default Section;
