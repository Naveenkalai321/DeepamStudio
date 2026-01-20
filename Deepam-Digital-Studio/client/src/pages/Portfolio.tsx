import { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { X } from "lucide-react";

// Placeholder data - in a real app this would come from an API
const portfolioItems = [
  { id: 1, category: "Wedding", url: "https://images.unsplash.com/photo-1511285560982-1351cdeb9821?auto=format&fit=crop&q=80&w=800" },
  { id: 2, category: "Portrait", url: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?auto=format&fit=crop&q=80&w=800" },
  { id: 3, category: "Outdoor", url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&q=80&w=800" },
  { id: 4, category: "Wedding", url: "https://images.unsplash.com/photo-1519225421980-715cb0202128?auto=format&fit=crop&q=80&w=800" },
  { id: 5, category: "Events", url: "https://images.unsplash.com/photo-1511578314322-379afb476865?auto=format&fit=crop&q=80&w=800" },
  { id: 6, category: "Studio", url: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=800" },
  { id: 7, category: "Portrait", url: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&q=80&w=800" },
  { id: 8, category: "Wedding", url: "https://images.unsplash.com/photo-1606800052052-a08af7148866?auto=format&fit=crop&q=80&w=800" },
];

const categories = ["All", "Wedding", "Portrait", "Outdoor", "Events", "Studio"];

export default function Portfolio() {
  const [filter, setFilter] = useState("All");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);

  const filteredItems = filter === "All" 
    ? portfolioItems 
    : portfolioItems.filter(item => item.category === filter);

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 md:px-8 text-center bg-zinc-900">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Our Portfolio</h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          A glimpse into the moments we've captured. Every picture tells a story.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-12">
        {/* Filter Buttons */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-6 py-2 rounded-full text-sm font-medium transition-all ${
                filter === cat 
                  ? "bg-primary text-white shadow-lg shadow-primary/25" 
                  : "bg-zinc-900 text-zinc-400 hover:bg-zinc-800"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <motion.div layout className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
          <AnimatePresence>
            {filteredItems.map((item) => (
              <motion.div
                key={item.id}
                layout
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.3 }}
                className="relative aspect-square rounded-xl overflow-hidden cursor-pointer group bg-zinc-900"
                onClick={() => setSelectedImage(item.url)}
              >
                <img 
                  src={item.url} 
                  alt={item.category} 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" 
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <span className="text-white font-medium bg-black/50 px-4 py-2 rounded-full backdrop-blur-sm">View</span>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* Lightbox */}
      {selectedImage && (
        <div 
          className="fixed inset-0 z-[100] bg-black/95 flex items-center justify-center p-4 backdrop-blur-md"
          onClick={() => setSelectedImage(null)}
        >
          <button 
            className="absolute top-8 right-8 text-white hover:text-primary transition-colors bg-white/10 p-2 rounded-full"
            onClick={() => setSelectedImage(null)}
          >
            <X className="w-8 h-8" />
          </button>
          <img 
            src={selectedImage} 
            alt="Full size" 
            className="max-w-full max-h-[90vh] rounded-lg shadow-2xl" 
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <Footer />
    </div>
  );
}
