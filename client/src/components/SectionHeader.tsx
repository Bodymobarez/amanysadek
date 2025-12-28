import { motion } from "framer-motion";

interface SectionHeaderProps {
  title: string;
  subtitle: string;
  centered?: boolean;
}

export function SectionHeader({ title, subtitle, centered = true }: SectionHeaderProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className={`mb-16 ${centered ? 'text-center' : 'text-right'}`}
    >
      <span className="text-[#D6BF78] font-bold text-sm tracking-widest uppercase mb-2 block">
        {subtitle}
      </span>
      <h2 className="text-3xl md:text-4xl font-bold text-[#4F516F] relative inline-block pb-4">
        {title}
        <span className={`absolute bottom-0 ${centered ? 'left-1/2 -translate-x-1/2' : 'right-0'} w-20 h-1 bg-[#D6BF78] rounded-full`} />
      </h2>
    </motion.div>
  );
}
