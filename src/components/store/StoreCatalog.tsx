"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import {
  productCategories,
  type Product,
  type ProductCategory,
} from "@/content/products";
import { fadeUp, fadeUpTransition } from "@/lib/motion";
import { Reveal, Stagger, StaggerItem } from "@/components/ui/Reveal";
import { ProductCard } from "./ProductCard";

export function StoreCatalog({ products }: { products: Product[] }) {
  const [active, setActive] = useState<(typeof productCategories)[number]>(
    "All Products",
  );
  const reduceMotion = useReducedMotion();

  const filtered = useMemo(() => {
    if (active === "All Products") return products;
    return products.filter((p) => p.category === (active as ProductCategory));
  }, [active, products]);

  return (
    <div className="grid grid-cols-[1fr_200px] gap-12 max-lg:grid-cols-1">
      <div>
        <Reveal immediate>
          <h1 className="mb-12 font-display text-[clamp(40px,5vw,64px)] font-normal leading-[0.95] tracking-[-0.05em]">
            BrownSquare Toolkit
          </h1>
        </Reveal>
        <AnimatePresence mode="popLayout">
          <motion.div
            key={active}
            className="grid grid-cols-2 gap-x-10 gap-y-14 max-md:grid-cols-1"
            initial={reduceMotion ? false : "hidden"}
            animate="visible"
            variants={{
              hidden: {},
              visible: {
                transition: { staggerChildren: 0.07, delayChildren: 0.02 },
              },
            }}
          >
            {filtered.map((product) => (
              <motion.div
                key={product.id}
                layout={!reduceMotion}
                variants={
                  reduceMotion
                    ? { hidden: { opacity: 1 }, visible: { opacity: 1 } }
                    : fadeUp
                }
                transition={fadeUpTransition}
              >
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        </AnimatePresence>
        {filtered.length === 0 ? (
          <p className="text-muted">No products in this category yet.</p>
        ) : null}
      </div>

      <Stagger
        immediate
        className="flex flex-col gap-2 max-lg:flex-row max-lg:flex-wrap lg:sticky lg:top-[110px] lg:self-start"
      >
        {productCategories.map((category) => {
          const isActive = category === active;
          return (
            <StaggerItem key={category}>
              <button
                type="button"
                onClick={() => setActive(category)}
                className={`rounded-md px-4 py-2.5 text-left text-sm transition-colors ${
                  isActive
                    ? "font-bold text-accent"
                    : "bg-warm/70 text-ink hover:bg-warm"
                }`}
              >
                {category}
              </button>
            </StaggerItem>
          );
        })}
      </Stagger>
    </div>
  );
}
