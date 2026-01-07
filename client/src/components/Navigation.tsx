import { useState, useEffect } from "react";
import { Menu, X, MessageCircle, Facebook, Linkedin, Twitter, Instagram, Mail } from "lucide-react";
import { Link, useLocation } from "wouter";
import { cn } from "@/lib/utils";

const NAV_LINKS = [
  { name: "الرئيسية", href: "#home" },
  { name: "خدماتنا", href: "#services" },
  { name: "من نحن", href: "#about" },
  { name: "التدريب", href: "#training" },
  { name: "اتصل بنا", href: "#contact" },
];

export function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [showSocialMenu, setShowSocialMenu] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    
    const handleClickOutside = (e: MouseEvent) => {
      if (showSocialMenu && !(e.target as Element).closest('.social-menu-container')) {
        setShowSocialMenu(false);
      }
    };
    
    window.addEventListener("scroll", handleScroll);
    document.addEventListener("click", handleClickOutside);
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showSocialMenu]);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
    
    // If we're not on the home page, navigate to home first
    if (location !== '/') {
      window.location.href = `/${href}`;
      return;
    }
    
    const element = document.querySelector(href);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setIsMobileMenuOpen(false);
    }
  };

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300 border-b border-transparent",
        isScrolled || location !== '/' ? "bg-white/95 backdrop-blur-md shadow-sm border-gray-100 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-4">
          <Link href="/" className="flex items-center">
            <img 
              src="/logo.svg" 
              alt="Logo" 
              className="h-14 w-14 object-contain transition-transform hover:scale-105"
              onError={(e) => {
                // Fallback if logo doesn't load
                const target = e.target as HTMLImageElement;
                target.style.display = 'none';
              }}
            />
          </Link>
          <div className="flex flex-col">
            <Link href="/" className={cn(
              "text-2xl font-bold leading-tight transition-colors",
              isScrolled || location !== '/' ? "text-[#4F516F]" : "text-white"
            )}>
              أماني صادق وشركاه
            </Link>
            <span className="text-xs text-[#D6BF78] font-semibold tracking-wide">
              محاسبون قانونيون ومراجعون
            </span>
          </div>
        </div>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className={cn(
                "text-sm font-medium transition-colors hover:text-[#D6BF78] relative group",
                isScrolled || location !== '/' ? "text-[#4F516F]" : "text-white"
              )}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D6BF78] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          
          <div className="relative social-menu-container">
            <button
              onClick={() => setShowSocialMenu(!showSocialMenu)}
              className={cn(
                "flex items-center gap-2 px-5 py-2.5 rounded-full font-bold text-sm transition-transform hover:-translate-y-0.5 active:translate-y-0",
                isScrolled || location !== '/' ? "bg-[#D6BF78] hover:bg-[#c9b068] text-[#4F516F]" : "bg-[#D6BF78] hover:bg-[#c9b068] text-[#4F516F]"
              )}
            >
              <MessageCircle className="w-4 h-4" />
              <span>استشارة</span>
            </button>

            {showSocialMenu && (
              <div className="absolute top-full left-0 mt-2 bg-white rounded-xl shadow-xl border border-gray-100 p-4 min-w-[240px] z-50 animate-in fade-in slide-in-from-top-2">
                <p className="text-sm text-gray-600 mb-3 font-semibold">تواصل معنا عبر:</p>
                <div className="space-y-2">
                  <a
                    href="https://wa.me/201234567890"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center group-hover:bg-green-500 transition-colors">
                      <MessageCircle className="w-4 h-4 text-green-600 group-hover:text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">واتساب</span>
                  </a>

                  <a
                    href="https://facebook.com/amanysadek"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors">
                      <Facebook className="w-4 h-4 text-blue-600 group-hover:text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">فيسبوك</span>
                  </a>

                  <a
                    href="https://linkedin.com/company/amanysadek"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center group-hover:bg-blue-700 transition-colors">
                      <Linkedin className="w-4 h-4 text-blue-700 group-hover:text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">لينكدإن</span>
                  </a>

                  <a
                    href="https://twitter.com/amanysadek"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="w-8 h-8 bg-sky-100 rounded-full flex items-center justify-center group-hover:bg-sky-500 transition-colors">
                      <Twitter className="w-4 h-4 text-sky-500 group-hover:text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">تويتر</span>
                  </a>

                  <a
                    href="https://instagram.com/amanysadek"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="w-8 h-8 bg-pink-100 rounded-full flex items-center justify-center group-hover:bg-pink-600 transition-colors">
                      <Instagram className="w-4 h-4 text-pink-600 group-hover:text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">إنستغرام</span>
                  </a>

                  <a
                    href="mailto:info@amanysadek.com"
                    className="flex items-center gap-3 p-2 hover:bg-gray-50 rounded-lg transition-colors group"
                  >
                    <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center group-hover:bg-gray-600 transition-colors">
                      <Mail className="w-4 h-4 text-gray-600 group-hover:text-white" />
                    </div>
                    <span className="text-sm font-medium text-gray-700">بريد إلكتروني</span>
                  </a>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden p-2 rounded-lg transition-colors",
            isScrolled || location !== '/' ? "text-[#4F516F] hover:bg-gray-100" : "text-white hover:bg-white/10"
          )}
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
        >
          {isMobileMenuOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 bg-white border-b shadow-xl p-4 md:hidden flex flex-col gap-2 animate-in slide-in-from-top-2">
          {NAV_LINKS.map((link) => (
            <a
              key={link.name}
              href={link.href}
              onClick={(e) => scrollToSection(e, link.href)}
              className="px-4 py-3 text-[#4F516F] hover:bg-gray-50 rounded-lg font-medium hover:text-[#D6BF78] transition-colors"
            >
              {link.name}
            </a>
          ))}
        </div>
      )}
    </nav>
  );
}
