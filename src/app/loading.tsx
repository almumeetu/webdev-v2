export default function Loading() {
  return (
    <main
      aria-label="Loading page"
      aria-busy="true"
      className="min-h-[70vh] bg-white"
    >
      <div className="animate-pulse">
        <div className="h-[220px] bg-slate-900">
          <div className="mx-auto max-w-7xl px-4 pt-12 sm:px-6 lg:px-8">
            <div className="h-3 w-40 rounded bg-slate-700" />
            <div className="mt-8 h-9 w-2/3 max-w-xl rounded bg-slate-700" />
          </div>
        </div>
        <div className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
          <div className="h-5 w-48 rounded bg-slate-200" />
          <div className="mt-5 h-4 w-full rounded bg-slate-100" />
          <div className="mt-3 h-4 w-5/6 rounded bg-slate-100" />
          <div className="mt-8 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <div className="h-40 rounded-2xl bg-slate-100" />
            <div className="h-40 rounded-2xl bg-slate-100" />
            <div className="h-40 rounded-2xl bg-slate-100" />
          </div>
        </div>
      </div>
    </main>
  );
}
