import { Camera, MapPin, Phone, Mail, Instagram, Facebook, Twitter } from "lucide-react";
import { Link } from "wouter";

export function Footer() {
  return (
    <footer className="bg-zinc-950 border-t border-white/10 pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div className="space-y-4">
            <div className="flex items-center gap-2">
              <div className="bg-gradient-to-br from-purple-600 to-pink-500 p-2 rounded-lg">
                <Camera className="w-6 h-6 text-white" />
              </div>
              <span className="font-display font-bold text-xl tracking-wide text-white">Deepam Digital Studio</span>
            </div>
            <p className="text-zinc-400 text-sm leading-relaxed">
              Capturing life's most beautiful moments with professional precision and artistic vision since 2010.
            </p>
            <div className="flex gap-4">
              {[Instagram, Facebook, Twitter].map((Icon, i) => (
                <a key={i} href="#" className="w-10 h-10 rounded-full bg-zinc-900 flex items-center justify-center hover:bg-primary hover:text-white transition-colors text-zinc-400">
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-bold text-lg text-white mb-6">Quick Links</h4>
            <ul className="space-y-3">
              {[
                { label: "Home", href: "/" },
                { label: "About Us", href: "/about" },
                { label: "Our Services", href: "/services" },
                { label: "Portfolio", href: "/portfolio" },
                { label: "Contact", href: "/contact" },
              ].map((link) => (
                <li key={link.label}>
                  <Link href={link.href} className="text-zinc-400 hover:text-primary transition-colors text-sm">
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="font-display font-bold text-lg text-white mb-6">Services</h4>
            <ul className="space-y-3">
              <li className="text-zinc-400 text-sm">Wedding Photography</li>
              <li className="text-zinc-400 text-sm">Candid Photography</li>
              <li className="text-zinc-400 text-sm">Studio Portraits</li>
              <li className="text-zinc-400 text-sm">Outdoor Shoots</li>
              <li className="text-zinc-400 text-sm">Event Coverage</li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-display font-bold text-lg text-white mb-6">Contact Us</h4>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-zinc-400 text-sm">
                <MapPin className="w-5 h-5 text-primary shrink-0" />
                <span>Kallakurachi, Sankarapuram Taluk (near Vadaponparrapi bus stop), PIN 605702</span>
              </li>
              <li className="flex items-center gap-3 text-zinc-400 text-sm">
                <Phone className="w-5 h-5 text-primary shrink-0" />
                <a href="tel:9843028321" className="hover:text-white">9843028321</a>
              </li>
              <li className="flex items-center gap-3 text-zinc-400 text-sm">
                <Mail className="w-5 h-5 text-primary shrink-0" />
                <a href="mailto:monishvenkat@gmail.com" className="hover:text-white">monishvenkat@gmail.com</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-white/5 pt-8 text-center text-zinc-500 text-sm">
          &copy; {new Date().getFullYear()} Deepam Digital Studio. All rights reserved.
        </div>
      </div>
    </footer>
  );
}
