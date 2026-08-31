import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import type { FaqItem } from '@/config/site';

interface Props {
  items: FaqItem[];
}

export default function FaqAccordion({ items }: Props) {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (items.length === 0) return null;

  return (
    <div className="mx-auto max-w-4xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
      {items.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <div key={item.question}>
            <h3>
              <button
                type="button"
                id={`faq-trigger-${index}`}
                aria-expanded={isOpen}
                aria-controls={`faq-panel-${index}`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
                className="flex w-full items-center justify-between gap-5 px-7 py-6 text-left text-lg font-bold leading-snug tracking-tight text-slate-900 transition hover:text-brand-600 sm:text-[1.15rem]"
              >
                <span className="pr-2">{item.question}</span>
                <ChevronDown
                  aria-hidden="true"
                  className={`size-6 shrink-0 text-brand-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              className={isOpen ? 'px-7 pb-6' : 'hidden'}
            >
              <p className="text-base leading-7 text-slate-600 sm:text-[1.05rem] sm:leading-8">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
