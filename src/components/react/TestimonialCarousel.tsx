import { useEffect, useState, useCallback } from 'react';
import { Star, ChevronLeft, ChevronRight } from 'lucide-react';
import type { Testimonial } from '@/config/site';

interface Props {
  items: Testimonial[];
}

export default function TestimonialCarousel({ items }: Props) {
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);

  // Auto-rotate cada 4s
  useEffect(() => {
    if (paused || items.length <= 1) return;
    const id = setInterval(() => {
      setIndex((prev) => (prev + 1) % items.length);
    }, 4000);
    return () => clearInterval(id);
  }, [paused, items.length]);

  const goTo = useCallback((i: number) => {
    setIndex(((i % items.length) + items.length) % items.length);
  }, [items.length]);

  const next = useCallback(() => setIndex((prev) => (prev + 1) % items.length), [items.length]);
  const prev = useCallback(() => setIndex((prev) => (prev - 1 + items.length) % items.length), [items.length]);

  if (items.length === 0) return null;

  // Ventana de 3 para desktop con wrap-around
  const visibleDesktop: Testimonial[] = [];
  for (let i = 0; i < 3; i++) {
    const t = items[(index + i) % items.length];
    if (t) visibleDesktop.push(t);
  }
  // Para mobile solo 1
  const visibleMobile = items[index]!;

  return (
    <div
      className="relative w-full"
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
    >
      {/* Flechas laterales */}
      <button
        type="button"
        aria-label="Reseña anterior"
        onClick={prev}
        className="absolute left-0 top-1/2 z-10 hidden -translate-y-1/2 -translate-x-2 items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-white/70 backdrop-blur transition hover:bg-white/10 hover:text-white md:flex lg:-translate-x-6"
      >
        <ChevronLeft className="size-5" aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label="Siguiente reseña"
        onClick={next}
        className="absolute right-0 top-1/2 z-10 hidden -translate-y-1/2 translate-x-2 items-center justify-center rounded-full border border-white/10 bg-white/5 p-3 text-white/70 backdrop-blur transition hover:bg-white/10 hover:text-white md:flex lg:translate-x-6"
      >
        <ChevronRight className="size-5" aria-hidden="true" />
      </button>
      {/* Mobile: 1 card */}
      <div className="md:hidden">
        <figure
          key={`m-${index}-${visibleMobile.name}`}
          className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-500"
        >
          <div className="flex items-center gap-0.5" aria-label="Valoración: 5 de 5 estrellas">
            {Array.from({ length: 5 }).map((_, i) => (
              <Star
                key={i}
                className="size-5 fill-brand-300 text-brand-300 stroke-none"
                fill="currentColor"
                aria-hidden="true"
              />
            ))}
          </div>
          <blockquote className="mt-4 text-sm leading-relaxed text-white/80">
            “{visibleMobile.quote}”
          </blockquote>
          <figcaption className="mt-6 border-t border-white/10 pt-4">
            <p className="font-semibold text-white">{visibleMobile.name}</p>
            <p className="text-sm text-white/50">{visibleMobile.role}</p>
          </figcaption>
        </figure>
      </div>

      {/* Desktop: 3 cards */}
      <div className="hidden grid-cols-1 gap-6 md:grid md:grid-cols-3">
        {visibleDesktop.map((testimonial, i) => (
          <figure
            key={`d-${(index + i) % items.length}-${testimonial.name}`}
            className="flex flex-col justify-between rounded-2xl border border-white/10 bg-white/[0.04] p-7 backdrop-blur-sm transition-all duration-500"
          >
            <div className="flex items-center gap-0.5" aria-label="Valoración: 5 de 5 estrellas">
              {Array.from({ length: 5 }).map((_, starIdx) => (
                <Star
                  key={starIdx}
                  className="size-5 fill-brand-300 text-brand-300 stroke-none"
                  fill="currentColor"
                  aria-hidden="true"
                />
              ))}
            </div>
            <blockquote className="mt-4 text-sm leading-relaxed text-white/80">
              “{testimonial.quote}”
            </blockquote>
            <figcaption className="mt-6 border-t border-white/10 pt-4">
              <p className="font-semibold text-white">{testimonial.name}</p>
              <p className="text-sm text-white/50">{testimonial.role}</p>
            </figcaption>
          </figure>
        ))}
      </div>

      {/* Dots: • • • • •  — navegación del mock */}
      <div className="mt-10 flex items-center justify-center gap-2.5" role="tablist" aria-label="Navegación de reseñas">
        {items.map((_, dotIdx) => {
          const isActive = dotIdx === index;
          return (
            <button
              key={dotIdx}
              type="button"
              role="tab"
              aria-selected={isActive}
              aria-label={`Ir a reseña ${dotIdx + 1} de ${items.length}`}
              onClick={() => goTo(dotIdx)}
              className={
                isActive
                  ? 'h-2 w-6 rounded-full bg-brand-300 transition-all duration-300'
                  : 'h-2 w-2 rounded-full bg-white/20 transition-all duration-300 hover:bg-white/40'
              }
            />
          );
        })}
      </div>
    </div>
  );
}
