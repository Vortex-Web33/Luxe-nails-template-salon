import { useState } from 'react';
import { Menu, X } from 'lucide-react';
import type { NavItem } from '@/config/site';

interface Props {
  items: NavItem[];
}

export default function MobileMenu({ items }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="lg:hidden">
      <button
        type="button"
        aria-expanded={open}
        aria-controls="mobile-menu"
        aria-label={open ? 'Cerrar menú' : 'Abrir menú'}
        onClick={() => setOpen((value) => !value)}
        className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 backdrop-blur transition hover:bg-white/10 hover:text-white hover:border-white/15"
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Menú móvil"
          className="absolute inset-x-0 top-full z-40 mx-4 mt-3 rounded-2xl border border-white/10 bg-[#111111] p-2 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        >
          <ul className="flex flex-col gap-1 p-2">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white/65 transition hover:bg-white/[0.06] hover:text-white"
                >
                  {item.label.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
          {/* CTA dentro del drawer */}
          {items.length > 0 && items.at(-1) && (
            <div className="border-t border-white/[0.06] p-3 pt-3">
              <a
                href={items.at(-1)!.href}
                onClick={() => setOpen(false)}
                className="flex w-full items-center justify-center rounded-full bg-[#d48a8a] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_4px_20px_rgba(212,138,138,0.35)] transition hover:bg-[#c27474]"
              >
                BOOK APPOINTMENT
              </a>
            </div>
          )}
        </nav>
      )}
    </div>
  );
}
