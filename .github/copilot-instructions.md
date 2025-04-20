# GitHub Copilot Instructions for Maison Fontalba Project

Use these guidelines to prompt and guide GitHub Copilot effectively when working on the Maison Fontalba portfolio and admin dashboard in Next.js 14.

---

## 1. Technology Stack & Architecture

- **Framework**: Next.js 14 with the App Router
  - Follow the `/app` directory convention strictly.
- **Database & Auth**: Supabase JS SDK
  - Include prompts for Copilot to import and initialize `@supabase/supabase-js`.
- **Environment**: Store credentials in `.env`
  - Prompt Copilot to reference `process.env` variables only.
- **Rendering**:
  - SSR for dynamic pages and SSG (with ISR) for portfolio pages.
  - Ask Copilot to scaffold `getServerSideProps`, `getStaticProps`, and `getStaticPaths` appropriately.
- **Images**:
  - Use `next/image` exclusively.
  - Prompt Copilot to import and configure `Image` from `next/image`.

## 2. TypeScript Best Practices

- Enable **strict** mode in `tsconfig.json`.
  - Prompt: _“Create tsconfig.json with `"strict": true` and full type-checking options.”_
- **Explicit Types & Interfaces**:
  - Ask Copilot for interfaces on props, API responses, and Supabase returns.
  - Avoid `any`; instead, request specific types.
- **Utility Types**:
  - Use `Pick`, `Omit`, `Partial` where helpful.
  - Prompt: _“Use `Omit<…>` to exclude sensitive fields from API response types.”_

## 3. TailwindCSS Best Practices

- Prefer **utility classes** over custom CSS.
  - Prompt Copilot: _“Use Tailwind utilities for spacing, typography, and layout.”_
- Create reusable compositions with `@apply`.
  - Prompt: _“Generate a CSS module using `@apply` for button styles.”_
- **Theme Configuration** in `tailwind.config.js`:
  ```js
  module.exports = {
    theme: {
      colors: {
        primary: '#edede9',
        secondary: '#d6ccc2',
        accent: '#f5ebe0',
        muted: '#e3d5ca',
        neutral: '#d5bdaf',
      },
      screens: { sm: '640px', md: '768px', lg: '1024px', xl: '1280px' },
    },
    mode: 'jit',
  }
  ```
  - Prompt Copilot to respect these values.
- **Mobile-first** design: start with `sm` and scale up.

## 4. Directory & Naming Conventions

- **Structure**:
  - `/components/ui` – reusable UI (Buttons, Cards)
  - `/components/features` – page-specific components
  - `/lib` – utilities and integrations
  - `/types` – shared interfaces
- **Filenames**: `kebab-case` (e.g. `project-card.tsx`)
- **Component Names**: `PascalCase` (e.g. `ProjectCard`)

## 5. Component Design & Organization

- Components should be **small**, **focused**, and **composable**.
- **File Template** prompt:
  ```tsx
  /**
   * [ComponentName]
   * Description: …
   */
  import React from 'react';

  interface [ComponentName]Props { /* … */ }

  const [ComponentName]: React.FC<[ComponentName]Props> = ({ /* … */ }) => {
    // Hooks: useState, useEffect, useMemo
    return (
      <div>…</div>
    );
  };

  export default [ComponentName];
  ```
- Prompt Copilot to include the comment block and explicit props interface.

## 6. Copilot Agent Mode Rules

1. **Type Definitions**
   - Prompt Copilot: _“Define an interface for the Supabase row: X.”_
2. **Tailwind Utilities**
   - Ask first: _“Suggest Tailwind class names for this layout instead of custom CSS.”_
3. **Type Annotation Review**
   - Request: _“Refine these types for API client responses.”_

## 7. CLI & NPM Scripts

- **Terminal**: Default to **CMD** on Windows.
- **package.json scripts**:
  ```jsonc
  "scripts": {
    "dev": "next dev",
    "build": "next build",
    "lint": "next lint",
    "type-check": "tsc --noEmit",
    "test": "jest"
  }
  ```
- Prompt Copilot to insert or update these scripts.

## 8. ESLint & Prettier

- **ESLint**: Extend `next` and `next/core-web-vitals`.
  - Prompt: _“Generate an `.eslintrc.json` using Next.js recommended rules.”_
- **Prettier**:
  ```json
  {
    "semi": true,
    "singleQuote": true,
    "printWidth": 100,
    "tabWidth": 2,
    "trailingComma": "es5"
  }
  ```
  - Prompt Copilot to respect this when formatting code.

## 9. Testing & Debugging

- **Framework**: Jest + React Testing Library.
- Prompt Copilot: _“Generate a basic test file for [ComponentName] covering rendering and props.”_
- **CI**: Run `npm test` on each commit.

## 10. Performance & Optimization

- **Images**: Use `next/image` with `priority` and `lazy` flags.
- **Tailwind JIT**: Enable purge to remove unused styles.
- **Dynamic Imports**: Prompt: _“Use Next.js `dynamic()` for [ComponentName] to lazy load.”_

## 11. Deployment & CI/CD

- **GitHub Actions**:
  - Workflow triggers on `push` to `main`.
  - Steps:
    1. Checkout code
    2. Install dependencies
    3. Run `npm run lint` and `npm run type-check`
    4. Build and deploy to Vercel
  - Prompt Copilot: _“Generate `.github/workflows/deploy.yml` for Next.js on Vercel.”_

---

Tailor your prompts to Copilot using the snippets above to ensure consistency, type safety, and adherence to Maison Fontalba’s design system.
