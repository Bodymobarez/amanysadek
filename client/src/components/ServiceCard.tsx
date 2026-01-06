import { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";
import { Link } from "wouter";

interface ServiceCardProps {
  title: string;
  description: string;
  icon: LucideIcon;
  delay?: number;
  href?: string;
}

export function ServiceCard({ title, description, icon: Icon, delay = 0, href }: ServiceCardProps) {
  const content = (
    <>
      <div className="w-14 h-14 bg-[#F7F6F2] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#4F516F] transition-colors duration-300">
        <Icon className="w-7 h-7 text-[#4F516F] group-hover:text-[#D6BF78] transition-colors duration-300" />
      </div>
      
      <h3 className="text-xl font-bold text-[#4F516F] mb-3 group-hover:text-[#D6BF78] transition-colors">
        {title}
      </h3>
      
      <p className="text-gray-500 leading-relaxed text-sm mb-4">
        {description}
      </p>

      {href && (
        <span className="inline-flex items-center gap-2 text-[#D6BF78] font-semibold text-sm group-hover:gap-3 transition-all">
          اعرف المزيد
          <span>←</span>
        </span>
      )}
    </>
  );

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      {href ? (
        <Link href={href}>
          <div className="group block p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#D6BF78]/30 transition-all duration-300 cursor-pointer h-full">
            {content}
          </div>
        </Link>
      ) : (
        <div className="group block p-8 bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#D6BF78]/30 transition-all duration-300 h-full">
          {content}
        </div>
      )}
    </motion.div>
  );
}
