import Link from 'next/link';
import FooterSignature from '@/components/FooterSignature';

export default function NotFound() {
  return (
    <main id="main">
      <p style={{ fontFamily: 'var(--font-mono)', color: 'var(--color-accent)' }}>
        parsers -&gt; qubits.
      </p>
      <h1>404</h1>
      <p>
        That page does not exist. Try <Link href="/">home</Link> or <Link href="/writing/">writing</Link>.
      </p>
      <FooterSignature />
    </main>
  );
}
