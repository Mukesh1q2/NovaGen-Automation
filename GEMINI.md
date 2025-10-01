# Gemini Project Context: NovaGen Automation Website

## Project Overview

This is a modern, feature-rich industrial automation website built with Next.js 15, TypeScript, and Tailwind CSS. It includes an AI-powered chatbot, a full-featured admin panel for content management, and a comprehensive set of UI components. The project uses Prisma as its ORM for database interaction with a SQLite database.

### Key Technologies:

*   **Framework:** Next.js 15 (App Router)
*   **Language:** TypeScript
*   **Styling:** Tailwind CSS 4 with shadcn/ui components
*   **Database:** SQLite with Prisma ORM
*   **State Management:** React Context and Zustand
*   **Deployment:** Node.js server with Socket.IO for real-time communication

## Building and Running

### Prerequisites

*   Node.js 18+
*   npm or yarn

### Installation and Setup

1.  **Install dependencies:**
    ```bash
    npm install
    ```

2.  **Set up the database:**
    ```bash
    npm run db:generate
    npm run db:migrate
    npm run db:seed
    ```

### Running the Application

*   **Development:**
    ```bash
    npm run dev
    ```
    This command starts the development server with `nodemon`, which watches for changes in `server.ts` and the `src` directory. The application will be available at `http://localhost:3000`.

*   **Production:**
    ```bash
    npm run build
    npm start
    ```

### Testing

The `package.json` includes a linting script:

```bash
npm run lint
```

There are no explicit testing scripts defined in the `package.json`.

## Development Conventions

*   **Styling:** The project uses Tailwind CSS with a custom theme defined in `tailwind.config.ts` and global styles in `src/app/globals.css`. UI components are built with `shadcn/ui`.
*   **Database:** The database schema is managed with Prisma in `prisma/schema.prisma`. Migrations are handled by `prisma migrate`.
*   **API:** API routes are located in the `src/app/api` directory.
*   **Chatbot:** The chatbot's logic and knowledge base are located in `src/lib/chatbotUtils.ts`.
*   **Admin Panel:** The admin panel is available at `/admin` and requires a password (`admin123` for demo).

## Key Files

*   `next.config.ts`: Next.js configuration.
*   `tailwind.config.ts`: Tailwind CSS configuration.
*   `prisma/schema.prisma`: Database schema definition.
*   `server.ts`: Custom Node.js server with Socket.IO.
*   `src/app/layout.tsx`: The main layout of the application.
*   `src/lib/chatbotUtils.ts`: Logic for the AI-powered chatbot.
*   `src/lib/db.ts` and `src/lib/dbService.ts`: Database connection and service functions.
