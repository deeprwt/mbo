# Manage MBO Frontend

A modern, scalable, and maintainable React + TypeScript + Vite application for Managed Business Organization (MBO) management, using Material UI, robust context/hooks architecture, and best practices for enterprise-grade frontend development.

---

## Project Structure

```
src/
│
├── apis/                # API layer (axios configs, API modules)
│   ├── authApi.ts
│   ├── roleApi.ts
│   ├── userApi.ts
│   └── axiosConfig.ts
│
├── assets/              # Static assets (images, svgs, etc.)
│
├── components/          # Reusable UI components (each in its own directory)
│   ├── Sidenav/
│   ├── WelcomeCard/
│   ├── SummaryCard/
│   ├── DealerChart/
│   ├── QuickActionCard/
│   ├── MBOCard/
│   ├── MBOStatusCard/
│   ├── MBOFormSection/
│   ├── MBOFileAttachment/
│   └── RolesAndUsersSection/
│
├── constants/           # App-wide constants (API endpoints, roles, etc.)
│   ├── api.ts
│   ├── roles.ts
│   └── wallet.ts
│
├── contexts/            # React Contexts for global state (auth, roles, notifications, permissions, etc.)
│   ├── AuthContext.tsx
│   ├── NotificationContext.tsx
│   ├── PermissionContext.tsx
│   ├── RolesContext.tsx
│   ├── UsersContext.tsx
│   ├── useAuth.ts
│   ├── useNotification.ts
│   └── index.tsx
│
├── hooks/               # Custom React hooks (business logic, data fetching, etc.)
│   ├── useAuthActions.ts
│   ├── useRoleActions.ts
│   ├── useUserActions.ts
│   ├── useUserData.ts
│   ├── useRequireAuth.ts
│   └── index.ts
│
├── layouts/             # Layout components (e.g., DashboardLayout)
│   └── DashboardLayout/
│
├── pages/               # Top-level pages (each as a directory)
│   ├── home/
│   ├── login/
│   ├── mbo-management/
│   ├── MBOManagementDetailsPage/
│   └── unauthorized/
│
├── routes/              # Route definitions and guards
│   ├── ProtectedRoute.tsx
│   ├── PublicRoute.tsx
│   └── index.tsx
│
├── services/            # Business logic and API service wrappers
│   ├── AuthService.ts
│   ├── DealershipService.ts
│   ├── MBOService.ts
│   ├── RoleService.ts
│   ├── UserService.ts
│   └── index.ts
│
├── types/               # TypeScript types and interfaces
│   ├── auth.ts
│   ├── common.ts
│   ├── index.ts
│   └── models.ts
│
├── utils/               # Utility functions and helpers
│
├── theme.ts             # Material UI theme customization
├── App.tsx              # Main app component
├── main.tsx             # App entry point
├── App.css              # Global styles
├── index.css            # Tailwind or global CSS
└── vite-env.d.ts        # Vite/TypeScript env types
```

---

## Installation & Running

### Prerequisites

- Node.js (v18+ recommended)
- npm (v9+) or yarn

### 1. Install dependencies

```bash
npm install
# or
yarn install
```

### 2. Development server

Start the Vite development server:

```bash
npm run dev
# or
yarn dev
```

- The app will be available at [http://localhost:5173](http://localhost:5173) (or the port shown in your terminal).

### 3. Linting

- **Show lint issues (warnings allowed, no errors):**
  ```bash
  npm run lint:warn
  # or
  yarn lint:warn
  ```
- **Auto-fix lint issues:**
  ```bash
  npm run lint:fix
  # or
  yarn lint:fix
  ```

### 4. Build for production

```bash
npm run build
# or
yarn build
```

### 5. Preview production build

```bash
npm run preview
# or
yarn preview
```

---

## Key Conventions & Best Practices

- **Component organization:** Each component/page is a directory with its own `index.ts` and main `.tsx` file.
- **Context separation:** All global state (auth, roles, notifications, permissions) is managed via React Contexts in `src/contexts`.
- **Hooks:** All business/data logic is encapsulated in custom hooks in `src/hooks`.
- **Type safety:** All types/interfaces are in `src/types`.
- **API/services:** All API logic is in `src/services` and `src/apis`.
- **Pixel-perfect, mobile-friendly UI:** Built with Material UI v7, using a custom theme and design tokens.
- **Routing:** Uses React Router v7 with protected/public route guards.
- **Linting:** ESLint with TypeScript and React best practices, with scripts for both fixing and reporting issues.

---

## Additional Notes

- **Environment variables:** If you use environment variables, add a `.env` file at the root (see Vite docs).
- **Extending ESLint:** See the comments in the default `README.md` for how to enable stricter or more type-aware linting.
- **Contributing:** Follow the established folder and code structure for all new features.

---
