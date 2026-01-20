import type { Express } from "express";
import type { Server } from "http";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Packages
  app.get(api.packages.list.path, async (req, res) => {
    const packages = await storage.getPackages();
    res.json(packages);
  });

  app.get(api.packages.get.path, async (req, res) => {
    const pkg = await storage.getPackageBySlug(req.params.slug);
    if (!pkg) {
      return res.status(404).json({ message: "Package not found" });
    }
    res.json(pkg);
  });

  // Bookings
  app.post(api.bookings.create.path, async (req, res) => {
    try {
      const input = api.bookings.create.input.parse(req.body);
      const booking = await storage.createBooking(input);
      
      // In a real app, we would send email/SMS here
      console.log(`New booking received: ${booking.email}, ${booking.phone} for ${booking.packageName}`);
      
      res.status(201).json(booking);
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  // Contacts
  app.post(api.contacts.create.path, async (req, res) => {
    try {
      const input = api.contacts.create.input.parse(req.body);
      await storage.createContact(input);
      res.status(201).json({ success: true });
    } catch (err) {
      if (err instanceof z.ZodError) {
        return res.status(400).json({
          message: err.errors[0].message,
          field: err.errors[0].path.join('.'),
        });
      }
      throw err;
    }
  });

  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  const existingPackages = await storage.getPackages();
  if (existingPackages.length === 0) {
    const packages = [
      {
        name: "Passport Photo",
        slug: "passport-photo",
        price: "₹200",
        description: "Quick high-quality passport size photos. Instant print available.",
        category: "studio",
        features: ["8 Copies", "Soft Copy Included", "Premium Glossy Paper", "Instant Delivery"],
        imageUrl: "https://images.unsplash.com/photo-1635860715367-33a5d8986884?q=80&w=1000&auto=format&fit=crop"
      },
      {
        name: "Wedding Photography",
        slug: "wedding-photography",
        price: "Starts at ₹25,000",
        description: "Complete wedding coverage including candid shots, traditional photography, and videography.",
        category: "wedding",
        features: ["Candid Photography", "Cinematic Video", "Drone Coverage", "Premium Album", "Full Event Coverage"],
        imageUrl: "https://images.unsplash.com/photo-1519741497674-611481863552?q=80&w=1000&auto=format&fit=crop"
      },
      {
        name: "Portrait Session",
        slug: "portrait-session",
        price: "Starts at ₹1,500",
        description: "Professional studio or outdoor portrait session for individuals and families.",
        category: "studio",
        features: ["1 Hour Session", "10 Retouched Photos", "Multiple Outfits", "High-Res Digital Files"],
        imageUrl: "https://images.unsplash.com/photo-1531746020798-e6953c6e8e04?q=80&w=1000&auto=format&fit=crop"
      },
      {
        name: "Event Coverage",
        slug: "event-coverage",
        price: "Custom Quote",
        description: "Photography and videography for birthdays, corporate events, and parties.",
        category: "events",
        features: ["Unlimited Photos", "Highlight Video", "Fast Turnaround", "Online Gallery"],
        imageUrl: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?q=80&w=1000&auto=format&fit=crop"
      },
      {
        name: "Product Photography",
        slug: "product-photography",
        price: "₹500 per item",
        description: "Clean, professional product shots for e-commerce and catalogs.",
        category: "commercial",
        features: ["White Background", "Lifestyle Shots", "Editing Included", "Bulk Discounts"],
        imageUrl: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1000&auto=format&fit=crop"
      },
      {
        name: "Printing Services",
        slug: "printing-services",
        price: "Varies",
        description: "High-quality photo prints, framing, xerox, and lamination services.",
        category: "services",
        features: ["Photo Printing", "Xerox/Photocopy", "Lamination", "Document Scanning", "Photo Frames"],
        imageUrl: "https://images.unsplash.com/photo-1562564055-71e051d33c19?q=80&w=1000&auto=format&fit=crop"
      }
    ];

    for (const pkg of packages) {
      await storage.createPackage(pkg);
    }
  }
}
