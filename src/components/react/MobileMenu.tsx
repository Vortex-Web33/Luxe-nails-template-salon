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
        className="inline-flex size-10 items-center justify-center rounded-full border border-white/10 bg-white/[0.04] text-white/70 backdrop-blur transition duration-200 hover:border-brand-500/20 hover:bg-brand-500/10 hover:text-brand-200"
      >
        {open ? <X className="size-5" aria-hidden="true" /> : <Menu className="size-5" aria-hidden="true" />}
      </button>

      {open && (
        <nav
          id="mobile-menu"
          aria-label="Menú móvil"
          className="absolute inset-x-0 top-full z-40 mx-4 mt-3 rounded-2xl border border-brand-500/10 bg-[#111111] p-2 shadow-[0_16px_48px_rgba(0,0,0,0.55)] backdrop-blur-xl"
        >
          <ul className="flex flex-col gap-1 p-2">
            {items.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block rounded-xl px-4 py-3 text-xs font-medium uppercase tracking-[0.14em] text-white/80 transition-transform duration-200 hover:scale-105 hover:bg-brand-500/10 hover:text-brand-200"
                >
                  {item.label.toUpperCase()}
                </a>
              </li>
            ))}
          </ul>
          {/* CTA dentro del drawer */}
          {items.length > 0 && items.at(-1) && (
            <div className="border-t border-brand-500/10 p-3 pt-3">
              <a
                href={items.at(-1)!.href}
                onClick={() => setOpen(false)}
                aria-label="Reservar manicura en Madrid — Luxe Nail Studio Serrano 42"
                className="flex w-full items-center justify-center rounded-full bg-[#d48a8a] px-6 py-3 text-xs font-semibold uppercase tracking-[0.14em] text-white shadow-[0_4px_20px_rgba(212,138,138,0.35)] transition hover:bg-[#c27474]"
              >
                Reservar manicura en Madrid
              </a>
            </div>
          )}
        </nav>
      )}
    </div>
  );
}
