"use client";

import { motion, useReducedMotion } from "motion/react";
import { type ReactNode } from "react";
import {
  fadeUp,
  fadeUpTransition,
  staggerContainer,
} from "@/lib/motion";

type RevealProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
  delay?: number;
  /** Animate on mount instead of waiting for scroll into view */
  immediate?: boolean;
};

export function Reveal({
  children,
  className = "",
  as = "div",
  delay = 0,
  immediate = false,
}: RevealProps) {
  const reduceMotion = useReducedMotion();
  const Component = as === "section" ? motion.section : motion.div;
  const variants = reduceMotion
    ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
    : fadeUp;

  return (
    <Component
      className={className}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" as const }
        : {
            whileInView: "visible" as const,
            viewport: { once: true, amount: 0.15, margin: "0px 0px -40px 0px" },
          })}
      variants={variants}
      transition={{ ...fadeUpTransition, delay: reduceMotion ? 0 : delay }}
    >
      {children}
    </Component>
  );
}

type StaggerProps = {
  children: ReactNode;
  className?: string;
  as?: "div" | "section";
  immediate?: boolean;
};

export function Stagger({
  children,
  className = "",
  as = "div",
  immediate = false,
}: StaggerProps) {
  const reduceMotion = useReducedMotion();
  const Component = as === "section" ? motion.section : motion.div;

  return (
    <Component
      className={className}
      initial="hidden"
      {...(immediate
        ? { animate: "visible" as const }
        : {
            whileInView: "visible" as const,
            viewport: { once: true, amount: 0.12, margin: "0px 0px -30px 0px" },
          })}
      variants={reduceMotion ? { hidden: {}, visible: {} } : staggerContainer}
    >
      {children}
    </Component>
  );
}

export function StaggerItem({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      variants={
        reduceMotion
          ? { hidden: { opacity: 1, y: 0 }, visible: { opacity: 1, y: 0 } }
          : fadeUp
      }
      transition={fadeUpTransition}
    >
      {children}
    </motion.div>
  );
}
