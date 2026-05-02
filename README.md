# Dragon News

A modern, full-stack news portal application built with cutting-edge web technologies. Dragon News provides a comprehensive platform for discovering, browsing, and reading news articles organized by category with user authentication and personalized content.

## Overview

Dragon News is a sophisticated news aggregation platform designed to deliver a seamless news consumption experience. Users can explore news articles by various categories, read detailed articles, and maintain personalized accounts with authentication.

## ✨ Features

- **Category-Based News Organization**: Browse news articles organized by multiple categories for easy discovery
- **User Authentication**: Secure user registration and login system with persistent sessions
- **News Details Page**: Comprehensive news article views with full content
- **Responsive Design**: Optimized user interface with Tailwind CSS and DaisyUI components
- **Dynamic Routing**: Fast page navigation using Next.js routing system
- **MongoDB Integration**: Persistent data storage with MongoDB and authentication adapter
- **Modern UI Components**: Beautiful, accessible UI built with Shadcn/ui and Radix UI
- **Rich Icons**: Extensive icon library with React Icons and Lucide React

## 🛠️ Tech Stack

### Frontend
- **Next.js** 16.2.4 - React framework with SSR and static generation
- **React** 19.2.4 - UI library for building interactive components
- **Tailwind CSS** 4.x - Utility-first CSS framework
- **DaisyUI** 5.5.19 - Tailwind CSS component library
- **Shadcn/ui** - High-quality, reusable components
- **Radix UI** 1.4.3 - Unstyled, accessible component library

### Backend & Database
- **Next.js API Routes** - Serverless API endpoints
- **MongoDB** 7.2.0 - NoSQL database
- **Better Auth** 1.6.9 - Authentication library
- **Better Auth MongoDB Adapter** 1.6.9 - MongoDB integration for authentication

### Additional Libraries
- **React Fast Marquee** 1.6.5 - Scrolling marquee component
- **React Icons** 5.6.0 - Icon library
- **Lucide React** 1.11.0 - Icon library
- **Date-fns** 4.1.0 - Date utility library
- **Tailwind Merge** 3.5.0 - Merge Tailwind CSS classes
- **Class Variance Authority** 0.7.1 - CSS-in-JS for variants

### Development
- **ESLint** 9 - Code linting
- **Babel React Compiler** 1.0.0 - React compilation optimization

## 📋 Prerequisites

Before running the project, ensure you have the following installed:

- **Node.js** 18.0.0 or higher
- **npm** or **yarn** package manager
- **MongoDB** instance (local or cloud)

## 🚀 Installation & Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd dragon-news
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env.local` file in the root directory and configure:
   ```env
   NEXT_PUBLIC_API_URL=<your-api-url>
   MONGODB_URI=<your-mongodb-connection-string>
   # Add other required environment variables
   ```

4. **Run the development server**
   ```bash
   npm run dev
   ```
   The application will be available at `http://localhost:3000`

## 📦 Available Scripts

- **`npm run dev`** - Start development server with hot reload
- **`npm run build`** - Build the application for production
- **`npm start`** - Start the production server
- **`npm run lint`** - Run ESLint code quality checks

## 📁 Project Structure

```
dragon-news/
├── src/
│   ├── app/
│   │   ├── layout.js              # Root layout
│   │   ├── globals.css            # Global styles
│   │   ├── (auth)/                # Auth routes
│   │   │   ├── login/
│   │   │   └── register/
│   │   ├── (main)/                # Main application routes
│   │   │   ├── page.jsx           # Home page
│   │   │   ├── about/             # About page
│   │   │   ├── career/            # Career page
│   │   │   ├── category/          # Category-based news
│   │   │   └── news/              # Individual news detail
│   │   └── api/                   # API routes
│   ├── components/
│   │   ├── LeftSidebar.jsx        # Left sidebar
│   │   ├── RightSidebar.jsx       # Right sidebar
│   │   ├── NewsCard.jsx           # News article card
│   │   ├── NewsDetail.jsx         # Detailed news view
│   │   ├── headline/              # Headline components
│   │   └── shared/                # Shared components
│   ├── lib/
│   │   ├── auth.js                # Backend authentication
│   │   ├── auth-client.js         # Client authentication
│   │   └── data.js                # Data utilities
│   └── assets/                    # Static assets
├── public/                        # Public static files
├── package.json
├── next.config.mjs
├── tailwind.config.js
├── postcss.config.mjs
└── README.md
```

## 🔐 Authentication

The application uses **Better Auth** for secure user authentication with MongoDB storage. Users can:
- Register new accounts
- Login with credentials
- Maintain persistent sessions
- Access protected news content

## 🎨 Styling

The project uses a modern styling approach:
- **Tailwind CSS** for utility-first styling
- **DaisyUI** for pre-built components and themes
- **Shadcn/ui** for high-quality accessible components
- Custom CSS for specific requirements

## 🚧 Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

**Note:** Currently optimized for desktop view. Mobile responsiveness is under development.

## 📝 License

This project is proprietary and confidential. All rights reserved.

## 👥 Contributing

Contributions are welcome! Please follow these guidelines:
1. Create a feature branch
2. Commit your changes with clear messages
3. Push to your branch
4. Submit a pull request

## 📧 Support

For issues, questions, or suggestions, please contact the development team or open an issue in the repository.

---

**Version:** 0.1.0  
**Last Updated:** May 2, 2026