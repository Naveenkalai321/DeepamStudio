import { db } from "./db";
import {
  type Package,
  type InsertPackage,
  type Booking,
  type InsertBooking,
  type InsertContact,
  packageSchema,
  bookingSchema,
  contactSchema
} from "@shared/schema";

export interface IStorage {
  // Packages
  getPackages(): Promise<Package[]>;
  getPackageBySlug(slug: string): Promise<Package | undefined>;
  createPackage(pkg: InsertPackage): Promise<Package>;
  
  // Bookings
  createBooking(booking: InsertBooking): Promise<Booking>;
  
  // Contacts
  createContact(contact: InsertContact): Promise<void>;
}

export class DatabaseStorage implements IStorage {
  async getPackages(): Promise<Package[]> {
    const snapshot = await db.collection("packages").get();
    return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    } as Package));
  }

  async getPackageBySlug(slug: string): Promise<Package | undefined> {
    const snapshot = await db.collection("packages").where("slug", "==", slug).get();
    
    if (snapshot.empty) return undefined;
    
    const doc = snapshot.docs[0];
    return {
      id: doc.id,
      ...doc.data()
    } as Package;
  }

  async createPackage(pkg: InsertPackage): Promise<Package> {
    const docRef = await db.collection("packages").add(pkg);
    return {
      id: docRef.id,
      ...pkg
    } as Package;
  }

  async createBooking(booking: InsertBooking): Promise<Booking> {
    const docRef = await db.collection("bookings").add({
      ...booking,
      status: "pending",
      createdAt: Date.now()
    });
    return {
      id: docRef.id,
      ...booking,
      status: "pending",
      createdAt: Date.now()
    } as Booking;
  }

  async createContact(contact: InsertContact): Promise<void> {
    await db.collection("contacts").add({
      ...contact,
      createdAt: Date.now()
    });
  }
}

export const storage = new DatabaseStorage();
