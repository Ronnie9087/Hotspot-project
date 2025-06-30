import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertBodaBodaBookingSchema } from "@shared/schema";
import { getInternetPlans } from "./plans";  // Import standalone plans function

export async function registerRoutes(app: Express): Promise<Server> {
  
  // Internet Plans - using standalone function instead of storage
  app.get("/api/internet-plans", async (req, res) => {
    try {
      const plans = await getInternetPlans();  // call your standalone function
      res.json(plans);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch internet plans" });
    }
  });

  // BodaBoda Bookings
  app.get("/api/boda-bookings", async (req, res) => {
    try {
      const bookings = await storage.getBodaBodaBookings();
      res.json(bookings);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch bookings" });
    }
  });

  app.post("/api/boda-bookings", async (req, res) => {
    try {
      const validatedData = insertBodaBodaBookingSchema.parse(req.body);
      const booking = await storage.createBodaBodaBooking(validatedData);
      res.status(201).json(booking);
    } catch (error) {
      res.status(400).json({ message: "Invalid booking data" });
    }
  });

  // Restaurants
  app.get("/api/restaurants", async (req, res) => {
    try {
      const { category } = req.query;
      let restaurants;

      if (category && category !== "All") {
        restaurants = await storage.getRestaurantsByCategory(category as string);
      } else {
        restaurants = await storage.getRestaurants();
      }

      res.json(restaurants);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch restaurants" });
    }
  });

  // Products
  app.get("/api/products", async (req, res) => {
    try {
      const { category } = req.query;
      let products;

      if (category && category !== "All Products") {
        products = await storage.getProductsByCategory(category as string);
      } else {
        products = await storage.getProducts();
      }

      res.json(products);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch products" });
    }
  });

  // Jobs
  app.get("/api/jobs", async (req, res) => {
    try {
      const { type } = req.query;
      let jobs;

      if (type && type !== "All Jobs") {
        jobs = await storage.getJobsByType(type as string);
      } else {
        jobs = await storage.getJobs();
      }

      res.json(jobs);
    } catch (error) {
      res.status(500).json({ message: "Failed to fetch jobs" });
    }
  });

  // Create and return the HTTP server wrapping the Express app
  const httpServer = createServer(app);
  return httpServer;
}
