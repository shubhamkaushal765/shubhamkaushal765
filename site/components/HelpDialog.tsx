'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';

const BLOCKED = 'input, textarea, select, [contenteditable]';

export default function HelpDialog() {
  const ref = useRef<HTMLDialogElement>(null);

  useEffect(() => {
    const toggle = () => {
      const d = ref.current;
      if (!d) return;
      if (d.open) d.close();
      else d.showModal();
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== '?' || e.ctrlKey || e.metaKey || e.altKey) return;
      if (e.repeat || e.defaultPrevented) return;
      const t = e.target;
      if (t instanceof Element && t.closest(BLOCKED)) return;
      toggle();
    };
    window.addEventListener('keydown', onKey);
    window.addEventListener('toggle-help', toggle);
    return () => {
      window.removeEventListener('keydown', onKey);
      window.removeEventListener('toggle-help', toggle);
    };
  }, []);

  const close = () => ref.current?.close();

  return (
    <dialog
      id="help"
      className="help-dialog"
      aria-labelledby="help-title"
      ref={ref}
      onClick={(e) => {
        if (e.target === e.currentTarget) close();
      }}
    >
      <div
        className="help-dialog__inner"
        onClick={(e) => {
          if ((e.target as Element).closest('a')) close();
        }}
      >
        <div className="help-dialog__bar">
          <h2 id="help-title" className="help-dialog__title">~/lab $ help</h2>
          <button type="button" className="help-dialog__close" onClick={close} autoFocus>
            close
          </button>
        </div>
        <div className="help-dialog__body">
          <div className="help-dialog__out">{'?      toggle this panel'}</div>
          <div className="help-dialog__out">{'esc    close'}</div>
          <div className="help-dialog__prompt">~/lab $ whoami</div>
          <div className="help-dialog__out">shubham kaushal. independent engineer, asia/kolkata.</div>
          <div className="help-dialog__out">mood: caffeinated, mildly curious (self-reported, no warranty)</div>
          <div className="help-dialog__prompt">~/lab $ ls</div>
          <div className="help-dialog__out">
            <Link href="/writing/">writing/</Link>
            {'  '}
            <Link href="/slides/">slides/</Link>
            {'  '}
            <a href="https://github.com/shubhamkaushal765/zuit">zuit</a>
            {'  '}
            <a href="https://github.com/shubhamkaushal765/TransformerQEC">TransformerQEC</a>
            {'  '}
            <a href="https://github.com/shubhamkaushal765/tell-me-why">tell-me-why</a>
          </div>
        </div>
      </div>
    </dialog>
  );
}
