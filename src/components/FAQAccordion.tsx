import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";

interface FAQItem {
  q: string;
  a: string;
}

interface FAQAccordionProps {
  items: FAQItem[];
  /** Optional section heading */
  heading?: string;
  /** Optional CSS class for the wrapping section */
  className?: string;
  /** bg color token for section background, e.g. "bg-white" or "bg-sky-50" */
  bg?: string;
}

export function FAQAccordion({ items, heading, className = "", bg = "bg-white" }: FAQAccordionProps) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section className={`py-16 px-4 sm:px-6 ${bg} ${className}`}>
      <div className="max-w-3xl mx-auto">
        {heading && (
          <h2 className="text-2xl sm:text-3xl font-extrabold text-gray-900 mb-10 text-center">
            {heading}
          </h2>
        )}
        <div className="space-y-3">
          {items.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <div
                key={i}
                className={`rounded-2xl border transition-colors duration-200 overflow-hidden ${
                  isOpen
                    ? "border-sky-400 bg-sky-50 shadow-md shadow-sky-100"
                    : "border-sky-100 bg-white hover:border-sky-300 hover:shadow-sm"
                }`}
              >
                {/* Question row */}
                <button
                  onClick={() => toggle(i)}
                  className="w-full flex items-center justify-between gap-4 px-5 py-4 text-left focus:outline-none focus-visible:ring-2 focus-visible:ring-sky-400 rounded-2xl"
                  aria-expanded={isOpen}
                >
                  <h3 className={`text-sm sm:text-base font-semibold leading-snug transition-colors ${isOpen ? "text-sky-600" : "text-gray-900"}`}>
                    {faq.q}
                  </h3>
                  <span
                    className={`flex-shrink-0 w-7 h-7 rounded-full flex items-center justify-center transition-colors duration-200 ${
                      isOpen ? "bg-sky-500 text-white" : "bg-sky-100 text-sky-600"
                    }`}
                  >
                    {isOpen
                      ? <Minus className="w-3.5 h-3.5" />
                      : <Plus className="w-3.5 h-3.5" />
                    }
                  </span>
                </button>

                {/* Answer — animated */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      key="answer"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.25, ease: "easeInOut" }}
                      style={{ overflow: "hidden" }}
                    >
                      <p className="px-5 pb-5 text-sm text-gray-600 leading-relaxed border-t border-sky-100 pt-3">
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
