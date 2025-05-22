# smart_cl backend (SMART)
 
A LoopBack4 application for managing tires.

## Key Features

*   Track tire inventory
*   Monitor tire performance
*   Manage tire maintenance schedules
*   Export data to Excel

## Project Structure

The project is organized as follows:

*   `src/`: Contains the core application logic.
    *   `SMART_EXCEL_EXPORT/`: Handles Excel export functionality.
    *   `__tests__/`: Contains tests for the application.
    *   `controllers/`: Defines the API endpoints.
    *   `datasources/`: Configures data sources for the application.
    *   `models/`: Defines the data structures (entities).
    *   `repositories/`: Handles data access and manipulation.
    *   `utils/`: Contains utility functions.
    *   `application.ts`: The main LoopBack application class. Configures middleware, components, and other application settings.
    *   `auth.ts`: Implements the authentication strategy using JWT and role-based access control.
    *   `index.ts`: Exports modules for convenience.
    *   `migrate.ts`: Handles database migrations.
    *   `sequence.ts`: Defines the custom request-response sequence.
*   `public/`: Contains static assets for the default home page.
*   `uploads/`: Directory for storing uploaded images.
*   `package.json`: Lists project dependencies and scripts.

## Authentication

This application uses JSON Web Tokens (JWT) for authentication.
*   The `src/auth.ts` file implements the authentication strategy.
*   It uses a `@secured` decorator to control access to API endpoints based on authentication status and user roles (e.g., `IS_AUTHENTICATED`, `HAS_ANY_ROLE`, `HAS_ROLES`).
*   Custom providers (`MyAuthActionProvider`, `MyAuthAuthenticationStrategyProvider`, `MyAuthMetadataProvider`) are configured in `src/application.ts` to handle the authentication flow.

## API Endpoints

The API endpoints are defined in the `src/controllers/` directory. Each controller typically corresponds to a specific resource or a set of related operations.
You might be able to explore the available API endpoints and their request/response formats using a tool like Swagger UI, typically available at `/explorer` if the `RestExplorerComponent` is enabled in `src/application.ts` (currently commented out).

## Database

Database migrations are handled by the `src/migrate.ts` script. This script is responsible for applying schema changes and ensuring the database is up-to-date.

## Error Handling

The application is configured to provide detailed error messages in development mode. The `RestBindings.ERROR_WRITER_OPTIONS` in `src/application.ts` is set to `{debug: true}` which can be helpful for troubleshooting. For production, this setting should be reviewed for security.

## Installation

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```

## Usage

1.  Build the application:
    ```bash
    npm run build
    ```
2.  Start the application:
    ```bash
    npm start
    ```

## Testing

Run the test suite:
```bash
npm test
```

## Linting and Formatting

Check for linting and formatting issues:
```bash
npm run lint
```

Fix linting and formatting issues:
```bash
npm run lint:fix
```
