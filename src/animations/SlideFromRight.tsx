import { motion } from "framer-motion";

interface SlideFromRightProps {
  children: React.ReactNode;
  delay?: number; // Optional delay for the animation
}
export function SlideFromRight({ children, delay = 0 }: SlideFromRightProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: 60 }}     // start 60px to the right
      whileInView={{ opacity: 1, x: 0 }} // slide to original position
      viewport={{ once: true }}          // animate only once
      transition={{ duration: 0.8, delay, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
