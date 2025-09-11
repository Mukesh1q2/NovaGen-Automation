# NovaGen Automation Website

A modern, feature-rich industrial automation website built with Next.js 15, TypeScript, Tailwind CSS, and Prisma.

## Features Implemented

### 1. Enhanced Color Profile and Theme System
- Added extended color palette with primary, secondary, success, warning, and info colors
- Implemented light and dark theme support
- Customized Tailwind CSS configuration for consistent styling

### 2. AI-Powered Chatbot
- Intelligent chatbot with product knowledge base
- Natural language processing for customer queries
- Email integration for follow-up requests
- Quick question suggestions for common inquiries

### 3. Content Management System (CMS)
- Full-featured admin panel for managing products and categories
- User authentication system (demo: password `admin123`)
- Database integration with Prisma and SQLite
- REST API for frontend-backend communication
- Product management (create, read, update, delete)
- Category management

### 4. Additional Features
- Improved SEO with comprehensive metadata
- Enhanced accessibility features
- Responsive design for all device sizes
- Form validation for contact and quote forms
- Image optimization with Next.js Image component
- Search functionality
- Detailed product pages with specifications

## Tech Stack

- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS 4
- **UI Components**: shadcn/ui, Radix UI
- **Database**: SQLite with Prisma ORM
- **State Management**: React Context
- **Deployment**: Node.js server with Socket.IO

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd novagen-automation
```

2. Install dependencies:
```bash
npm install
```

3. Set up the database:
```bash
npm run db:generate
npm run db:migrate
npm run db:seed
```

4. Start the development server:
```bash
npm run dev
```

5. Access the application:
- Frontend: http://localhost:3000
- Admin Panel: http://localhost:3000/admin
- Admin Login (demo): password `admin123`

## Project Structure

```
src/
├── app/                 # Next.js App Router pages
│   ├── admin/          # Admin panel pages
│   ├── api/            # API routes
│   ├── products/       # Product pages
│   └── ...             # Other pages
├── components/         # Reusable React components
│   ├── layout/         # Layout components (Header, Footer)
│   ├── sections/       # Page sections
│   └── ui/             # shadcn/ui components
├── lib/                # Utility functions and services
└── styles/             # Global styles

prisma/
├── schema.prisma       # Database schema
└── seed.ts            # Database seeding script
```

## CMS Features

### Admin Panel Access
- URL: `/admin`
- Login: Use password `admin123` for demo access

### Product Management
- Add new products with detailed specifications
- Edit existing products
- Manage product categories
- Set pricing and inventory information

### Content Management
- Create and edit pages
- Manage navigation menus
- Update site settings

## Chatbot Capabilities

The AI chatbot can assist with:
- Product information and specifications
- Company details and contact information
- Technical support queries
- Quote requests
- General inquiries

## Database Schema

The Prisma schema includes:
- Product categories
- Products with specifications
- Pages
- Users (for admin access)

## Deployment

For production deployment:
1. Build the application:
```bash
npm run build
```

2. Start the production server:
```bash
npm start
```

## Customization

### Theme Colors
Modify color variables in:
- `src/app/globals.css`
- `tailwind.config.ts`

### Chatbot Knowledge Base
Update product information in:
- `src/lib/chatbotUtils.ts`

### CMS Content
Manage through the admin panel or directly in the database.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a pull request

## Support

For support, contact:
- Email: info@novagenautomation.com
- Phone: +91 98786-28680

## License

This project is proprietary to NovaGen Automation.