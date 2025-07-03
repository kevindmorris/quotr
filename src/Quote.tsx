import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import type { Quote } from "./types";

export default function QuoteBox() {
  const [quote, setQuote] = useState<Quote | null>({
    author: "Oscar Wilde",
    content: "Be yourself; everyone else is already taken.",
  });
  const [isVisible, setIsVisible] = useState<Quote | null>(null);
  const interval = useRef<number | null>(null);

  useEffect(() => {
    const getQuote = async () => {
      try {
        const res = await fetch("https://api.quotable.io/random");
        if (!res.ok) throw new Error("API error");

        const data: Quote = await res.json();
        setQuote(data);
      } catch (error) {
        console.error(error);
        if (interval.current) {
          clearInterval(interval.current);
          interval.current = null;
        }
      }
    };

    getQuote();

    interval.current = setInterval(() => {
      getQuote();
    }, 15000);

    return () => {
      if (interval.current !== null) {
        clearInterval(interval.current);
      }
    };
  }, []);

  useEffect(() => {
    if (!quote) return;

    setIsVisible(null);
    const timeout = setTimeout(() => setIsVisible(quote), 50);

    return () => clearTimeout(timeout);
  }, [quote]);

  return (
    <AnimatePresence mode="wait">
      {isVisible && (
        <motion.div
          key={isVisible.content}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.4 }}
        >
          <h2 className="text-xl font-semibold text-gray-800">
            "{isVisible.content}"
          </h2>
          <p className="mt-2 text-gray-600">— {isVisible.author}</p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
