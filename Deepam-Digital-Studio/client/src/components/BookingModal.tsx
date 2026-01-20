import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogTrigger } from "@/components/ui/dialog";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { insertBookingSchema, type InsertBooking } from "@shared/schema";
import { useCreateBooking, usePackages } from "@/hooks/use-studio";
import { Loader2, Calendar } from "lucide-react";

interface BookingModalProps {
  children?: React.ReactNode;
  preselectedPackage?: string; // package slug or name
}

export function BookingModal({ children, preselectedPackage }: BookingModalProps) {
  const [open, setOpen] = useState(false);
  const { mutate, isPending } = useCreateBooking();
  const { data: packages } = usePackages();

  const form = useForm<InsertBooking>({
    resolver: zodResolver(insertBookingSchema),
    defaultValues: {
      name: "",
      email: "",
      phone: "",
      packageName: preselectedPackage || "",
      date: "",
      location: "",
      message: "",
    },
  });

  function onSubmit(data: InsertBooking) {
    // Find package ID if possible
    const selectedPkg = packages?.find(p => p.name === data.packageName);
    if (selectedPkg) {
      data.packageId = selectedPkg.id;
    }

    mutate(data, {
      onSuccess: () => {
        setOpen(false);
        form.reset();
      },
    });
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children || <Button size="lg" className="bg-gradient-primary rounded-full px-8 shadow-lg shadow-primary/25 hover:shadow-primary/40 transition-all">Book Now</Button>}
      </DialogTrigger>
      <DialogContent className="sm:max-w-[500px] bg-zinc-950 border-white/10 text-white">
        <DialogHeader>
          <DialogTitle className="font-display text-2xl">Book Your Session</DialogTitle>
          <DialogDescription className="text-zinc-400">
            Fill out the form below and we'll confirm your appointment shortly.
          </DialogDescription>
        </DialogHeader>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 mt-4">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Name</FormLabel>
                    <FormControl>
                      <Input placeholder="John Doe" {...field} className="bg-zinc-900 border-zinc-800 focus:ring-primary" />
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
                    <FormLabel>Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="9876543210" {...field} className="bg-zinc-900 border-zinc-800 focus:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Email</FormLabel>
                  <FormControl>
                    <Input type="email" placeholder="john@example.com" {...field} className="bg-zinc-900 border-zinc-800 focus:ring-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="packageName"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Service/Package</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger className="bg-zinc-900 border-zinc-800 focus:ring-primary">
                          <SelectValue placeholder="Select Service" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="bg-zinc-900 border-zinc-800 text-white">
                        {packages?.map((pkg) => (
                          <SelectItem key={pkg.id} value={pkg.name}>{pkg.name}</SelectItem>
                        )) || <SelectItem value="loading" disabled>Loading...</SelectItem>}
                        <SelectItem value="Other">Other Inquiry</SelectItem>
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="date"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Preferred Date</FormLabel>
                    <FormControl>
                      <div className="relative">
                        <Input type="date" {...field} className="bg-zinc-900 border-zinc-800 focus:ring-primary pl-9" />
                        <Calendar className="w-4 h-4 absolute left-3 top-3 text-zinc-500 pointer-events-none" />
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="location"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Location (Optional)</FormLabel>
                  <FormControl>
                    <Input placeholder="E.g. Wedding Hall, Beach, Studio" {...field} className="bg-zinc-900 border-zinc-800 focus:ring-primary" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="message"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Additional Notes</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Tell us more about your requirements..." {...field} className="bg-zinc-900 border-zinc-800 focus:ring-primary min-h-[80px]" />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <Button type="submit" className="w-full bg-gradient-primary font-semibold" disabled={isPending}>
              {isPending && <Loader2 className="w-4 h-4 mr-2 animate-spin" />}
              {isPending ? "Submitting..." : "Confirm Booking"}
            </Button>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
}
