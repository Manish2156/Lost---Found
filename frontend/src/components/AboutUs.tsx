import React from 'react';

export const AboutUs: React.FC = () => {
  return (
    <div className="bg-white rounded-2xl border border-slate-200/80 p-8 sm:p-12 shadow-xs space-y-4 max-w-3xl">
      <h1 className="text-2xl sm:text-3xl font-bold text-slate-900 font-display tracking-tight">
        About Us
      </h1>
      <p className="text-sm text-slate-600 leading-relaxed">
        Lost &amp; Found is a dedicated campus network built to help students, faculty, and staff track and recover misplaced belongings across college grounds and academic buildings.
      </p>
    </div>
  );
};
