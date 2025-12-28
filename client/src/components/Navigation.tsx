import { useState, useEffect } from "react";
import { Menu, X, Phone } from "lucide-react";
import { Link } from "wouter";
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

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    e.preventDefault();
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
        isScrolled ? "bg-white/95 backdrop-blur-md shadow-sm border-gray-100 py-3" : "bg-transparent py-5"
      )}
    >
      <div className="container mx-auto px-4 md:px-6 flex items-center justify-between">
        {/* Logo */}
        <div className="flex flex-col">
          <Link href="/" className="text-2xl font-bold text-[#4F516F] leading-tight">
            أماني صادق وشركاه
          </Link>
          <span className="text-xs text-[#D6BF78] font-semibold tracking-wide">
            محاسبون قانونيون ومراجعون
          </span>
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
                isScrolled ? "text-[#4F516F]" : "text-white"
              )}
            >
              {link.name}
              <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-[#D6BF78] transition-all duration-300 group-hover:w-full" />
            </a>
          ))}
          
          <a
            href="#contact"
            onClick={(e) => scrollToSection(e, "#contact")}
            className="flex items-center gap-2 bg-[#D6BF78] hover:bg-[#c9b068] text-[#4F516F] px-5 py-2.5 rounded-full font-bold text-sm transition-transform hover:-translate-y-0.5 active:translate-y-0"
          >
            <Phone className="w-4 h-4" />
            <span>استشارة مجانية</span>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button
          className={cn(
            "md:hidden p-2 rounded-lg transition-colors",
            isScrolled ? "text-[#4F516F] hover:bg-gray-100" : "text-white hover:bg-white/10"
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
