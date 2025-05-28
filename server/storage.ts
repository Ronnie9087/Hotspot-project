import { 
  users, 
  internetPlans, 
  bodaBodaBookings, 
  restaurants, 
  products, 
  jobs,
  type User, 
  type InsertUser,
  type InternetPlan,
  type InsertInternetPlan,
  type BodaBodaBooking,
  type InsertBodaBodaBooking,
  type Restaurant,
  type InsertRestaurant,
  type Product,
  type InsertProduct,
  type Job,
  type InsertJob
} from "@shared/schema";

export interface IStorage {
  // Users
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Internet Plans
  getInternetPlans(): Promise<InternetPlan[]>;
  createInternetPlan(plan: InsertInternetPlan): Promise<InternetPlan>;
  
  // BodaBoda Bookings
  getBodaBodaBookings(): Promise<BodaBodaBooking[]>;
  createBodaBodaBooking(booking: InsertBodaBodaBooking): Promise<BodaBodaBooking>;
  
  // Restaurants
  getRestaurants(): Promise<Restaurant[]>;
  getRestaurantsByCategory(category: string): Promise<Restaurant[]>;
  createRestaurant(restaurant: InsertRestaurant): Promise<Restaurant>;
  
  // Products
  getProducts(): Promise<Product[]>;
  getProductsByCategory(category: string): Promise<Product[]>;
  createProduct(product: InsertProduct): Promise<Product>;
  
  // Jobs
  getJobs(): Promise<Job[]>;
  getJobsByType(type: string): Promise<Job[]>;
  createJob(job: InsertJob): Promise<Job>;
}

