import { LucideIcon, ChevronDown } from "lucide-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle2 } from "lucide-react";

interface DetailedServiceCardProps {
  title: string;
  description?: string;
  icon: LucideIcon;
  delay?: number;
  href?: string;
  subServices?: string[];
}

export function DetailedServiceCard({ 
  title, 
  description, 
  icon: Icon, 
  delay = 0, 
  href,
  subServices = []
}: DetailedServiceCardProps) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="h-full"
    >
      <div className="group bg-white rounded-2xl border border-gray-100 shadow-sm hover:shadow-xl hover:border-[#D6BF78]/30 transition-all duration-300 h-full flex flex-col">
        <div 
          className="p-8 cursor-pointer flex-1 flex flex-col"
          onClick={() => subServices.length > 0 && setIsExpanded(!isExpanded)}
        >
          <div className="w-14 h-14 bg-[#F7F6F2] rounded-xl flex items-center justify-center mb-6 group-hover:bg-[#4F516F] transition-colors duration-300">
            <Icon className="w-7 h-7 text-[#4F516F] group-hover:text-[#D6BF78] transition-colors duration-300" />
          </div>
          
          <h3 className="text-xl font-bold text-[#4F516F] mb-3 group-hover:text-[#D6BF78] transition-colors">
            {title}
          </h3>
          
          {description && (
            <p className="text-gray-500 leading-relaxed text-sm mb-4 flex-1">
              {description}
            </p>
          )}

          {subServices.length > 0 && (
            <div className="flex items-center justify-between mt-4">
              <span className="text-sm text-gray-500">
                {subServices.length} خدمة فرعية
              </span>
              <ChevronDown 
                className={`w-5 h-5 text-[#D6BF78] transition-transform duration-300 ${
                  isExpanded ? 'rotate-180' : ''
                }`} 
              />
            </div>
          )}

          {href && subServices.length === 0 && (
            <span className="inline-flex items-center gap-2 text-[#D6BF78] font-semibold text-sm group-hover:gap-3 transition-all mt-4">
              اعرف المزيد
              <span>←</span>
            </span>
          )}
        </div>

        <AnimatePresence>
          {isExpanded && subServices.length > 0 && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <div className="px-8 pb-8 border-t border-gray-100 pt-6">
                <ul className="space-y-3">
                  {subServices.map((service, idx) => (
                    <motion.li
                      key={idx}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: idx * 0.05 }}
                      className="flex items-start gap-3 text-sm text-gray-700"
                    >
                      <CheckCircle2 className="w-4 h-4 text-[#D6BF78] flex-shrink-0 mt-0.5" />
                      <span>{service}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
}

