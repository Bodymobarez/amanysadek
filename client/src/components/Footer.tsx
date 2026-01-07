import { Link } from "wouter";
import { Facebook, Linkedin, Twitter, Instagram, Mail, Phone, MapPin } from "lucide-react";

export function Footer() {
  return (
    <footer className="bg-[#4F516F] text-white py-12 border-t border-white/10">
      <div className="container mx-auto px-4 md:px-6">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          <div className="col-span-1 md:col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <img 
                src="/logo.svg" 
                alt="Logo" 
                className="h-10 w-10 object-contain"
                onError={(e) => {
                  // Fallback if logo doesn't load
                  const target = e.target as HTMLImageElement;
                  target.style.display = 'none';
                }}
              />
              <div>
                <h2 className="text-2xl font-bold">أماني صادق وشركاه</h2>
                <span className="text-xs text-[#D6BF78] font-semibold">محاسبون قانونيون ومراجعون</span>
              </div>
            </div>
            <p className="text-gray-400 max-w-sm leading-relaxed mb-4">
              مكتب محاسبة ومراجعة رائد يقدم حلولاً مالية وقانونية متكاملة للشركات والأفراد. نلتزم بأعلى معايير المهنية والشفافية.
            </p>
            <div className="flex flex-col gap-2 text-sm text-gray-400">
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4" />
                <span>+20 123 456 7890</span>
              </div>
              <div className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                <span>info@amanysadek.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4" />
                <span>القاهرة، مصر</span>
              </div>
            </div>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#D6BF78]">روابط سريعة</h3>
            <ul className="space-y-3">
              <li><Link href="/" className="text-gray-400 hover:text-white transition-colors">الرئيسية</Link></li>
              <li><Link href="/#services" className="text-gray-400 hover:text-white transition-colors">خدماتنا</Link></li>
              <li><Link href="/#about" className="text-gray-400 hover:text-white transition-colors">من نحن</Link></li>
              <li><Link href="/#contact" className="text-gray-400 hover:text-white transition-colors">اتصل بنا</Link></li>
            </ul>
          </div>
          
          <div>
            <h3 className="font-bold text-lg mb-4 text-[#D6BF78]">خدماتنا</h3>
            <ul className="space-y-3">
              <li><Link href="/services/company-formation" className="text-gray-400 hover:text-white transition-colors">تأسيس الشركات</Link></li>
              <li><Link href="/services/auditing" className="text-gray-400 hover:text-white transition-colors">المراجعة والتدقيق</Link></li>
              <li><Link href="/services/tax-consulting" className="text-gray-400 hover:text-white transition-colors">الاستشارات الضريبية</Link></li>
              <li><Link href="/services/legal-services" className="text-gray-400 hover:text-white transition-colors">الخدمات القانونية</Link></li>
              <li><Link href="/services/feasibility-studies" className="text-gray-400 hover:text-white transition-colors">دراسات الجدوى</Link></li>
              <li><Link href="/services/payroll-management" className="text-gray-400 hover:text-white transition-colors">إدارة الرواتب</Link></li>
            </ul>
          </div>
        </div>
        
        <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm">
            © {new Date().getFullYear()} أماني صادق وشركاه. جميع الحقوق محفوظة.
          </p>
          <div className="flex gap-4">
            <a href="https://facebook.com/amanysadek" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#D6BF78] transition-colors">
              <Facebook className="w-5 h-5" />
            </a>
            <a href="https://linkedin.com/company/amanysadek" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#D6BF78] transition-colors">
              <Linkedin className="w-5 h-5" />
            </a>
            <a href="https://twitter.com/amanysadek" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#D6BF78] transition-colors">
              <Twitter className="w-5 h-5" />
            </a>
            <a href="https://instagram.com/amanysadek" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:text-[#D6BF78] transition-colors">
              <Instagram className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

