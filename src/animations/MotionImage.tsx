import { motion } from "framer-motion";

interface MotionImageProps {
  children: React.ReactNode;
}

export function MotionImage({ children }: MotionImageProps) {
  return (
    <motion.div
      className="overflow-hidden rounded-md"
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}