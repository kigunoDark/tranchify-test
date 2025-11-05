# 🛍️ Tranchify Store - Product Listing Application

A modern, type-safe React application built with TypeScript, featuring product browsing, filtering, and editing capabilities.

![TypeScript](https://img.shields.io/badge/TypeScript-5.6-blue)
![React](https://img.shields.io/badge/React-19-61dafb)
![Vite](https://img.shields.io/badge/Vite-7-646cff)
![TailwindCSS](https://img.shields.io/badge/Tailwind-3.4-38bdf8)

## 🚀 Quick Start

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd tranchify-test

# Install dependencies
npm install

# Start development server
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

### Build for Production

```bash
npm run build
npm run preview
```

## ✨ Features

### Core Functionality

- ✅ **Product Listing** - Grid view with thumbnail, title, category, price, and rating
- ✅ **Advanced Filtering** - Schema-driven filters with React Hook Form + Zod
  - Text search by title
  - Multi-select categories
  - Price range (min/max with validation)
  - Rating filter (radio buttons)
  - Discount-only toggle with conditional min discount percentage
  - Dynamic behavior: maxPrice disabled until minPrice is set
- ✅ **Product Details** - Rich detail page with image carousel
- ✅ **Product Editing** - Protected edit page with mock authentication
- ✅ **Infinite Scroll** - Auto-loads more products as you scroll
- ✅ **404 Page** - Graceful error handling

### 🌟 Bonus Features Implemented

- ✅ **URL Query Params** - Filters persist in URL and restore on page reload
- ✅ **Mobile Responsive Drawer** - Sidebar becomes a drawer on mobile devices
- ✅ **Protected Routes** - Edit page gated behind mock authentication
- ✅ **In-Memory State** - Product edits stored in memory (no backend required)
- ✅ **Infinite Scroll Pagination** - Loads 12 products at a time with auto-scroll detection
- ✅ **Advanced Image Optimization** - Custom ProductImage component with:
  - Lazy loading with `loading="lazy"` attribute
  - Skeleton loaders with pulse animation
  - Smooth fade-in transitions when loaded
  - Error fallback with "No Image" placeholder
  - Priority loading for above-the-fold images
  - Async decoding for non-blocking rendering
- ✅ **Accessibility** - ARIA labels, keyboard navigation, semantic HTML
- ✅ **Loading States** - Spinners and skeletons for better UX
- ✅ **Error Boundaries** - Graceful error handling throughout

## 🏗️ Architecture

### Tech Stack

- **React 19** - UI library
- **TypeScript 5.6** (strict mode) - Type safety
- **Vite 7** - Build tool and dev server
- **React Router 6.4+** - Routing with createBrowserRouter
- **React Hook Form 7** - Form management
- **Zod** - Schema validation
- **Tailwind CSS 3.4** - Styling
- **shadcn/ui** - Accessible component library
- **Radix UI** - Headless UI primitives

### Project Structure

```
src/
├── components/
│   ├── ui/              # shadcn/ui components (Button, Input, etc.)
│   ├── layout/          # Header, Sidebar
│   └── products/        # ProductCard, ProductGrid, FilterPanel, ProductImage
├── pages/
│   ├── ListingPage.tsx  # Main product listing with filters
│   ├── DetailPage.tsx   # Product detail with carousel
│   ├── EditPage.tsx     # Protected edit page
│   └── NotFoundPage.tsx # 404 error page
├── hooks/
│   ├── useProducts.ts   # Product fetching with pagination
│   └── useAuth.ts       # Mock authentication
├── lib/
│   ├── utils.ts         # Utility functions (cn)
│   └── api.ts           # API calls to DummyJSON
├── types/
│   └── product.ts       # Product type definitions
├── schemas/
│   ├── filterSchema.ts  # Filter validation schema
│   └── editSchema.ts    # Edit form validation schema
├── helpers/
│   ├── parseFilter.ts   # Parse URL query params
│   └── createProductFilter.ts # Create filter function
├── constants/
│   └── filter.const.ts  # Filter constants
├── App.tsx              # Router configuration
└── main.tsx             # Application entry point
```

## 🎯 Key Technical Decisions

### Type Safety

- **Strict TypeScript** enabled with `noUnusedLocals` and `noUnusedParameters`
- **NO `any` types** used throughout the codebase
- **Zod schemas** with `z.infer` for automatic type inference
- Type-safe API calls with proper error handling

### Form Management

- **React Hook Form** for performant form handling
- **Zod resolver** for schema-based validation
- `valueAsNumber` for numeric inputs to maintain type safety
- Dynamic form fields based on user interaction

### State Management

- **Local component state** for UI state
- **URL-derived state** for filters (sharable URLs)
- **In-memory Map** for product edits
- **localStorage** for mock authentication

### Performance Optimizations

- **Infinite Scroll Pagination** with Intersection Observer
  - Loads 12 products per page instead of all 100+
  - Automatic detection when user scrolls to bottom
  - Manual "Load More" button as fallback
  - Reduces initial load time by ~85%
- **Advanced Image Optimization**
  - Custom `ProductImage` component with intelligent loading
  - Skeleton loaders with pulse animation during image load
  - Smooth opacity transitions on image appearance
  - Error handling with fallback placeholder
  - Priority loading for critical images (first carousel image)
  - `loading="lazy"` for off-screen images
  - `decoding="async"` to prevent main thread blocking
- **Lazy loading images** with skeleton loaders
- **Pagination** - loads 12 products at a time
- **Memoization** with `useMemo` and `useCallback`
- **Async image decoding** for smoother UX

### Code Quality

- **ESLint 9** with TypeScript rules
- **Prettier** for consistent code formatting
- **Conventional structure** - clear separation of concerns
- **Semantic commits** - meaningful git history
- **Accessibility** - ARIA labels, keyboard navigation

## 🧪 Available Scripts

```bash
# Development
npm run dev          # Start dev server

# Building
npm run build        # TypeScript check + Vite build
npm run preview      # Preview production build

# Code Quality
npm run lint         # Check for linting errors
npm run lint:fix     # Auto-fix linting errors
npm run format       # Format code with Prettier
npm run format:check # Check formatting
npm run fix          # Run lint:fix + format
```

## 🔐 Mock Authentication

- Click **"Login"** button in the header to authenticate
- Authentication state persisted in `localStorage`
- Edit button appears on product detail pages when authenticated
- Automatic redirect to detail page if accessing edit without auth
- **"Logout"** redirects to product listing

## 📱 Responsive Design

- **Desktop** (1024px+) - Full sidebar with all filters visible
- **Tablet** (768-1023px) - Adjusted grid layout
- **Mobile** (<768px) - Floating filter button, drawer sidebar
- Touch-friendly UI elements
- Optimized image loading per device

## 🎨 UI/UX Features

- **Clean, modern design** with consistent spacing
- **Smooth animations** - fade-ins, transitions
- **Loading indicators** - spinners and skeleton screens
- **Error states** - friendly error messages
- **Empty states** - helpful messages when no products found
- **Image carousel** - navigate product images with arrows/thumbnails
- **Hover effects** - visual feedback on interactive elements

## ⏱️ Development Time

**Total: ~5 hours**

- Core functionality (listing, filtering): ~2 hours
- Detail & edit pages: ~1 hour
- Bonuses (URL params, mobile drawer): ~1 hour
- Performance optimizations (infinite scroll, image optimization): ~1 hour

## 🌟 Bonus Features Status

| Feature | Status | Description |
|---------|--------|-------------|
| URL Query Params | ✅ | Filters persist and restore on reload |
| Mobile Drawer | ✅ | Sidebar becomes drawer on mobile |
| Details Page | ✅ | Rich detail view with carousel |
| Edit Page | ✅ | Protected with mock auth |
| Infinite Scroll | ✅ | Auto-loads products with Intersection Observer |
| Image Optimization | ✅ | Custom component with lazy loading, skeletons, error handling |
| Accessibility | ✅ | ARIA labels + keyboard nav |

## 🔧 What Could Be Improved

Given more time, the following enhancements could be added:

### Features
- **Search suggestions** - Autocomplete for product search
- **Sort options** - Sort by price, rating, name
- **Product comparison** - Compare multiple products side-by-side
- **Wishlist/favorites** - Save favorite products
- **Cart functionality** - Add to cart with quantity

### Technical
- **TipTap Rich Text Editor** - For product description editing
- **Unit tests** - Vitest for components and hooks
- **E2E tests** - Playwright for critical user flows
- **Storybook** - Component documentation
- **React Query** - Better caching and data fetching
- **Virtual scrolling** - For very large product lists
- **Debounce** - For search input
- **Image CDN** - Optimized image delivery

### Performance
- **Code splitting** - Route-based lazy loading
- **Service Worker** - Offline support
- **Advanced image formats** - WebP with fallbacks
- **Image CDN integration** - For production use
- **Bundle analysis** - Optimize bundle size
- **Preload critical resources** - Faster initial load

### DevOps
- **CI/CD pipeline** - Automated testing and deployment
- **Docker** - Containerization
- **Monitoring** - Error tracking (Sentry)
- **Analytics** - User behavior tracking

## 🤖 AI Assistance
Claude AI assisted with:
- shadcn/ui component implementation
- Accessibility best practices (ARIA labels, semantic HTML)
- URL query params logic
- Intersection Observer for infinite scroll
- Code organization and best