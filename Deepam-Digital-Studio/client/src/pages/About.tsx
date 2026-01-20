import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { Camera, Heart, Award, Users } from "lucide-react";

export default function About() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <div className="pt-32 pb-16 px-4 md:px-8 bg-zinc-900 text-center">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">About Deepam</h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          The story behind the lens. Passion, precision, and a love for memories.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        {/* Owner Section */}
        <div className="flex flex-col lg:flex-row items-center gap-16 mb-24">
          <div className="lg:w-1/2">
            <img 
              // Older photographer holding camera
              src="Founder.jpeg" 
              alt="R. Venketesan" 
              className="rounded-3xl shadow-2xl w-full grayscale hover:grayscale-0 transition-all duration-500"
            />
          </div>
          <div className="lg:w-1/2 space-y-6">
            <h2 className="text-3xl font-display font-bold text-white">Meet the Founder</h2>
            <h3 className="text-2xl font-semibold text-primary">R. Venketesan</h3>
            <p className="text-zinc-400 leading-relaxed text-lg">
              With a passion that began over a decade ago, R. Venketesan established Deepam Digital Studio in Kallakurachi with a simple mission: to make professional photography accessible to everyone.
            </p>
            <p className="text-zinc-400 leading-relaxed text-lg">
              His eye for detail and commitment to quality has earned the studio a reputation for excellence in wedding photography, portraits, and event coverage across the region.
            </p>
            <div className="grid grid-cols-2 gap-4 mt-8">
              <div className="p-6 bg-zinc-900 rounded-xl border border-white/5">
                <Camera className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-white">Advanced Gear</h4>
                <p className="text-sm text-zinc-500">Using latest Sony & Canon systems</p>
              </div>
              <div className="p-6 bg-zinc-900 rounded-xl border border-white/5">
                <Heart className="w-8 h-8 text-primary mb-3" />
                <h4 className="font-bold text-white">Passionate Team</h4>
                <p className="text-sm text-zinc-500">Dedicated to your happiness</p>
              </div>
            </div>
          </div>
        </div>

        {/* Facilities */}
        <div className="mb-24">
          <h2 className="text-3xl font-display font-bold text-white text-center mb-12">Our Facilities</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="glass-card p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Camera className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Modern Studio</h3>
              <p className="text-zinc-400">Fully equipped indoor studio with professional lighting setups for portraits and product shoots.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Users className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Editing Suite</h3>
              <p className="text-zinc-400">High-end workstations for photo retouching, video editing, and album design.</p>
            </div>
            <div className="glass-card p-8 rounded-2xl text-center">
              <div className="w-16 h-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-6">
                <Award className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-xl font-bold text-white mb-3">Printing Lab</h3>
              <p className="text-zinc-400">In-house printing for instant passport photos, high-quality prints, and lamination.</p>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