export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private internetPlans: Map<number, InternetPlan>;
  private bodaBodaBookings: Map<number, BodaBodaBooking>;
  private restaurants: Map<number, Restaurant>;
  private products: Map<number, Product>;
  private jobs: Map<number, Job>;
  private currentId: number;

  constructor() {
    this.users = new Map();
    this.internetPlans = new Map();
    this.bodaBodaBookings = new Map();
    this.restaurants = new Map();
    this.products = new Map();
    this.jobs = new Map();
    this.currentId = 1;
    
    this.seedData();
  }

  private seedData() {
    // Seed Internet Plans
    const plans: InsertInternetPlan[] = [
      {
        name: "Basic Plan",
        price: "29.00",
        downloadSpeed: "25 Mbps",
        uploadSpeed: "5 Mbps",
        dataLimit: "500 GB",
        features: ["24/7 support"],
        isPopular: false,
      },
      {
        name: "Premium Plan",
        price: "59.00",
        downloadSpeed: "100 Mbps",
        uploadSpeed: "20 Mbps",
        dataLimit: "Unlimited",
        features: ["Priority support"],
        isPopular: true,
      },
      {
        name: "Enterprise Plan",
        price: "99.00",
        downloadSpeed: "500 Mbps",
        uploadSpeed: "100 Mbps",
        dataLimit: "Unlimited",
        features: ["Dedicated support"],
        isPopular: false,
      },
    ];

    plans.forEach(plan => {
      const id = this.currentId++;
      this.internetPlans.set(id, { ...plan, id });
    });

    // Seed Restaurants
    const restaurantData: InsertRestaurant[] = [
      {
        name: "Mama's Kitchen",
        description: "Traditional local dishes",
        rating: "4.8",
        category: "Local Cuisine",
        imageUrl: "https://images.unsplash.com/photo-1556909114-f6e7ad7d3136?w=400&h=200&fit=crop",
      },
      {
        name: "Tony's Pizza",
        description: "Authentic Italian pizza",
        rating: "4.2",
        category: "Pizza",
        imageUrl: "https://images.unsplash.com/photo-1513104890138-7c749659a591?w=400&h=200&fit=crop",
      },
    ];

    restaurantData.forEach(restaurant => {
      const id = this.currentId++;
      this.restaurants.set(id, { ...restaurant, id });
    });

    // Seed Products
    const productData: InsertProduct[] = [
      {
        name: "Fresh Vegetables Bundle",
        price: "12.99",
        store: "Green Valley Market",
        category: "Groceries",
        imageUrl: "https://images.unsplash.com/photo-1540420773420-3366772f4999?w=300&h=200&fit=crop",
      },
      {
        name: "Smartphone",
        price: "299.99",
        store: "Tech Zone",
        category: "Electronics",
        imageUrl: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=300&h=200&fit=crop",
      },
      {
        name: "Handmade Crafts",
        price: "24.99",
        store: "Artisan Corner",
        category: "Home",
        imageUrl: "https://images.unsplash.com/photo-1556228453-efd6c1ff04f6?w=300&h=200&fit=crop",
      },
    ];

    productData.forEach(product => {
      const id = this.currentId++;
      this.products.set(id, { ...product, id });
    });

    // Seed Jobs
    const jobData: InsertJob[] = [
      {
        title: "Marketing Assistant",
        company: "Digital Agency Co.",
        location: "Downtown",
        type: "Full-time",
        salary: "$45,000/year",
        description: "Join our dynamic marketing team to help create engaging campaigns for local businesses. Experience with social media and content creation preferred.",
      },
      {
        title: "Restaurant Server",
        company: "Mama's Kitchen",
        location: "City Center",
        type: "Part-time",
        salary: "$15/hour + tips",
        description: "Friendly and energetic server needed for busy local restaurant. Flexible hours, great team environment, and excellent tip potential.",
      },
      {
        title: "Delivery Driver",
        company: "QuickDelivery Service",
        location: "Various Locations",
        type: "Flexible",
        salary: "$18/hour",
        description: "Own vehicle required. Flexible schedule, competitive pay, and fuel allowance. Perfect for students or anyone looking for flexible work.",
      },
    ];

    jobData.forEach(job => {
      const id = this.currentId++;
      this.jobs.set(id, { ...job, id });
    });
  }

  // User methods
  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  // Internet Plan methods
  async getInternetPlans(): Promise<InternetPlan[]> {
    return Array.from(this.internetPlans.values());
  }

  async createInternetPlan(insertPlan: InsertInternetPlan): Promise<InternetPlan> {
    const id = this.currentId++;
    const plan: InternetPlan = { ...insertPlan, id };
    this.internetPlans.set(id, plan);
    return plan;
  }

  // BodaBoda Booking methods
  async getBodaBodaBookings(): Promise<BodaBodaBooking[]> {
    return Array.from(this.bodaBodaBookings.values());
  }

  async createBodaBodaBooking(insertBooking: InsertBodaBodaBooking): Promise<BodaBodaBooking> {
    const id = this.currentId++;
    const booking: BodaBodaBooking = { 
      ...insertBooking, 
      id,
      createdAt: new Date()
    };
    this.bodaBodaBookings.set(id, booking);
    return booking;
  }

  // Restaurant methods
  async getRestaurants(): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values());
  }

  async getRestaurantsByCategory(category: string): Promise<Restaurant[]> {
    return Array.from(this.restaurants.values()).filter(r => r.category === category);
  }

  async createRestaurant(insertRestaurant: InsertRestaurant): Promise<Restaurant> {
    const id = this.currentId++;
    const restaurant: Restaurant = { ...insertRestaurant, id };
    this.restaurants.set(id, restaurant);
    return restaurant;
  }

  // Product methods
  async getProducts(): Promise<Product[]> {
    return Array.from(this.products.values());
  }

  async getProductsByCategory(category: string): Promise<Product[]> {
    return Array.from(this.products.values()).filter(p => p.category === category);
  }

  async createProduct(insertProduct: InsertProduct): Promise<Product> {
    const id = this.currentId++;
    const product: Product = { ...insertProduct, id };
    this.products.set(id, product);
    return product;
  }

  // Job methods
  async getJobs(): Promise<Job[]> {
    return Array.from(this.jobs.values());
  }

  async getJobsByType(type: string): Promise<Job[]> {
    return Array.from(this.jobs.values()).filter(j => j.type === type);
  }

  async createJob(insertJob: InsertJob): Promise<Job> {
    const id = this.currentId++;
    const job: Job = { ...insertJob, id };
    this.jobs.set(id, job);
    return job;
  }
}

export const storage = new MemStorage();
