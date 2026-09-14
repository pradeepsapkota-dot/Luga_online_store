import Link from "next/link";

export default function NotFound() {
  return (
    <div className="px-6 py-24 max-w-lg mx-auto text-center">
      <h1 className="font-display text-4xl mb-3">Page not found</h1>
      <p className="text-charcoal/70 mb-8">
        We couldn't find what you were looking for. It may have moved, or the
        link might be out of date.
      </p>
      <div className="flex flex-wrap gap-3 justify-center">
        <Link
          href="/"
          className="px-5 py-2.5 rounded-full bg-terracotta text-white text-sm font-medium"
        >
          Back to home
        </Link>
        <Link
          href="/stores"
          className="px-5 py-2.5 rounded-full border border-gray-soft text-sm font-medium"
        >
          Browse stores
        </Link>
        <Link
          href="/visit"
          className="px-5 py-2.5 rounded-full border border-gray-soft text-sm font-medium"
        >
          Visit information
        </Link>
      </div>
    </div>
  );
}
