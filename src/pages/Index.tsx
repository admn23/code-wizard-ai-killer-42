import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Navbar2 } from "@/components/ui/navbar-2";
import SEO from "@/components/SEO";
import TypingAnimation from "@/components/TypingAnimation";
import CodeSlider from "@/components/CodeSlider";
import EnhancedCodeSlider from "@/components/EnhancedCodeSlider";
import { Code, Bug, FileText, Wrench, Zap, TestTube, Globe, Settings, Rocket, BookOpen, Shield, Sparkles, Check, Play, ChevronRight, Star, Quote } from "lucide-react";
import FloatingCTA from "@/components/FloatingCTA";
import CookieConsent from "@/components/CookieConsent";
import SuccessShowcase from "@/components/SuccessShowcase";
import RealtimeCounter from "@/components/RealtimeCounter";
const Index = () => {
  const typingTexts = ["Generate Code with AI", "Fix Bugs Instantly", "Optimize Performance", "Create Documentation", "Build APIs Faster"];
  const heroSampleCode = `// AI Generated E-commerce System - Complete Implementation (150+ lines)
import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { debounce } from 'lodash';
import { toast } from 'react-toastify';

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  discountPrice?: number;
  category: string;
  brand: string;
  images: string[];
  specifications: Record<string, any>;
  stock: number;
  rating: number;
  reviews: Review[];
  tags: string[];
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface Review {
  id: string;
  userId: string;
  userName: string;
  userAvatar?: string;
  rating: number;
  comment: string;
  helpful: number;
  verified: boolean;
  createdAt: string;
}

interface CartItem {
  productId: string;
  quantity: number;
  selectedVariant?: string;
  addedAt: string;
}

interface User {
  id: string;
  name: string;
  email: string;
  avatar?: string;
  preferences: {
    currency: string;
    language: string;
    notifications: boolean;
  };
}

interface ProductCardProps {
  product: Product;
  onAddToCart: (product: Product, quantity: number) => void;
  onToggleWishlist: (productId: string) => void;
  isInWishlist: boolean;
  isInCart: boolean;
  user?: User;
}

const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onAddToCart,
  onToggleWishlist,
  isInWishlist,
  isInCart,
  user
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [showDetails, setShowDetails] = useState(false);
  const [selectedVariant, setSelectedVariant] = useState('');

  // Memoized calculations for performance
  const discountPercentage = useMemo(() => {
    if (product.discountPrice && product.price > product.discountPrice) {
      return Math.round(((product.price - product.discountPrice) / product.price) * 100);
    }
    return 0;
  }, [product.price, product.discountPrice]);

  const finalPrice = useMemo(() => {
    return product.discountPrice || product.price;
  }, [product.price, product.discountPrice]);

  const averageRating = useMemo(() => {
    if (product.reviews.length === 0) return 0;
    const sum = product.reviews.reduce((acc, review) => acc + review.rating, 0);
    return (sum / product.reviews.length).toFixed(1);
  }, [product.reviews]);

  const isOutOfStock = useMemo(() => {
    return product.stock === 0;
  }, [product.stock]);

  // Debounced image change for smooth UX
  const debouncedImageChange = useCallback(
    debounce((index: number) => {
      setCurrentImageIndex(index);
    }, 100),
    []
  );

  const handleAddToCart = useCallback(async () => {
    if (!user) {
      toast.error('Please login to add items to cart');
      return;
    }

    if (isOutOfStock) {
      toast.error('This product is out of stock');
      return;
    }

    setIsLoading(true);
    try {
      await new Promise(resolve => setTimeout(resolve, 500)); // Simulate API call
      onAddToCart(product, quantity);
      toast.success(\`Added \${quantity} \${product.name} to cart!\`);
    } catch (error) {
      toast.error('Failed to add product to cart');
    } finally {
      setIsLoading(false);
    }
  }, [user, product, quantity, onAddToCart, isOutOfStock]);

  const handleWishlistToggle = useCallback(() => {
    if (!user) {
      toast.error('Please login to manage wishlist');
      return;
    }
    onToggleWishlist(product.id);
    toast.success(isInWishlist ? 'Removed from wishlist' : 'Added to wishlist');
  }, [user, product.id, onToggleWishlist, isInWishlist]);

  const formatPrice = useCallback((price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: user?.preferences.currency || 'USD'
    }).format(price);
  }, [user?.preferences.currency]);

  const renderStars = useCallback((rating: number) => {
    const stars = [];
    for (let i = 1; i <= 5; i++) {
      stars.push(
        <span
          key={i}
          className={\`text-lg \${i <= rating ? 'text-yellow-400' : 'text-gray-300'}\`}
        >
          ★
        </span>
      );
    }
    return stars;
  }, []);

  const handleImageNavigation = useCallback((direction: 'next' | 'prev') => {
    const maxIndex = product.images.length - 1;
    if (direction === 'next') {
      setCurrentImageIndex(prev => prev >= maxIndex ? 0 : prev + 1);
    } else {
      setCurrentImageIndex(prev => prev <= 0 ? maxIndex : prev - 1);
    }
  }, [product.images.length]);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (showDetails) {
        if (e.key === 'ArrowRight') handleImageNavigation('next');
        if (e.key === 'ArrowLeft') handleImageNavigation('prev');
        if (e.key === 'Escape') setShowDetails(false);
      }
    };

    document.addEventListener('keydown', handleKeyPress);
    return () => document.removeEventListener('keydown', handleKeyPress);
  }, [showDetails, handleImageNavigation]);

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 overflow-hidden group border border-gray-200">
      {/* Product Image Section */}
      <div className="relative h-64 overflow-hidden">
        <img
          src={product.images[currentImageIndex]}
          alt={product.name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
          onMouseEnter={() => setShowDetails(true)}
          onMouseLeave={() => setShowDetails(false)}
        />

        {discountPercentage > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded-full text-sm font-bold">
            -{discountPercentage}%
          </div>
        )}

        {isOutOfStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="text-white text-lg font-bold">Out of Stock</span>
          </div>
        )}

        {/* Image Navigation Dots */}
        {product.images.length > 1 && (
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1">
            {product.images.map((_, index) => (
              <button
                key={index}
                onClick={() => debouncedImageChange(index)}
                className={\`w-2 h-2 rounded-full transition-colors \${
                  index === currentImageIndex ? 'bg-white' : 'bg-white bg-opacity-50'
                }\`}
              />
            ))}
          </div>
        )}

        {/* Wishlist Button */}
        <button
          onClick={handleWishlistToggle}
          className={\`absolute top-2 right-2 p-2 rounded-full transition-colors \${
            isInWishlist ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-50'
          }\`}
        >
          ♥
        </button>
      </div>

      {/* Product Info Section */}
      <div className="p-4">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
          <p className="text-sm text-gray-600">{product.brand}</p>
        </div>

        {/* Rating and Reviews */}
        <div className="flex items-center mb-2">
          <div className="flex">{renderStars(parseFloat(averageRating))}</div>
          <span className="ml-2 text-sm text-gray-600">
            {averageRating} ({product.reviews.length} reviews)
          </span>
        </div>

        {/* Price Section */}
        <div className="mb-4">
          <div className="flex items-center space-x-2">
            <span className="text-xl font-bold text-green-600">
              {formatPrice(finalPrice)}
            </span>
            {discountPercentage > 0 && (
              <span className="text-sm text-gray-500 line-through">
                {formatPrice(product.price)}
              </span>
            )}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center border border-gray-300 rounded">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="px-3 py-1 hover:bg-gray-100"
              disabled={isOutOfStock}
            >
              -
            </button>
            <span className="px-3 py-1 border-x border-gray-300">{quantity}</span>
            <button
              onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
              className="px-3 py-1 hover:bg-gray-100"
              disabled={isOutOfStock}
            >
              +
            </button>
          </div>
          <span className="text-sm text-gray-500">
            {product.stock} in stock
          </span>
        </div>

        {/* Action Buttons */}
        <div className="space-y-2">
          <button
            onClick={handleAddToCart}
            disabled={isLoading || isOutOfStock || isInCart}
            className={\`w-full py-2 px-4 rounded-lg font-medium transition-colors \${
              isOutOfStock
                ? 'bg-gray-300 text-gray-500 cursor-not-allowed'
                : isInCart
                ? 'bg-green-500 text-white'
                : 'bg-blue-600 hover:bg-blue-700 text-white'
            }\`}
          >
            {isLoading ? 'Adding...' : isInCart ? 'In Cart' : isOutOfStock ? 'Out of Stock' : 'Add to Cart'}
          </button>

          <button
            onClick={() => setShowDetails(!showDetails)}
            className="w-full py-2 px-4 border border-gray-300 rounded-lg font-medium hover:bg-gray-50 transition-colors"
          >
            {showDetails ? 'Hide Details' : 'View Details'}
          </button>
        </div>

        {/* Product Details Expandable Section */}
        {showDetails && (
          <div className="mt-4 pt-4 border-t border-gray-200 animate-fadeIn">
            <p className="text-sm text-gray-600 mb-3">{product.description}</p>

            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="font-medium">Category:</span>
                <span>{product.category}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Rating:</span>
                <span>{averageRating}/5.0</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="font-medium">Stock:</span>
                <span className={\`\${product.stock < 10 ? 'text-red-500' : 'text-green-500'}\`}>
                  {product.stock} units
                </span>
              </div>
            </div>

            {/* Tags */}
            <div className="mt-3">
              <div className="flex flex-wrap gap-1">
                {product.tags.slice(0, 3).map((tag, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 bg-gray-100 text-xs rounded-full text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;`;
  const codeExamples = {
    javascript: `// AI Generated React Component - Real-time Chat System
import React, { useState, useEffect, useRef } from 'react';
import { io } from 'socket.io-client';

const ChatRoom = ({ roomId, user }) => {
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [onlineUsers, setOnlineUsers] = useState([]);
  const messagesEndRef = useRef(null);
  const socketRef = useRef(null);

  useEffect(() => {
    socketRef.current = io('ws://localhost:3001');

    socketRef.current.emit('join-room', { roomId, user });

    socketRef.current.on('message', (message) => {
      setMessages(prev => [...prev, message]);
    });

    socketRef.current.on('user-typing', (data) => {
      setIsTyping(data.isTyping && data.userId !== user.id);
    });

    socketRef.current.on('online-users', (users) => {
      setOnlineUsers(users);
    });

    return () => socketRef.current.disconnect();
  }, [roomId, user]);

  const sendMessage = () => {
    if (newMessage.trim()) {
      socketRef.current.emit('send-message', {
        roomId,
        message: newMessage,
        user
      });
      setNewMessage('');
    }
  };

  return (
    <div className="chat-container">
      <div className="messages">
        {messages.map(msg => (
          <div key={msg.id} className="message">
            <strong>{msg.user.name}:</strong> {msg.text}
          </div>
        ))}
        {isTyping && <div className="typing">Someone is typing...</div>}
        <div ref={messagesEndRef} />
      </div>
      <input
        value={newMessage}
        onChange={(e) => setNewMessage(e.target.value)}
        onKeyPress={(e) => e.key === 'Enter' && sendMessage()}
        placeholder="Type a message..."
      />
    </div>
  );
};`,
    python: `# AI Generated Flask API - E-commerce Product Management
from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_jwt_extended import JWTManager, create_access_token, jwt_required, get_jwt_identity
from werkzeug.security import generate_password_hash, check_password_hash
from datetime import datetime, timedelta
import redis
import json

app = Flask(__name__)
app.config['JWT_SECRET_KEY'] = 'your-secret-key'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://user:pass@localhost/ecommerce'

db = SQLAlchemy(app)
jwt = JWTManager(app)
redis_client = redis.Redis(host='localhost', port=6379, db=0)

class Product(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(100), nullable=False)
    description = db.Column(db.Text)
    price = db.Column(db.Float, nullable=False)
    category_id = db.Column(db.Integer, db.ForeignKey('category.id'))
    stock_quantity = db.Column(db.Integer, default=0)
    created_at = db.Column(db.DateTime, default=datetime.utcnow)
    is_active = db.Column(db.Boolean, default=True)

class Category(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(50), nullable=False)
    products = db.relationship('Product', backref='category', lazy=True)

@app.route('/api/products', methods=['GET'])
def get_products():
    # Check Redis cache first
    cached_products = redis_client.get('products:all')
    if cached_products:
        return jsonify(json.loads(cached_products))

    page = request.args.get('page', 1, type=int)
    per_page = request.args.get('per_page', 10, type=int)
    category = request.args.get('category')

    query = Product.query.filter_by(is_active=True)

    if category:
        query = query.join(Category).filter(Category.name == category)

    products = query.paginate(page=page, per_page=per_page)

    result = {
        'products': [{
            'id': p.id,
            'name': p.name,
            'description': p.description,
            'price': p.price,
            'category': p.category.name if p.category else None,
            'stock_quantity': p.stock_quantity
        } for p in products.items],
        'total': products.total,
        'pages': products.pages,
        'current_page': page
    }

    # Cache for 5 minutes
    redis_client.setex('products:all', 300, json.dumps(result))

    return jsonify(result)

@app.route('/api/products', methods=['POST'])
@jwt_required()
def create_product():
    current_user = get_jwt_identity()
    data = request.get_json()

    # Validate required fields
    required_fields = ['name', 'price', 'category_id']
    for field in required_fields:
        if field not in data:
            return jsonify({'error': f'{field} is required'}), 400

    try:
        product = Product(
            name=data['name'],
            description=data.get('description', ''),
            price=float(data['price']),
            category_id=int(data['category_id']),
            stock_quantity=int(data.get('stock_quantity', 0))
        )

        db.session.add(product)
        db.session.commit()

        # Clear cache
        redis_client.delete('products:all')

        return jsonify({
            'message': 'Product created successfully',
            'product_id': product.id
        }), 201

    except Exception as e:
        db.session.rollback()
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)`,
    java: `// AI Generated Spring Boot - Microservice Architecture
package com.example.userservice;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.netflix.eureka.EnableEurekaClient;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.web.bind.annotation.*;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.kafka.core.KafkaTemplate;

import javax.persistence.*;
import javax.validation.Valid;
import javax.validation.constraints.*;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@SpringBootApplication
@EnableEurekaClient
public class UserServiceApplication {
    public static void main(String[] args) {
        SpringApplication.run(UserServiceApplication.class, args);
    }
}

@Entity
@Table(name = "users")
public class User {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    @Email(message = "Email should be valid")
    private String email;

    @Column(nullable = false)
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String firstName;

    @Column(nullable = false)
    @Size(min = 2, max = 50, message = "Name must be between 2 and 50 characters")
    private String lastName;

    @Column(nullable = false)
    @Size(min = 8, message = "Password must be at least 8 characters")
    private String password;

    @Enumerated(EnumType.STRING)
    private UserRole role = UserRole.USER;

    @Column(nullable = false)
    private Boolean isActive = true;

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();

    // Constructors, getters, setters
    public User() {}

    public User(String email, String firstName, String lastName, String password) {
        this.email = email;
        this.firstName = firstName;
        this.lastName = lastName;
        this.password = password;
    }

    // Getters and setters omitted for brevity
}

enum UserRole {
    USER, ADMIN, MODERATOR
}

interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);
    List<User> findByIsActiveTrue();
    boolean existsByEmail(String email);
}

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "*")
public class UserController {

    private final UserRepository userRepository;
    private final BCryptPasswordEncoder passwordEncoder;
    private final KafkaTemplate<String, Object> kafkaTemplate;

    public UserController(UserRepository userRepository,
                         BCryptPasswordEncoder passwordEncoder,
                         KafkaTemplate<String, Object> kafkaTemplate) {
        this.userRepository = userRepository;
        this.passwordEncoder = passwordEncoder;
        this.kafkaTemplate = kafkaTemplate;
    }

    @PostMapping("/register")
    public ResponseEntity<?> registerUser(@Valid @RequestBody UserRegistrationRequest request) {
        try {
            // Check if user already exists
            if (userRepository.existsByEmail(request.getEmail())) {
                return ResponseEntity.badRequest()
                    .body(new ApiResponse(false, "Email is already in use!"));
            }

            // Create new user
            User user = new User(
                request.getEmail(),
                request.getFirstName(),
                request.getLastName(),
                passwordEncoder.encode(request.getPassword())
            );

            User savedUser = userRepository.save(user);

            // Send event to Kafka
            UserCreatedEvent event = new UserCreatedEvent(
                savedUser.getId(),
                savedUser.getEmail(),
                savedUser.getFirstName() + " " + savedUser.getLastName()
            );
            kafkaTemplate.send("user-created", event);

            return ResponseEntity.ok(new ApiResponse(true, "User registered successfully"));

        } catch (Exception e) {
            return ResponseEntity.status(500)
                .body(new ApiResponse(false, "Registration failed: " + e.getMessage()));
        }
    }

    @GetMapping("/{id}")
    public ResponseEntity<?> getUserById(@PathVariable Long id) {
        Optional<User> user = userRepository.findById(id);

        if (user.isPresent()) {
            UserProfileResponse response = new UserProfileResponse(user.get());
            return ResponseEntity.ok(response);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateUser(@PathVariable Long id,
                                       @Valid @RequestBody UserUpdateRequest request) {
        return userRepository.findById(id)
            .map(user -> {
                user.setFirstName(request.getFirstName());
                user.setLastName(request.getLastName());
                userRepository.save(user);
                return ResponseEntity.ok(new ApiResponse(true, "User updated successfully"));
            })
            .orElse(ResponseEntity.notFound().build());
    }
}`,
    sql: `-- AI Generated Database Schema - E-commerce Platform
-- Complete database design with relationships, indexes, and triggers

-- Users table with authentication and profile information
CREATE TABLE users (
    id BIGSERIAL PRIMARY KEY,
    email VARCHAR(255) UNIQUE NOT NULL,
    password_hash VARCHAR(255) NOT NULL,
    first_name VARCHAR(100) NOT NULL,
    last_name VARCHAR(100) NOT NULL,
    phone VARCHAR(20),
    date_of_birth DATE,
    gender VARCHAR(20),
    is_active BOOLEAN DEFAULT true,
    email_verified BOOLEAN DEFAULT false,
    last_login TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Categories table for product organization
CREATE TABLE categories (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    description TEXT,
    parent_id INTEGER REFERENCES categories(id),
    image_url VARCHAR(500),
    is_active BOOLEAN DEFAULT true,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Products table with comprehensive product information
CREATE TABLE products (
    id BIGSERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    slug VARCHAR(255) UNIQUE NOT NULL,
    description TEXT,
    short_description VARCHAR(500),
    category_id INTEGER REFERENCES categories(id),
    brand_id INTEGER REFERENCES brands(id),
    sku VARCHAR(100) UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    sale_price DECIMAL(10,2),
    stock_quantity INTEGER DEFAULT 0,
    low_stock_threshold INTEGER DEFAULT 5,
    weight DECIMAL(8,2),
    dimensions JSONB, -- {length, width, height}
    is_digital BOOLEAN DEFAULT false,
    status VARCHAR(20) DEFAULT 'active', -- active, inactive, discontinued
    featured BOOLEAN DEFAULT false,
    tags TEXT[],
    meta_title VARCHAR(255),
    meta_description TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product images table for multiple images per product
CREATE TABLE product_images (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    image_url VARCHAR(500) NOT NULL,
    alt_text VARCHAR(255),
    is_primary BOOLEAN DEFAULT false,
    sort_order INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Shopping cart table for user cart management
CREATE TABLE cart_items (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    price DECIMAL(10,2) NOT NULL, -- Store price at time of adding
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(user_id, product_id)
);

-- Orders table for order management
CREATE TABLE orders (
    id BIGSERIAL PRIMARY KEY,
    user_id BIGINT REFERENCES users(id),
    order_number VARCHAR(50) UNIQUE NOT NULL,
    status VARCHAR(20) DEFAULT 'pending', -- pending, confirmed, shipped, delivered, cancelled
    total_amount DECIMAL(10,2) NOT NULL,
    tax_amount DECIMAL(10,2) DEFAULT 0,
    shipping_amount DECIMAL(10,2) DEFAULT 0,
    discount_amount DECIMAL(10,2) DEFAULT 0,
    payment_status VARCHAR(20) DEFAULT 'pending', -- pending, paid, failed, refunded
    payment_method VARCHAR(50),
    shipping_address JSONB NOT NULL,
    billing_address JSONB NOT NULL,
    notes TEXT,
    shipped_at TIMESTAMP,
    delivered_at TIMESTAMP,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Order items table for detailed order information
CREATE TABLE order_items (
    id BIGSERIAL PRIMARY KEY,
    order_id BIGINT REFERENCES orders(id) ON DELETE CASCADE,
    product_id BIGINT REFERENCES products(id),
    product_name VARCHAR(255) NOT NULL, -- Store name in case product is deleted
    quantity INTEGER NOT NULL CHECK (quantity > 0),
    unit_price DECIMAL(10,2) NOT NULL,
    total_price DECIMAL(10,2) NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Product reviews and ratings
CREATE TABLE product_reviews (
    id BIGSERIAL PRIMARY KEY,
    product_id BIGINT REFERENCES products(id) ON DELETE CASCADE,
    user_id BIGINT REFERENCES users(id) ON DELETE CASCADE,
    order_id BIGINT REFERENCES orders(id), -- Optional: link to purchase
    rating INTEGER NOT NULL CHECK (rating >= 1 AND rating <= 5),
    title VARCHAR(255),
    review_text TEXT,
    is_verified_purchase BOOLEAN DEFAULT false,
    is_approved BOOLEAN DEFAULT false,
    helpful_count INTEGER DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    UNIQUE(product_id, user_id) -- One review per user per product
);

-- Create indexes for better performance
CREATE INDEX idx_products_category_id ON products(category_id);
CREATE INDEX idx_products_status ON products(status);
CREATE INDEX idx_products_featured ON products(featured);
CREATE INDEX idx_products_created_at ON products(created_at);
CREATE INDEX idx_cart_items_user_id ON cart_items(user_id);
CREATE INDEX idx_orders_user_id ON orders(user_id);
CREATE INDEX idx_orders_status ON orders(status);
CREATE INDEX idx_orders_created_at ON orders(created_at);
CREATE INDEX idx_product_reviews_product_id ON product_reviews(product_id);
CREATE INDEX idx_product_reviews_rating ON product_reviews(rating);

-- Create a function to update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
    NEW.updated_at = CURRENT_TIMESTAMP;
    RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update updated_at columns
CREATE TRIGGER update_users_updated_at BEFORE UPDATE ON users
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_products_updated_at BEFORE UPDATE ON products
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_cart_items_updated_at BEFORE UPDATE ON cart_items
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_orders_updated_at BEFORE UPDATE ON orders
    FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to calculate order total
CREATE OR REPLACE FUNCTION calculate_order_total(order_id_param BIGINT)
RETURNS DECIMAL(10,2) AS $$
DECLARE
    total DECIMAL(10,2);
BEGIN
    SELECT COALESCE(SUM(total_price), 0) INTO total
    FROM order_items
    WHERE order_id = order_id_param;

    RETURN total;
END;
$$ LANGUAGE plpgsql;

-- View for product statistics
CREATE VIEW product_statistics AS
SELECT
    p.id,
    p.name,
    p.price,
    p.stock_quantity,
    COALESCE(AVG(pr.rating), 0) AS average_rating,
    COUNT(pr.id) AS review_count,
    COALESCE(SUM(oi.quantity), 0) AS total_sold
FROM products p
LEFT JOIN product_reviews pr ON p.id = pr.product_id AND pr.is_approved = true
LEFT JOIN order_items oi ON p.id = oi.product_id
GROUP BY p.id, p.name, p.price, p.stock_quantity;`
  };
  const features = [{
    icon: <Code className="h-8 w-8" />,
    title: "AI Code Generator",
    description: "Generate code from natural language descriptions in any programming language"
  }, {
    icon: <Bug className="h-8 w-8" />,
    title: "AI Bug Fixer",
    description: "Automatically detect and fix bugs in your code with AI-powered solutions"
  }, {
    icon: <FileText className="h-8 w-8" />,
    title: "Code Explainer",
    description: "Get detailed explanations of complex code snippets and algorithms"
  }, {
    icon: <Wrench className="h-8 w-8" />,
    title: "Code Refactor",
    description: "Improve code quality and maintainability with intelligent refactoring"
  }, {
    icon: <Zap className="h-8 w-8" />,
    title: "Code Optimizer",
    description: "Optimize your code for better performance and efficiency"
  }, {
    icon: <TestTube className="h-8 w-8" />,
    title: "Unit Test Generator",
    description: "Generate comprehensive unit tests for your functions and methods"
  }, {
    icon: <Globe className="h-8 w-8" />,
    title: "API Generator",
    description: "Create REST API endpoints with proper routing and validation"
  }, {
    icon: <Settings className="h-8 w-8" />,
    title: "Config Generator",
    description: "Generate configuration files for popular frameworks and tools"
  }, {
    icon: <Rocket className="h-8 w-8" />,
    title: "Deployment Scripts",
    description: "Create deployment scripts for various platforms and environments"
  }, {
    icon: <BookOpen className="h-8 w-8" />,
    title: "Documentation Generator",
    description: "Generate comprehensive documentation for your codebase"
  }, {
    icon: <Sparkles className="h-8 w-8" />,
    title: "Lint Fixer",
    description: "Automatically fix linting errors and improve code style"
  }, {
    icon: <Shield className="h-8 w-8" />,
    title: "Security Checker",
    description: "Scan your code for security vulnerabilities and get fixes"
  }];
  const aiDemoExamples = [{
    title: "React Component Generator",
    description: "Generate complete React components with hooks and TypeScript",
    example: "Create a real-time chat system with WebSocket",
    result: "✅ Generated React component with real-time messaging",
    icon: <Code className="h-6 w-6" />,
    bgColor: "bg-blue-50",
    iconColor: "text-blue-600",
    codeType: "javascript",
    toolPath: "/tools/code-generator"
  }, {
    title: "Python API Development",
    description: "Build Flask/Django APIs with authentication and caching",
    example: "Create e-commerce product management API",
    result: "✅ Generated Flask API with Redis caching and JWT auth",
    icon: <Globe className="h-6 w-6" />,
    bgColor: "bg-green-50",
    iconColor: "text-green-600",
    codeType: "python",
    toolPath: "/tools/api-generator"
  }, {
    title: "Java Microservices",
    description: "Generate Spring Boot microservices with Kafka integration",
    example: "Build user service with event-driven architecture",
    result: "✅ Created Spring Boot service with Kafka messaging",
    icon: <Zap className="h-6 w-6" />,
    bgColor: "bg-orange-50",
    iconColor: "text-orange-600",
    codeType: "java",
    toolPath: "/tools/code-generator"
  }, {
    title: "Database Design",
    description: "Design complete database schemas with relationships",
    example: "Create e-commerce database with indexing",
    result: "✅ Generated PostgreSQL schema with triggers and views",
    icon: <Bug className="h-6 w-6" />,
    bgColor: "bg-purple-50",
    iconColor: "text-purple-600",
    codeType: "sql",
    toolPath: "/tools/config-generator"
  }];
  const plans = [{
    name: "Starter",
    price: "$5",
    bdtPrice: "৳625",
    period: "/month",
    description: "Perfect for individual developers",
    credits: 200,
    popular: false,
    features: ["200 AI credits per month", "All AI tools access", "Email support", "Basic usage analytics"]
  }, {
    name: "Pro",
    price: "$10",
    bdtPrice: "৳1,250",
    period: "/month",
    description: "Ideal for professional developers",
    credits: 500,
    popular: true,
    features: ["500 AI credits per month", "All AI tools access", "Priority processing", "Priority email support", "Advanced analytics"]
  }, {
    name: "Enterprise",
    price: "$20",
    bdtPrice: "৳2,500",
    period: "/month",
    description: "For teams and organizations",
    credits: 1500,
    popular: false,
    features: ["1,500 AI credits per month", "All AI tools access", "Highest priority processing", "24/7 priority support", "API access"]
  }];
  const faqs = [{
    question: "How does the AI code generation work?",
    answer: "Our AI uses advanced machine learning models trained on millions of code repositories to understand your requirements and generate high-quality, production-ready code in any programming language."
  }, {
    question: "What programming languages are supported?",
    answer: "We support all major programming languages including JavaScript, Python, Java, C++, Go, Rust, TypeScript, PHP, Ruby, and many more. The AI can also work with frameworks and libraries."
  }, {
    question: "How accurate is the bug detection?",
    answer: "Our AI bug detection has a 95% accuracy rate for common programming errors, memory leaks, security vulnerabilities, and performance issues. It continuously learns from new patterns."
  }, {
    question: "Can I use this for commercial projects?",
    answer: "Yes! All generated code is yours to use in any project, including commercial applications. We don't claim any ownership over the code you generate."
  }, {
    question: "What if I run out of credits?",
    answer: "You can upgrade your plan anytime or purchase additional credits. We also offer custom enterprise plans for high-volume usage."
  }, {
    question: "Is my code data secure?",
    answer: "Absolutely. We use enterprise-grade encryption and never store your code permanently. All processing is done securely and your intellectual property remains yours."
  }];
  const testimonials = [{
    name: "Sarah Johnson",
    role: "Senior Developer at TechCorp",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=150&h=150&fit=crop&crop=face",
    content: "Coding Killer has transformed my development workflow. The AI-generated code is incredibly accurate and saves me hours every day. The bug detection feature alone has prevented countless production issues.",
    rating: 5
  }, {
    name: "Michael Chen",
    role: "Full-Stack Developer",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face",
    content: "As a freelancer, time is money. This tool helps me deliver projects faster without compromising quality. The code explanations are particularly helpful when working with unfamiliar technologies.",
    rating: 5
  }, {
    name: "Emily Rodriguez",
    role: "Tech Lead at StartupXYZ",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face",
    content: "Our team's productivity has increased by 40% since adopting Coding Killer. The API generation tool is phenomenal - it creates production-ready endpoints with proper validation and security.",
    rating: 5
  }, {
    name: "David Kim",
    role: "Software Engineer",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face",
    content: "The code refactoring tool is a game-changer. It not only improves code quality but also teaches me best practices. I've learned more about clean code in the past month than in years of experience.",
    rating: 5
  }, {
    name: "Lisa Thompson",
    role: "Junior Developer",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face",
    content: "As someone new to programming, the code explainer feature has been invaluable. It breaks down complex algorithms in a way that's easy to understand. Highly recommend for beginners!",
    rating: 5
  }, {
    name: "Alex Johnson",
    role: "DevOps Engineer",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&h=150&fit=crop&crop=face",
    content: "The deployment script generator saves me tons of time. It creates robust, production-ready deployment scripts for various platforms. The security checker is also top-notch.",
    rating: 5
  }];
  return <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      <SEO title="Home" description="AI-powered coding assistant that helps developers write better code faster with intelligent code generation, bug fixing, optimization, and more." keywords="AI coding assistant, code generator, bug fixer, code optimization, programming tools" canonical="/" />

      <Navbar2 />

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <h1 className="text-5xl md:text-7xl font-bold mb-6">
                <span className="gradient-text">AI Powered</span>
                <br />
                <span className="text-gray-900">Coding Assistant</span>
              </h1>

              <div className="text-xl md:text-2xl mb-6 min-h-[2rem]">
                <TypingAnimation texts={typingTexts} />
              </div>

              <p className="text-xl md:text-2xl text-gray-600 mb-8">
                Revolutionize your development workflow with AI-powered code
                generation, debugging, optimization, and more. Code smarter, not
                harder.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link to="/signup">
                  <Button size="lg" className="bg-primary hover:bg-primary/90 text-lg px-8 py-4">
                    Start Coding with AI
                  </Button>
                </Link>
                <Link to="/pricing">
                  <Button variant="outline" size="lg" className="text-lg px-8 py-4">
                    View Pricing
                  </Button>
                </Link>
              </div>
            </div>

            <div className="lg:pl-8">
              <div className="h-96 w-full">
                <EnhancedCodeSlider code={heroSampleCode} language="javascript" title="AI Generated E-commerce Component (150+ lines)" maxHeight={384} enableAutoScroll={true} />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Real-time Counter */}
      <RealtimeCounter />

      {/* Powerful AI Tools Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              Powerful AI Tools
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to supercharge your development workflow
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => <Card key={index} className="hover:shadow-lg transition-all duration-300 animate-slide-up border-primary/10">
                <CardHeader>
                  <div className="text-primary mb-4">{feature.icon}</div>
                  <CardTitle className="text-xl">{feature.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Success Showcase */}
      <SuccessShowcase />

      {/* See AI in Action Section - Enhanced Modern Grid */}
      <section className="py-24 px-4 bg-gradient-to-br from-slate-50 via-blue-50/30 to-indigo-50/40 relative overflow-hidden">
        {/* Animated background elements */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-1/2 -right-1/2 w-96 h-96 bg-gradient-to-br from-blue-400/10 to-purple-400/10 rounded-full blur-3xl animate-pulse"></div>
          <div className="absolute -bottom-1/2 -left-1/2 w-96 h-96 bg-gradient-to-tr from-green-400/10 to-blue-400/10 rounded-full blur-3xl animate-pulse delay-1000"></div>
        </div>

        <div className="container mx-auto relative z-10">
          {/* Enhanced Header */}
          <div className="text-center mb-20">
            <div className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-sm border border-primary/20 rounded-full px-6 py-2 mb-6">
              <Sparkles className="h-4 w-4 text-primary animate-pulse" />
              <span className="text-sm font-medium text-primary">
                Live AI Demo
              </span>
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
            </div>

            <h2 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="gradient-text">See AI in Action</span>
            </h2>
            <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
              Experience the future of coding with our AI-powered tools. Watch
              real-time code generation, intelligent debugging, and automated
              optimization in action. Production-ready code in seconds.
            </p>
          </div>

          {/* Advanced Grid Layout */}
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-2 gap-8 mb-16">
            {aiDemoExamples.map((demo, index) => <div key={index} className={`group relative transform transition-all duration-700 hover:scale-[1.02] ${index % 2 === 0 ? "lg:translate-y-8" : "lg:-translate-y-4"}`} style={{
            animationDelay: `${index * 200}ms`
          }}>
                {/* Glowing border effect */}
                <div className="absolute -inset-0.5 bg-gradient-to-r from-primary via-blue-500 to-purple-500 rounded-2xl opacity-0 group-hover:opacity-20 transition-opacity duration-500 blur"></div>

                <Card className="relative h-full bg-white/95 backdrop-blur-xl border-0 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden">
                  {/* Animated top border */}
                  <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-primary to-transparent"></div>

                  {/* Premium badge */}
                  <div className="absolute top-4 right-4 z-10">
                    <div className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs px-3 py-1 rounded-full font-bold shadow-lg">
                      ⚡ Instant
                    </div>
                  </div>

                  <CardHeader className="pb-6 pt-8">
                    {/* Enhanced icon design */}
                    <div className="flex items-start justify-between mb-6">
                      <div className="flex items-center gap-4">
                        <div className={`relative p-4 ${demo.bgColor} rounded-2xl shadow-xl group-hover:scale-110 transition-transform duration-300`}>
                          <div className={`${demo.iconColor} transform group-hover:rotate-12 transition-transform duration-300`}>
                            {demo.icon}
                          </div>
                          {/* Pulse ring */}
                          <div className="absolute inset-0 rounded-2xl bg-current opacity-20 animate-ping"></div>
                        </div>
                        <div>
                          <h3 className="font-bold text-xl text-gray-900 group-hover:text-primary transition-colors duration-300 mb-2">
                            {demo.title}
                          </h3>
                          <div className="flex items-center gap-2">
                            <div className="flex items-center gap-1">
                              <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                              <span className="text-sm font-medium">4.9</span>
                            </div>
                            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                            <span className="text-sm text-green-600 font-medium">
                              2-5 sec
                            </span>
                            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
                            <div className="flex items-center gap-1">
                              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                              <span className="text-sm text-gray-600">
                                Live
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-600 text-lg leading-relaxed mb-6">
                      {demo.description}
                    </p>

                    {/* Advanced feature highlights */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 mb-6">
                      <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-2 rounded-xl text-sm font-medium border border-emerald-200">
                        <Check className="h-4 w-4 text-emerald-600" />
                        <span>Instant Generate</span>
                      </div>
                      <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-3 py-2 rounded-xl text-sm font-medium border border-blue-200">
                        <Zap className="h-4 w-4 text-blue-600" />
                        <span>Best Practices</span>
                      </div>
                      <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-3 py-2 rounded-xl text-sm font-medium border border-purple-200">
                        <Globe className="h-4 w-4 text-purple-600" />
                        <span>Multi Framework</span>
                      </div>
                    </div>
                  </CardHeader>

                  <CardContent className="pt-0 pb-8">
                    {/* Enhanced example showcase */}
                    <div className="relative bg-gradient-to-br from-gray-50 to-gray-100/80 rounded-2xl p-6 mb-6 border border-gray-200/50 overflow-hidden">
                      <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary/5 to-transparent rounded-full transform translate-x-16 -translate-y-16"></div>
                      <div className="relative">
                        <div className="flex items-start gap-4">
                          <div className="bg-gradient-to-br from-primary to-primary/80 rounded-xl p-3 shadow-lg">
                            <Play className="h-5 w-5 text-white" />
                          </div>
                          <div className="flex-1">
                            <div className="flex items-center gap-2 mb-2">
                              <span className="text-sm font-bold text-gray-800">
                                Example Request
                              </span>
                              <div className="h-1 w-1 bg-gray-400 rounded-full"></div>
                              <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
                                Natural Language
                              </span>
                            </div>
                            <p className="text-gray-700 italic mb-3 font-medium">
                              "{demo.example}"
                            </p>
                            <div className="flex items-center gap-2">
                              <Check className="h-4 w-4 text-green-600" />
                              <span className="text-sm font-semibold text-green-700">
                                {demo.result}
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Enhanced code preview */}
                    <div className="mb-8">
                      
                      <EnhancedCodeSlider code={codeExamples[demo.codeType]} language={demo.codeType} title="" maxHeight={280} enableAutoScroll={true} />
                    </div>

                    {/* Enhanced action button */}
                    <Link to={demo.toolPath}>
                      <Button className="w-full bg-gradient-to-r from-primary via-primary to-primary/90 hover:from-primary/90 hover:via-primary/80 hover:to-primary/70 text-white shadow-xl hover:shadow-2xl transition-all duration-500 group-hover:scale-[1.02] font-semibold text-lg py-6 rounded-xl relative overflow-hidden" size="lg">
                        <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                        <div className="relative flex items-center justify-center gap-3">
                          <Play className="h-5 w-5" />
                          <span>Try It Now</span>
                          <ChevronRight className="h-5 w-5 group-hover:translate-x-1 transition-transform duration-300" />
                        </div>
                      </Button>
                    </Link>
                  </CardContent>

                  {/* Floating live indicator */}
                  <div className="absolute -top-3 -right-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white text-xs px-3 py-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all duration-300 transform group-hover:scale-110">
                    <div className="flex items-center gap-1">
                      <div className="w-2 h-2 bg-white rounded-full animate-pulse"></div>
                      <span className="font-bold">Live Demo</span>
                    </div>
                  </div>
                </Card>
              </div>)}
          </div>

          {/* Enhanced Bottom CTA section */}
          <div className="relative">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/5 via-blue-500/5 to-purple-500/5 rounded-3xl transform rotate-1"></div>
            <div className="relative bg-white/90 backdrop-blur-xl rounded-3xl p-12 border border-primary/20 shadow-2xl">
              <div className="text-center">
                <div className="inline-flex items-center gap-2 bg-gradient-to-r from-primary/10 to-blue-500/10 rounded-full px-6 py-2 mb-6">
                  <Sparkles className="h-4 w-4 text-primary" />
                  <span className="text-sm font-semibold text-primary">
                    Join 50,000+ Developers
                  </span>
                </div>

                <h3 className="text-4xl font-bold text-gray-900 mb-6">
                  Ready to Experience{" "}
                  <span className="gradient-text">AI-Powered Development?</span>
                </h3>
                <p className="text-xl text-gray-600 mb-10 max-w-3xl mx-auto leading-relaxed">
                  Transform your coding workflow with cutting-edge AI tools.
                  Generate, debug, optimize, and deploy faster than ever before.
                  Start building the future today.
                </p>

                <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
                  <Link to="/tools">
                    <Button size="lg" className="bg-gradient-to-r from-primary to-primary/90 hover:from-primary/90 hover:to-primary/80 shadow-xl hover:shadow-2xl text-lg px-8 py-4 rounded-xl font-semibold relative overflow-hidden group">
                      <div className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0 transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
                      <div className="relative flex items-center gap-3">
                        <Zap className="h-6 w-6" />
                        <span>Explore All Tools</span>
                        <ChevronRight className="h-6 w-6 group-hover:translate-x-1 transition-transform" />
                      </div>
                    </Button>
                  </Link>
                  <Link to="/signup">
                    <Button variant="outline" size="lg" className="border-2 border-primary text-primary hover:bg-primary hover:text-white text-lg px-8 py-4 rounded-xl font-semibold transition-all duration-300 hover:shadow-lg">
                      Start Free Trial
                    </Button>
                  </Link>
                </div>

                {/* Trust indicators */}
                <div className="flex items-center justify-center gap-8 mt-10 pt-8 border-t border-gray-200">
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">2.5M+</div>
                    <div className="text-sm text-gray-600">Lines Generated</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">99.9%</div>
                    <div className="text-sm text-gray-600">Uptime</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-primary">4.9/5</div>
                    <div className="text-sm text-gray-600">User Rating</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Compare Plans Section */}
      <section className="py-20 px-4 bg-white">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Compare Plans
            </h2>
            <p className="text-xl text-gray-600">
              Choose the perfect plan for your development needs
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => <Card key={index} className={`relative ${plan.popular ? "border-primary shadow-lg scale-105" : "border-gray-200"}`}>
                {plan.popular && <div className="absolute -top-3 left-1/2 transform -translate-x-1/2 bg-primary text-white px-4 py-1 rounded-full text-sm font-medium">
                    Most Popular
                  </div>}

                <CardHeader className="text-center pb-4">
                  <CardTitle className="text-2xl font-bold">
                    {plan.name}
                  </CardTitle>
                  <div className="mt-4">
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-primary">
                        {plan.price}
                      </span>
                      <span className="text-gray-600 ml-1">{plan.period}</span>
                    </div>
                    <p className="text-sm text-gray-500 mt-1">
                      {plan.bdtPrice} BDT
                    </p>
                  </div>
                  <CardDescription className="mt-4">
                    {plan.description}
                  </CardDescription>
                </CardHeader>

                <CardContent>
                  <div className="mb-6 text-center">
                    <div className="text-2xl font-bold text-primary">
                      {plan.credits}
                    </div>
                    <div className="text-sm text-gray-600">
                      AI credits per month
                    </div>
                  </div>

                  <ul className="space-y-3 mb-6">
                    {plan.features.map((feature, featureIndex) => <li key={featureIndex} className="flex items-center">
                        <Check className="h-4 w-4 text-primary mr-3 flex-shrink-0" />
                        <span className="text-sm text-gray-700">{feature}</span>
                      </li>)}
                  </ul>

                  <Link to="/payment" state={{
                plan: plan.name,
                price: plan.price
              }}>
                    <Button className={`w-full ${plan.popular ? "bg-primary hover:bg-primary/90" : "bg-gray-900 hover:bg-gray-800"}`}>
                      Get Started
                    </Button>
                  </Link>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* Frequently Asked Questions */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              Frequently Asked Questions
            </h2>
            <p className="text-xl text-gray-600">
              Everything you need to know about our AI coding assistant
            </p>
          </div>

          <div className="max-w-4xl mx-auto">
            <Accordion type="single" collapsible className="space-y-4">
              {faqs.map((faq, index) => <AccordionItem key={index} value={`item-${index}`} className="bg-white rounded-lg shadow-sm border border-gray-200">
                  <AccordionTrigger className="px-6 py-4 text-left hover:no-underline">
                    <span className="text-lg font-semibold text-gray-900">
                      {faq.question}
                    </span>
                  </AccordionTrigger>
                  <AccordionContent className="px-6 pb-4">
                    <p className="text-gray-600 leading-relaxed">
                      {faq.answer}
                    </p>
                  </AccordionContent>
                </AccordionItem>)}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary/10 to-primary/5">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold gradient-text mb-4">
              What Developers Say
            </h2>
            <p className="text-xl text-gray-600">
              Join thousands of developers who trust Coding Killer
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => <Card key={index} className="bg-white shadow-lg hover:shadow-xl transition-shadow duration-300">
                <CardContent className="p-6">
                  <div className="flex items-center mb-4">
                    <img src={testimonial.avatar} alt={testimonial.name} className="w-12 h-12 rounded-full object-cover mr-4" />
                    <div>
                      <h4 className="font-semibold text-gray-900">
                        {testimonial.name}
                      </h4>
                      <p className="text-sm text-gray-600">
                        {testimonial.role}
                      </p>
                    </div>
                  </div>

                  <div className="flex mb-4">
                    {[...Array(testimonial.rating)].map((_, i) => <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />)}
                  </div>

                  <div className="relative">
                    <Quote className="h-6 w-6 text-primary/20 absolute -top-2 -left-1" />
                    <p className="text-gray-700 italic pl-6">
                      {testimonial.content}
                    </p>
                  </div>
                </CardContent>
              </Card>)}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-gradient-to-r from-primary to-primary/80 text-white">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">Ready to Code Smarter?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of developers who are already using AI to write
            better code faster
          </p>
          <Link to="/signup">
            <Button size="lg" variant="secondary" className="text-lg px-8 py-4">
              Get Started Free
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-4">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <img src="https://i.postimg.cc/mkqZncXQ/Chat-GPT-Image-Jul-2-2025-04-29-00-PM-min.png" alt="Coding Killer Logo" className="w-8 h-8 rounded object-cover" onError={e => {
                e.currentTarget.src = "/lovable-uploads/44f7b590-ba5e-4d61-b590-92095e19779b.png";
              }} />
                <span className="text-xl font-bold">Coding Killer</span>
              </div>
              <p className="text-gray-400">
                AI-powered coding assistant for developers
              </p>
            </div>

            <div>
              <h3 className="font-bold mb-4">Product</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/pricing" className="hover:text-white">
                    Pricing
                  </Link>
                </li>
                <li>
                  <Link to="/tools" className="hover:text-white">
                    Tools
                  </Link>
                </li>
                <li>
                  <Link to="/changelog" className="hover:text-white">
                    Changelog
                  </Link>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Company</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/about" className="hover:text-white">
                    About
                  </Link>
                </li>
                <li>
                  <a href="mailto:21ashikur1234@gmail.com" className="hover:text-white">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold mb-4">Legal</h3>
              <ul className="space-y-2 text-gray-400">
                <li>
                  <Link to="/privacy" className="hover:text-white">
                    Privacy Policy
                  </Link>
                </li>
                <li>
                  <Link to="/terms" className="hover:text-white">
                    Terms of Service
                  </Link>
                </li>
                <li>
                  <Link to="/refund-policy" className="hover:text-white">
                    Refund Policy
                  </Link>
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2024 Coding Killer. All rights reserved.</p>
          </div>
        </div>
      </footer>

      {/* Floating Components */}
      <FloatingCTA />
      <CookieConsent />
    </div>;
};
export default Index;