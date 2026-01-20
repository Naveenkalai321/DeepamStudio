import { Link, useLocation } from "wouter";
import { useState, useEffect } from "react";
import { Menu, X, Camera, Phone } from "lucide-react";
import { Button } from "./ui/button";

export function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [location] = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Services", href: "/services" },
    { name: "Portfolio", href: "/portfolio" },
    { name: "Contact", href: "/contact" },
  ];

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? "glass-header py-3" : "bg-transparent py-5"}`}>
      <div className="container mx-auto px-4 md:px-8 flex justify-between items-center">
        <Link href="/" className="flex items-center gap-2 group cursor-pointer">
          <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-2 rounded-lg group-hover:shadow-lg group-hover:shadow-purple-500/25 transition-all">
            <Camera className="w-6 h-6 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="font-display font-bold text-xl leading-none text-white tracking-wide">Deepam</span>
            <span className="text-xs text-muted-foreground uppercase tracking-widest">Digital Studio</span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link key={link.name} href={link.href} className={`text-sm font-medium transition-colors hover:text-primary ${location === link.href ? "text-primary" : "text-gray-300"}`}>
              {link.name}
            </Link>
          ))}
          <a href="tel:9843028321">
            <Button size="sm" className="bg-gradient-primary hover:opacity-90 transition-opacity rounded-full px-6">
              <Phone className="w-4 h-4 mr-2" />
              Call Now
            </Button>
          </a>
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden text-white" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-full left-0 w-full bg-zinc-950 border-b border-white/10 p-4 flex flex-col gap-4 shadow-2xl animate-in slide-in-from-top-5">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href} 
              className={`text-lg font-medium p-2 rounded-lg ${location === link.href ? "bg-primary/10 text-primary" : "text-gray-300"}`}
              onClick={() => setIsOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <a href="tel:9843028321" className="w-full">
            <Button className="w-full bg-gradient-primary">Call Now</Button>
          </a>
        </div>
      )}
    </nav>
  );
}
