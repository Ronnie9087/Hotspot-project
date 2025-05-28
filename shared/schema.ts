import { pgTable, text, serial, integer, boolean, decimal, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const internetPlans = pgTable("internet_plans", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  downloadSpeed: text("download_speed").notNull(),
  uploadSpeed: text("upload_speed").notNull(),
  dataLimit: text("data_limit").notNull(),
  features: text("features").array().notNull(),
  isPopular: boolean("is_popular").default(false),
});

export const bodaBodaBookings = pgTable("boda_boda_bookings", {
  id: serial("id").primaryKey(),
  pickupLocation: text("pickup_location").notNull(),
  destination: text("destination").notNull(),
  estimatedFare: decimal("estimated_fare", { precision: 10, scale: 2 }).notNull(),
  estimatedTime: text("estimated_time").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const restaurants = pgTable("restaurants", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description").notNull(),
  rating: decimal("rating", { precision: 3, scale: 2 }).notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
});

export const products = pgTable("products", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  price: decimal("price", { precision: 10, scale: 2 }).notNull(),
  store: text("store").notNull(),
  category: text("category").notNull(),
  imageUrl: text("image_url"),
});

export const jobs = pgTable("jobs", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  company: text("company").notNull(),
  location: text("location").notNull(),
  type: text("type").notNull(),
  salary: text("salary").notNull(),
  description: text("description").notNull(),
});

// Insert schemas
export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertInternetPlanSchema = createInsertSchema(internetPlans).omit({
  id: true,
});

export const insertBodaBodaBookingSchema = createInsertSchema(bodaBodaBookings).omit({
  id: true,
  createdAt: true,
});

export const insertRestaurantSchema = createInsertSchema(restaurants).omit({
  id: true,
});

export const insertProductSchema = createInsertSchema(products).omit({
  id: true,
});

export const insertJobSchema = createInsertSchema(jobs).omit({
  id: true,
});

// Types
export type User = typeof users.$inferSelect;
export type InsertUser = z.infer<typeof insertUserSchema>;

export type InternetPlan = typeof internetPlans.$inferSelect;
export type InsertInternetPlan = z.infer<typeof insertInternetPlanSchema>;

export type BodaBodaBooking = typeof bodaBodaBookings.$inferSelect;
export type InsertBodaBodaBooking = z.infer<typeof insertBodaBodaBookingSchema>;

export type Restaurant = typeof restaurants.$inferSelect;
export type InsertRestaurant = z.infer<typeof insertRestaurantSchema>;

export type Product = typeof products.$inferSelect;
export type InsertProduct = z.infer<typeof insertProductSchema>;

export type Job = typeof jobs.$inferSelect;
export type InsertJob = z.infer<typeof insertJobSchema>;
