import { motion } from "framer-motion";


interface FadeInProps {
  children: React.ReactNode;
}
export function FadeIn({ children }: FadeInProps) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 3, ease: "easeOut" }}
    >
      {children}
    </motion.div>
  );
}
