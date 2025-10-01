# Task List: NovaGen Automation Website

This document lists the identified issues, and areas for improvement in the codebase. The tasks are categorized by priority.

## Critical Issues

*   **Insecure CORS Policy:** The Socket.IO server in `server.ts` is configured with `origin: "*"`, which allows connections from any origin. This is a major security vulnerability and should be restricted to the production domain.
*   **Improper Data Storage:** In `lib/dbService.ts`, the `createProduct` and `updateProduct` functions store images and tags as JSON strings in the database. This is a poor design choice that will make querying and managing the data difficult. The database schema should be updated to include separate tables for images and tags with a foreign key relationship to the `Product` table.
*   **Lack of Type Safety:** The database service functions in `lib/dbService.ts` use `any` as the type for the `data` parameter. This undermines TypeScript's type safety and can lead to runtime errors. Zod schemas or interfaces should be used to define the shape of the data.

## High Priority

*   **Outdated Dependencies:** The project has several outdated dependencies, as identified by `npm outdated`. These should be updated to their latest versions to ensure security and stability. Special attention should be paid to major version bumps, such as `uuid` and `recharts`.

## Medium Priority

*   **Unused `eslint-disable` Directive:** The file `src/hooks/use-toast.ts` contains an unused `eslint-disable` directive. This should be removed.
*   **Basic Error Handling:** The error handling in `server.ts` is very basic. A more robust logging and error reporting mechanism (e.g., Sentry, LogRocket) should be implemented to better track and diagnose issues in production.

## Low Priority

*   **No Automated Testing:** The project lacks an automated testing suite. Unit and integration tests should be written to ensure the reliability of the application and prevent regressions.
