import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { insertContactSchema, type InsertContact } from "@shared/schema";
import { useContactForm } from "@/hooks/use-studio";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { MapPin, Phone, Mail, Loader2 } from "lucide-react";

export default function Contact() {
  const { mutate, isPending } = useContactForm();

  const form = useForm<InsertContact>({
    resolver: zodResolver(insertContactSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      message: "",
    },
  });

  function onSubmit(data: InsertContact) {
    mutate(data, {
      onSuccess: () => form.reset(),
    });
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-12 px-4 md:px-8 bg-zinc-900 text-center">
        <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Get in Touch</h1>
        <p className="text-xl text-zinc-400 max-w-2xl mx-auto">
          Have a question? Ready to book? We'd love to hear from you.
        </p>
      </div>

      <div className="container mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          {/* Contact Info */}
          <div className="space-y-10">
            <div>
              <h2 className="text-2xl font-display font-bold text-white mb-6">Contact Information</h2>
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary mt-1">
                    <MapPin className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Visit Us</h3>
                    <p className="text-zinc-400 leading-relaxed">
                      Deepam Digital Studio<br />
                      Near Vadaponparrapi Bus Stop<br />
                      Kallakurachi, Sankarapuram Taluk<br />
                      PIN 605702
                    </p>
                  </div>
                </div>
                
                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary mt-1">
                    <Phone className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Call Us</h3>
                    <p className="text-zinc-400">
                      <a href="tel:9843028321" className="hover:text-primary transition-colors">9843028321</a>
                    </p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="bg-primary/10 p-3 rounded-lg text-primary mt-1">
                    <Mail className="w-6 h-6" />
                  </div>
                  <div>
                    <h3 className="font-bold text-white mb-1">Email Us</h3>
                    <p className="text-zinc-400">
                      <a href="mailto:monishvenkat@gmail.com" className="hover:text-primary transition-colors">monishvenkat@gmail.com</a>
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map Placeholder */}
            <div className="bg-zinc-900 rounded-2xl h-64 w-full flex items-center justify-center border border-white/10 text-zinc-500 overflow-hidden relative">
              <iframe 
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3905.656565656565!2d78.96!3d11.96!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTHCsDU3JzM2LjAiTiA3OMKwNTcnMzYuMCJF!5e0!3m2!1sen!2sin!4v1620000000000!5m2!1sen!2sin" 
                width="100%" 
                height="100%" 
                style={{ border: 0, filter: 'grayscale(1) invert(1)' }} 
                allowFullScreen 
                loading="lazy" 
                referrerPolicy="no-referrer-when-downgrade"
              ></iframe>
            </div>
          </div>

          {/* Contact Form */}
          <div className="bg-zinc-950 p-8 rounded-3xl border border-white/10 shadow-2xl">
            <h2 className="text-2xl font-display font-bold text-white mb-6">Send a Message</h2>
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-400">Your Name</FormLabel>
                      <FormControl>
                        <Input placeholder="John Doe" {...field} className="bg-zinc-900 border-zinc-800 focus:ring-primary h-12" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <FormField
                    control={form.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400">Email Address</FormLabel>
                        <FormControl>
                          <Input placeholder="john@example.com" {...field} className="bg-zinc-900 border-zinc-800 focus:ring-primary h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="phone"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="text-zinc-400">Phone Number</FormLabel>
                        <FormControl>
                          <Input placeholder="9876543210" {...field} className="bg-zinc-900 border-zinc-800 focus:ring-primary h-12" />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <FormField
                  control={form.control}
                  name="message"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel className="text-zinc-400">Your Message</FormLabel>
                      <FormControl>
                        <Textarea placeholder="How can we help you?" {...field} className="bg-zinc-900 border-zinc-800 focus:ring-primary min-h-[150px] resize-none" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <Button type="submit" size="lg" className="w-full bg-gradient-primary h-14 text-lg font-semibold" disabled={isPending}>
                  {isPending && <Loader2 className="w-5 h-5 mr-2 animate-spin" />}
                  {isPending ? "Sending..." : "Send Message"}
                </Button>
              </form>
            </Form>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}
