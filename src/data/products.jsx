export const products = [
  {
    id: 1,
    name: "Classic Cotton T-Shirt",
    category: "clothes",
    price: 29.99,
    image: "https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?w=400&h=400&fit=crop",
    description: "Comfortable and versatile cotton t-shirt perfect for everyday wear.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Black", "White", "Navy", "Gray"],
    inStock: true,
    rating: 4.5,
    reviews: 128
  },
  {
    id: 2,
    name: "Running Sneakers",
    category: "shoes",
    price: 89.99,
    image: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400&h=400&fit=crop",
    description: "Lightweight running shoes with excellent cushioning and support.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["White", "Black", "Blue", "Red"],
    inStock: true,
    rating: 4.7,
    reviews: 94
  },
  {
    id: 3,
    name: "Leather Crossbody Bag",
    category: "bags",
    price: 149.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    description: "Elegant genuine leather crossbody bag with adjustable strap.",
    sizes: ["One Size"],
    colors: ["Brown", "Black", "Tan"],
    inStock: true,
    rating: 4.8,
    reviews: 67
  },
  {
    id: 4,
    name: "Denim Jeans",
    category: "clothes",
    price: 79.99,
    image: "https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&h=400&fit=crop",
    description: "Classic fit denim jeans made from premium cotton blend.",
    sizes: ["28", "30", "32", "34", "36", "38"],
    colors: ["Blue", "Black", "Light Blue"],
    inStock: true,
    rating: 4.4,
    reviews: 156
  },
  {
    id: 5,
    name: "Wireless Headphones",
    category: "electronics",
    price: 199.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    description: "Premium wireless headphones with noise cancellation.",
    sizes: ["One Size"],
    colors: ["Black", "White", "Silver"],
    inStock: true,
    rating: 4.6,
    reviews: 203
  },
  {
    id: 6,
    name: "Canvas Backpack",
    category: "bags",
    price: 59.99,
    image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
    description: "Durable canvas backpack perfect for work or travel.",
    sizes: ["One Size"],
    colors: ["Khaki", "Navy", "Black"],
    inStock: true,
    rating: 4.3,
    reviews: 89
  },
  {
    id: 7,
    name: "Formal Oxford Shoes",
    category: "shoes",
    price: 159.99,
    image: "https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=400&h=400&fit=crop",
    description: "Elegant leather oxford shoes for formal occasions.",
    sizes: ["7", "8", "9", "10", "11", "12"],
    colors: ["Black", "Brown"],
    inStock: true,
    rating: 4.5,
    reviews: 78
  },
  {
    id: 8,
    name: "Summer Dress",
    category: "clothes",
    price: 69.99,
    image: "https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&h=400&fit=crop",
    description: "Light and breezy summer dress perfect for warm weather.",
    sizes: ["XS", "S", "M", "L", "XL"],
    colors: ["Floral", "Solid Blue", "White"],
    inStock: true,
    rating: 4.6,
    reviews: 112
  }
];

export const categories = [
  { id: "all", name: "All Products", count: products.length },
  { id: "clothes", name: "Clothing", count: products.filter(p => p.category === "clothes").length },
  { id: "shoes", name: "Shoes", count: products.filter(p => p.category === "shoes").length },
  { id: "bags", name: "Bags", count: products.filter(p => p.category === "bags").length },
  { id: "electronics", name: "Electronics", count: products.filter(p => p.category === "electronics").length }
];