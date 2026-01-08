# Project Architecture Documentation

This document provides a visual and detailed overview of the coding project, covering the Node.js Backend, React Frontend, and Angular Admin Panel.

## 1. High-Level Architecture

The system consists of three main parts:
1.  **Backend (Node.js/Express)**: Serves the REST API and matches the database.
2.  **Frontend (React)**: The main customer-facing e-commerce application.
3.  **Admin Panel (Angular)**: The management dashboard for administrators.

```mermaid
graph TD
    User((Customer))
    VendorUser((Merchant/Vendor))
    SuperAdmin((Platform Owner))

    subgraph Frontend_Layer [React & Angular Frontends]
        UI_User[React: Customer App] -->|Reads URL Slug| API
        UI_Vendor[React: Vendor Panel] -->|Private Dashboard| API
        UI_Admin[Angular: SuperAdmin] -->|Platform Controls| API
    end

    subgraph Node_Backend [Node.js Express Server]
        API[REST API Gateway] --> Auth[JWT & Role Middleware]
        Auth --> Tenant[Tenant Resolver Middleware]
        
        subgraph Logic_Layer [Business Logic]
            Tenant --> OrderSplit[Order Splitting Engine]
            Tenant --> ThemeSvc[Dynamic Theme Service]
            Tenant --> ProductSvc[Vendor-Scoped CRUD]
        end
    end

    subgraph Database_Layer [MongoDB Multi-Tenant]
        M_Vendors[(Vendors Collection)]
        M_Products[(Products Collection)]
        M_Orders[(Orders Collection)]
        M_Users[(Users Collection)]
    end

    %% External
    VendorUser -->|100 LE Payment| PayGate[Paymob / Fawry]
    PayGate -->|Webhook| API
```

---

## 2. Backend (Node.js)

**Location:** `/backend`

The backend is built with Node.js and Express, utilizing a centralized architecture with Routes, Controllers, and Models.

### Database Schema (Mongoose Models)

```mermaid
classDiagram
    class User {
        +String name
        +String email
        +String password
        +String role
    }
    class Product {
        +String title
        +String description
        +Number price
        +Number quantity
        +ObjectId category
        +ObjectId brand
    }
    class Category {
        +String name
        +String image
    }
    class Brand {
        +String name
        +String image
    }
    class Order {
        +ObjectId user
        +Array cartItems
        +Number totalOrderPrice
        +String paymentMethodType
        +Boolean isPaid
    }
    class Cart {
        +ObjectId user
        +Array cartItems
        +Number totalCartPrice
    }
    class Review {
        +String title
        +Number ratings
        +ObjectId user
        +ObjectId product
    }

    User "1" -- "*" Order : places
    User "1" -- "1" Cart : has
    User "1" -- "*" Review : writes
    Product "*" -- "1" Category : belongs to
    Product "*" -- "1" Brand : belongs to
    Product "1" -- "*" Review : has
    Order "*" -- "1" User : belongs to
```

### API Routes Structure

The backend exposes the following main route groups:

*   **Auth**: `/api/v1/auth` (Login, Register)
*   **Users**: `/api/v1/users`
*   **Products**: `/api/v1/products`
*   **Categories**: `/api/v1/categories`
*   **Brands**: `/api/v1/brands`
*   **Orders**: `/api/v1/orders`
*   **Cart**: `/api/v1/cart`
*   **Reviews**: `/api/v1/reviews`
*   **Coupons**: `/api/v1/coupons`
*   **Chat**: `/api/v1/chat`

---

## 3. Frontend (React)

**Location:** `/frontend`

Built with React, Vite, and Redux for state management. It uses a component-based structure.

### Component Structure

```mermaid
graph TD
    App[App.jsx] --> Header
    App --> Footer
    App --> Router[Router / Routes]

    subgraph Pages/Components
        Router --> Home
        Router --> Auth[Auth (Login/Register)]
        Router --> Product[Product Details/Overview]
        Router --> Collection[Collection/Shop]
        Router --> Cart
        Router --> User[User Profile]
        Router --> Wishlist
        Router --> Checkout
    end

    Header --> Search
    Header --> NavLinks
    
    Home --> ImageSlider
    Home --> CategorySwiper
```

### Key Directories
*   `src/components`: Contains all UI components grouped by feature (Auth, Cart, Product, etc.).
*   `src/redux`: Redux slices and store configuration (likely for Cart, User, and Product state).
*   `src/apis`: API integration logic.

---

## 4. Admin Panel (Angular)

**Location:** `/Admin`

Built with Angular (standalone components structure), focused on management features.

### Feature Modules

```mermaid
graph TD
    Root[AppComponent] --> AdminLayout
    
    subgraph Features
        AdminLayout --> Dashboard[Admin Dashboard]
        AdminLayout --> ProductConfig[Product Management]
        AdminLayout --> AuthConfig[Auth/Login]
        AdminLayout --> HomeConfig[Home Management]
    end

    ProductConfig --> AddProduct
    ProductConfig --> EditProduct
    ProductConfig --> ProductList
```

### Key Directories
*   `src/app/core`: Core services and implementing singleton pattern logic.
*   `src/app/features`: Main business logic modules.
    *   `auth`: Admin authentication.
    *   `admin`: Dashboard and main administration tools.
    *   `product`: Product CRUD operations.
*   `src/app/layout`: Structural components like Sidebar, Navbar.
*   `src/app/shared`: Reusable components and pipes.
