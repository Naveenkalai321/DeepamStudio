import { z } from "zod";

// Package schema
export const packageSchema = z.object({
  id: z.string(),
  name: z.string(),
  slug: z.string(),
  price: z.string(),
  description: z.string(),
  category: z.string(), // 'studio', 'wedding', 'outdoor', 'service'
  features: z.array(z.string()).default([]),
  imageUrl: z.string(),
});

export const insertPackageSchema = packageSchema.omit({ id: true });

// Booking schema
export const bookingSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string(),
  packageId: z.string().optional(),
  packageName: z.string().optional(),
  date: z.string().optional(),
  location: z.string().optional(),
  message: z.string().optional(),
  status: z.string().default("pending"), // pending, confirmed, completed, cancelled
  createdAt: z.number(),
});

export const insertBookingSchema = bookingSchema.omit({ id: true, status: true, createdAt: true });

// Contact schema
export const contactSchema = z.object({
  id: z.string(),
  name: z.string(),
  email: z.string().email(),
  phone: z.string().optional(),
  message: z.string(),
  createdAt: z.number(),
});

export const insertContactSchema = contactSchema.omit({ id: true, createdAt: true });

// Types
export type Package = z.infer<typeof packageSchema>;
export type InsertPackage = z.infer<typeof insertPackageSchema>;
export type Booking = z.infer<typeof bookingSchema>;
export type InsertBooking = z.infer<typeof insertBookingSchema>;
export type Contact = z.infer<typeof contactSchema>;
export type InsertContact = z.infer<typeof insertContactSchema>;
