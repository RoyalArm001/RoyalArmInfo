import Link from "next/link";

export default function NotFound() {
  return (
    <main id="main-content" className="grid min-h-screen place-items-center bg-[#0d0d0d] px-5 text-white">
      <section className="w-full max-w-xl rounded-3xl border border-gray-800 bg-[#151515] p-8 text-center shadow-2xl sm:p-12">
        <p className="text-sm font-bold uppercase tracking-[0.25em] text-[#ff004f]">404 error</p>
        <h1 className="mt-4 text-4xl font-extrabold sm:text-5xl">Page not found</h1>
        <p className="mx-auto mt-4 max-w-md leading-7 text-gray-400">
          The page may have moved or the address may be incorrect. Return to the portfolio or submit a service request.
        </p>
        <div className="mt-8 grid gap-3 sm:grid-cols-2">
          <Link href="/" className="rounded-xl bg-[#ff004f] px-5 py-3 font-semibold transition hover:bg-[#e60047]">Go to homepage</Link>
          <Link href="/service-request" className="rounded-xl border border-[#ff004f] px-5 py-3 font-semibold text-[#ff4f84] transition hover:bg-[#ff004f] hover:text-white">Request service</Link>
        </div>
      </section>
    </main>
  );
}
