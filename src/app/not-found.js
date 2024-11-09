import Link from "next/link";

export default function NotFound() {
  return (
    <section className="absolute left-0 right-0 top-[25%]">
      <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h1 className="mb-4 text-7xl tracking-tight font-extrabold lg:text-9xl text-primary-600 dark:text-primary-500">
            404
          </h1>
          <p className="mb-4 text-3xl tracking-tight font-bold text-base-content">
            Something&apos;s missing.
          </p>
          <p className="mb-4 text-lg font-light text-neutral">
            Sorry, we can&apos;t find that page. You&apos;ll find lots to
            explore on the home page.
          </p>
          <Link
            href="/posts"
            className="btn btn-neutral text-neutral-content my-4"
          >
            Back to Homepage
          </Link>
        </div>
      </div>
    </section>
  );
}
