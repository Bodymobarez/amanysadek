import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
}

export function ServiceCard({ title, description, icon: Icon, delay = 0 }: ServiceCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#D6BF78]/30 transition-all duration-300"
    >
      <div className="w-14 h-14 bg-[#F7F6F2] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#4F516F] transition-colors duration-300">
        <Icon className="w-7 h-7 text-[#4F516F] group-hover:text-[#D6BF78] transition-colors duration-300" />
      </div>
      
      <h3 className="text-xl font-bold text-[#4F516F] mb-3 group-hover:text-[#D6BF78] transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-500 leading-relaxed text-sm">
        {description}
      </p>
    </motion.div>
  );
}
