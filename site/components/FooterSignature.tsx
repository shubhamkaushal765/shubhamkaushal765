export default function FooterSignature() {
  return (
    <footer
      style={{
        fontFamily: 'var(--font-mono)',
        color: 'var(--color-text-footnote)',
        textAlign: 'center',
        marginTop: 'var(--spacing-13)',
        fontSize: '0.9em',
      }}
    >
      ~/lab  ·  asia/kolkata (utc+5:30)  ·  pgp 0xDEADBEEF
    </footer>
  );
}
