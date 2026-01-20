import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { api, buildUrl } from "@shared/routes";
import { useToast } from "@/hooks/use-toast";
import type { InsertBooking, InsertContact } from "@shared/schema";

// Get all packages
export function usePackages() {
  return useQuery({
    queryKey: [api.packages.list.path],
    queryFn: async () => {
      const res = await fetch(api.packages.list.path, { credentials: "include" });
      if (!res.ok) throw new Error("Failed to fetch packages");
      return api.packages.list.responses[200].parse(await res.json());
    },
  });
}

// Get single package by slug
export function usePackage(slug: string) {
  return useQuery({
    queryKey: [api.packages.get.path, slug],
    queryFn: async () => {
      const url = buildUrl(api.packages.get.path, { slug });
      const res = await fetch(url, { credentials: "include" });
      if (res.status === 404) return null;
      if (!res.ok) throw new Error("Failed to fetch package details");
      return api.packages.get.responses[200].parse(await res.json());
    },
    enabled: !!slug,
  });
}

// Create a booking
export function useCreateBooking() {
  const { toast } = useToast();
  
  return useMutation({
    mutationFn: async (data: InsertBooking) => {
      const res = await fetch(api.bookings.create.path, {
        method: api.bookings.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });
      
      if (!res.ok) {
        if (res.status === 400) {
          const error = await res.json();
          throw new Error(error.message || "Validation failed");
        }
        throw new Error("Failed to create booking");
      }
      return api.bookings.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Booking Request Sent!",
        description: "We'll contact you shortly to confirm details.",
        variant: "default",
        className: "bg-green-600 text-white border-none",
      });
    },
    onError: (error) => {
      toast({
        title: "Booking Failed",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}

// Send contact message
export function useContactForm() {
  const { toast } = useToast();

  return useMutation({
    mutationFn: async (data: InsertContact) => {
      const res = await fetch(api.contacts.create.path, {
        method: api.contacts.create.method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
        credentials: "include",
      });

      if (!res.ok) {
        throw new Error("Failed to send message");
      }
      return api.contacts.create.responses[201].parse(await res.json());
    },
    onSuccess: () => {
      toast({
        title: "Message Sent",
        description: "Thank you for contacting us.",
        variant: "default",
      });
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: error.message,
        variant: "destructive",
      });
    },
  });
}
