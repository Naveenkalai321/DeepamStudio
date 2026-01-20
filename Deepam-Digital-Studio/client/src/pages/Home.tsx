import { motion } from "framer-motion";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { ArrowRight, Star, Image as ImageIcon, Video, Printer, Monitor } from "lucide-react";
import { Link } from "wouter";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { Button } from "@/components/ui/button";

const heroSlides = [
  {
    // Wedding couple looking at each other, sunset
    url: "https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=1920", 
    title: "Timeless Wedding Memories",
    subtitle: "Capturing the essence of your special day with cinematic brilliance."
  },
  {
    // Studio portrait lighting
    url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=1920",
    title: "Professional Studio Portraits",
    subtitle: "High-quality portraits that bring out the best version of you."
  },
  {
    // Outdoor nature shoot
    url: "https://images.unsplash.com/photo-1472653431158-6364773b2a56?auto=format&fit=crop&q=80&w=1920",
    title: "Stunning Outdoor Shoots",
    subtitle: "Nature is the best backdrop. Let us frame you in it."
  }
];

export default function Home() {
  const [emblaRef] = useEmblaCarousel({ loop: true }, [Autoplay({ delay: 5000 })]);

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen w-full overflow-hidden">
        <div className="absolute inset-0 z-0" ref={emblaRef}>
          <div className="flex h-full">
            {heroSlides.map((slide, idx) => (
              <div key={idx} className="relative flex-[0_0_100%] min-w-0 h-full">
                <img src={slide.url} alt={slide.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-black/60" /> {/* Overlay */}
                <div className="absolute inset-0 flex items-center justify-center text-center p-4">
                  <div className="max-w-4xl space-y-6">
                    <motion.h1 
                      initial={{ opacity: 0, y: 30 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                      className="text-5xl md:text-7xl lg:text-8xl font-display font-bold text-white tracking-tight"
                    >
                      {slide.title}
                    </motion.h1>
                    <motion.p 
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.4 }}
                      className="text-lg md:text-2xl text-gray-200 max-w-2xl mx-auto font-light"
                    >
                      {slide.subtitle}
                    </motion.p>
                    <motion.div 
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ delay: 0.6 }}
                      className="pt-8"
                    >
                      <BookingModal>
                        <Button size="lg" className="h-14 px-8 text-lg rounded-full bg-white text-black hover:bg-gray-100 hover:scale-105 transition-all duration-300 font-semibold shadow-2xl shadow-white/20">
                          Book Your Session
                          <ArrowRight className="ml-2 w-5 h-5" />
                        </Button>
                      </BookingModal>
                    </motion.div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Highlight */}
      <section className="py-24 bg-zinc-950 relative">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <span className="text-primary font-medium tracking-wider uppercase text-sm">Our Expertise</span>
            <h2 className="text-4xl md:text-5xl font-display font-bold mt-2 text-white">Services We Offer</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: ImageIcon, title: "Photography", desc: "Wedding, candid, portrait, and event photography with high-end gear." },
              { icon: Video, title: "Videography", desc: "Cinematic wedding films and event coverage in 4K resolution." },
              { icon: Printer, title: "Printing", desc: "High-quality photo prints, albums, xerox, and lamination services." },
              { icon: Monitor, title: "Editing", desc: "Professional retouching and album design services." }
            ].map((service, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="glass-card p-8 rounded-2xl hover:bg-white/5 transition-all group"
              >
                <div className="bg-primary/10 w-16 h-16 rounded-2xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-colors text-primary">
                  <service.icon className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-white">{service.title}</h3>
                <p className="text-zinc-400 leading-relaxed">{service.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* About Preview */}
      <section className="py-24 bg-zinc-900">
        <div className="container mx-auto px-4 md:px-8">
          <div className="flex flex-col lg:flex-row items-center gap-16">
            <div className="lg:w-1/2 relative">
              <div className="absolute -inset-4 bg-gradient-to-r from-purple-600 to-pink-600 rounded-3xl blur-2xl opacity-30" />
              <img 
                // Photographer holding camera
                src="https://pixabay.com/get/gfeb9c6df6aa60401d30a2fd18255296f44dc7b76bd24befc444fe2b71fdf69982a228222568c2eeb9ee14fd51132ebe2c2425e4df45475a774d91c021ff4b3b8_1280.jpg" 
                alt="Photographer" 
                className="relative rounded-3xl shadow-2xl w-full"
              />
            </div>
            <div className="lg:w-1/2 space-y-8">
              <h2 className="text-4xl md:text-5xl font-display font-bold text-white leading-tight">
                Capturing Moments, <br />
                <span className="text-gradient">Creating Legacies.</span>
              </h2>
              <p className="text-lg text-zinc-400 leading-relaxed">
                Owned by R. Venketesan, Deepam Digital Studio has been a trusted name in photography for over a decade. Located in Kallakurachi, we combine traditional values with modern technology to deliver exceptional results.
              </p>
              <div className="grid grid-cols-2 gap-6">
                <div>
                  <h4 className="text-3xl font-bold text-white mb-1">10+</h4>
                  <p className="text-sm text-zinc-500 uppercase tracking-wide">Years Experience</p>
                </div>
                <div>
                  <h4 className="text-3xl font-bold text-white mb-1">500+</h4>
                  <p className="text-sm text-zinc-500 uppercase tracking-wide">Weddings Covered</p>
                </div>
              </div>
              <Link href="/about">
                <Button variant="outline" size="lg" className="rounded-full px-8 mt-4 border-white/20 hover:bg-white hover:text-black">
                  Learn More About Us
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials / Why Choose Us */}
      <section className="py-24 bg-black">
        <div className="container mx-auto px-4 md:px-8 text-center">
          <h2 className="text-4xl font-display font-bold text-white mb-16">Why Choose Deepam?</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { title: "Expert Team", desc: "Led by R. Venketesan with a team of skilled editors and shooters." },
              { title: "Top Equipment", desc: "We use the latest full-frame cameras and premium lenses." },
              { title: "Fast Delivery", desc: "Get your edited photos and albums delivered on time, every time." }
            ].map((item, i) => (
              <div key={i} className="p-8 border border-white/10 rounded-2xl bg-zinc-950">
                <div className="flex justify-center mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-5 h-5 text-yellow-500 fill-yellow-500" />
                  ))}
                </div>
                <h3 className="text-xl font-bold text-white mb-3">{item.title}</h3>
                <p className="text-zinc-400">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-purple-900 to-indigo-900 opacity-50" />
        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <h2 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Ready to create magic?</h2>
          <p className="text-xl text-gray-300 mb-10 max-w-2xl mx-auto">
            Book your session today and let us tell your story through our lens.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <BookingModal>
              <Button size="lg" className="bg-white text-black hover:bg-gray-100 rounded-full px-10 h-14 text-lg font-semibold">
                Book Now
              </Button>
            </BookingModal>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10 rounded-full px-10 h-14 text-lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}
