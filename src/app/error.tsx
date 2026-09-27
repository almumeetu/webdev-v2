'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import { AlertTriangle, RefreshCw, Home } from 'lucide-react';

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log the error to console for easy diagnosis
    console.error('Captured Next.js App Error:', error);
  }, [error]);

  const [isDe, setIsDe] = React.useState(false);
  useEffect(() => {
    try {
      const saved = localStorage.getItem('webdev_language');
      if (saved === 'de') setIsDe(true);
    } catch {}
  }, []);

  return (
    <div className="min-h-screen bg-[#070b14] text-slate-100 flex items-center justify-center px-4 py-16">
      <div className="max-w-md w-full text-center space-y-6 bg-slate-900/80 border border-slate-800 p-8 rounded-2xl shadow-2xl backdrop-blur-xl">
        <div className="w-16 h-16 mx-auto rounded-full bg-red-500/10 border border-red-500/20 flex items-center justify-center text-red-400">
          <AlertTriangle className="w-8 h-8" />
        </div>

        <div className="space-y-2">
          <h2 className="text-2xl font-bold tracking-tight text-white">
            {isDe ? 'Ein unerwarteter Fehler ist aufgetreten' : 'Something went wrong'}
          </h2>
          <p className="text-sm text-slate-400">
            {error?.message || (isDe ? 'Beim Laden dieser Seite ist ein unerwarteter Fehler aufgetreten.' : 'An unexpected error occurred while loading this page.')}
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-3 justify-center pt-2">
          <button
            onClick={() => reset()}
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-semibold text-sm transition-all cursor-pointer shadow-lg shadow-cyan-500/20"
          >
            <RefreshCw className="w-4 h-4" />
            <span>{isDe ? 'Erneut versuchen' : 'Try again'}</span>
          </button>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 font-semibold text-sm transition-all"
          >
            <Home className="w-4 h-4" />
            <span>{isDe ? 'Zurück zur Startseite' : 'Back to Home'}</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
