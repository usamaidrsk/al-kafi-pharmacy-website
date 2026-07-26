"use client";

import { MotionConfig, motion, useReducedMotion } from "framer-motion";
import React from "react";

export const MainComponent = ({ children }: { children: React.ReactNode }) => {
  const shouldReduceMotion = useReducedMotion();

  return (
    <MotionConfig reducedMotion="user">
      <motion.main
        initial={shouldReduceMotion ? false : { opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: shouldReduceMotion ? 0 : 0.5 }}
        className="w-full"
      >
        {children}
      </motion.main>
    </MotionConfig>
  );
};
