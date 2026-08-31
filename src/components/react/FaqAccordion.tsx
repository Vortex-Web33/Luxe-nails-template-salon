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
    <div className="mx-auto max-w-3xl divide-y divide-slate-200 rounded-2xl border border-slate-200 bg-white shadow-sm">
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
                className="flex w-full items-center justify-between gap-4 px-6 py-5 text-left text-base font-semibold text-slate-900 transition hover:text-brand-600"
              >
                {item.question}
                <ChevronDown
                  aria-hidden="true"
                  className={`size-5 shrink-0 text-brand-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}
                />
              </button>
            </h3>
            <div
              id={`faq-panel-${index}`}
              role="region"
              aria-labelledby={`faq-trigger-${index}`}
              className={isOpen ? 'px-6 pb-5' : 'hidden'}
            >
              <p className="text-sm leading-relaxed text-slate-600">{item.answer}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
}
