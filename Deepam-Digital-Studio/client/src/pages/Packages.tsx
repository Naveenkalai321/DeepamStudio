import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { BookingModal } from "@/components/BookingModal";
import { Button } from "@/components/ui/button";
import { Check, Camera, Film, Users, Sun } from "lucide-react";
import { usePackages } from "@/hooks/use-studio";
import { Loader2 } from "lucide-react";

export default function Packages() {
  const { data: packages, isLoading } = usePackages();

  const categories = [
    { id: 'wedding', label: 'Wedding', icon: Users },
    { id: 'studio', label: 'Studio', icon: Camera },
    { id: 'outdoor', label: 'Outdoor', icon: Sun },
    { id: 'service', label: 'Services', icon: Film },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      {/* Header */}
      <div className="pt-32 pb-16 bg-zinc-900 px-4 md:px-8 text-center">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Our Packages</h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Transparent pricing for professional photography services. Choose the package that fits your needs.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        {isLoading ? (
          <div className="flex justify-center py-20">
            <Loader2 className="w-10 h-10 animate-spin text-primary" />
          </div>
        ) : (
          <div className="space-y-20">
            {categories.map((cat) => {
              const categoryPackages = packages?.filter(p => p.category === cat.id);
              if (!categoryPackages?.length) return null;

              return (
                <div key={cat.id}>
                  <div className="flex items-center gap-4 mb-8">
                    <div className="p-3 rounded-xl bg-primary/10 text-primary">
                      <cat.icon className="w-6 h-6" />
                    </div>
                    <h2 className="text-3xl font-display font-bold text-white">{cat.label} Packages</h2>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                    {categoryPackages.map((pkg) => (
                      <div key={pkg.id} className="group relative bg-zinc-950 border border-white/10 rounded-2xl overflow-hidden hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10 flex flex-col">
                        <div className="h-48 overflow-hidden relative">
                          <img src={pkg.imageUrl} alt={pkg.name} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                          <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent" />
                          <div className="absolute bottom-4 left-4">
                            <span className="bg-primary px-3 py-1 rounded-full text-xs font-bold text-white uppercase tracking-wider">
                              {pkg.category}
                            </span>
                          </div>
                        </div>
                        
                        <div className="p-6 flex-1 flex flex-col">
                          <h3 className="text-2xl font-bold text-white mb-2">{pkg.name}</h3>
                          <div className="text-2xl font-display font-bold text-gradient mb-4">{pkg.price}</div>
                          <p className="text-zinc-400 text-sm mb-6 line-clamp-2">{pkg.description}</p>
                          
                          <div className="space-y-3 mb-8 flex-1">
                            {pkg.features?.map((feature, idx) => (
                              <div key={idx} className="flex items-start gap-3 text-sm text-zinc-300">
                                <Check className="w-4 h-4 text-green-500 mt-0.5 shrink-0" />
                                <span>{feature}</span>
                              </div>
                            ))}
                          </div>

                          <BookingModal preselectedPackage={pkg.name}>
                            <Button className="w-full bg-white text-black hover:bg-zinc-200 font-semibold rounded-xl py-6">
                              Choose {pkg.name}
                            </Button>
                          </BookingModal>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>

      <Footer />
    </div>
  );
}
