import Link from "next/link";

export default function NotFound() {
  return (
    <div className="mx-auto max-w-xl px-4 py-24 text-center">
      <p className="font-mono text-sm text-accent">404</p>
      <h1 className="mt-2 font-display text-4xl">Model not found</h1>
      <p className="mt-3 text-muted">That car isn&apos;t in our garage.</p>
      <Link href="/" className="mt-8 inline-block rounded-full bg-foreground px-5 py-2.5 text-sm text-background">
        Back to all models
      </Link>
    </div>
  );
}
