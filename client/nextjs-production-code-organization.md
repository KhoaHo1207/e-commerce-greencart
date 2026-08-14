# Next.js Production Code Organization Guide

## 1. Project Stack

This project uses:

- Next.js App Router
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- TanStack Query
- Zustand
- Zod
- React

The architecture should favor:

- Feature-based organization
- Clear Server Component / Client Component boundaries
- Separation between server state and client state
- Small and composable components
- Minimal global state
- Avoiding unnecessary abstractions

---

# 2. Recommended Project Structure

```text
src/
├── app/
│   ├── (auth)/
│   │   ├── login/
│   │   │   └── page.tsx
│   │   └── register/
│   │       └── page.tsx
│   │
│   ├── (dashboard)/
│   │   ├── dashboard/
│   │   │   └── page.tsx
│   │   ├── products/
│   │   │   ├── page.tsx
│   │   │   └── [id]/
│   │   │       └── page.tsx
│   │   └── layout.tsx
│   │
│   ├── api/
│   │   └── ...
│   │
│   ├── layout.tsx
│   ├── page.tsx
│   ├── providers.tsx
│   └── globals.css
│
├── components/
│   ├── ui/
│   │   └── ...
│   │
│   ├── layout/
│   │   ├── header.tsx
│   │   ├── sidebar.tsx
│   │   └── footer.tsx
│   │
│   └── shared/
│       ├── loading.tsx
│       ├── error-state.tsx
│       └── empty-state.tsx
│
├── features/
│   ├── auth/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   ├── stores/
│   │   └── types/
│   │
│   ├── products/
│   │   ├── api/
│   │   ├── components/
│   │   ├── hooks/
│   │   ├── schemas/
│   │   ├── stores/
│   │   └── types/
│   │
│   └── cart/
│       ├── api/
│       ├── components/
│       ├── stores/
│       └── types/
│
├── lib/
│   ├── api/
│   │   ├── client.ts
│   │   └── server.ts
│   │
│   ├── auth/
│   │   └── session.ts
│   │
│   ├── query/
│   │   ├── query-client.ts
│   │   └── query-keys.ts
│   │
│   ├── constants.ts
│   └── utils.ts
│
├── hooks/
│   ├── use-debounce.ts
│   ├── use-media-query.ts
│   └── use-mounted.ts
│
├── types/
│   ├── api.ts
│   └── common.ts
│
├── config/
│   ├── env.ts
│   └── site.ts
│
└── middleware.ts
```

---

# 3. Architecture Rules

## 3.1 `app/` is responsible for routing

The `app/` directory should primarily contain:

- Routes
- Layouts
- Loading UI
- Error UI
- Metadata
- Route handlers
- Server-side composition

Keep route files thin.

Preferred:

```tsx
import { ProductList } from "@/features/products/components/product-list";

export default function ProductsPage() {
  return <ProductList />;
}
```

Avoid putting large amounts of:

- business logic
- API logic
- Zustand logic
- validation
- complex UI
- reusable logic

directly inside `page.tsx`.

---

# 4. Feature-Based Architecture

Business functionality belongs under `features/`.

Examples:

```text
features/
├── auth/
├── products/
├── categories/
├── cart/
├── orders/
├── checkout/
├── payments/
├── reviews/
└── admin/
```

A feature owns the code directly related to that domain.

Example:

```text
features/products/
├── api/
├── components/
├── hooks/
├── schemas/
├── stores/
└── types/
```

Do NOT create every folder automatically.

Only create a folder when the feature actually needs it.

For example:

```text
features/categories/
├── api/
├── hooks/
└── types/
```

is better than creating empty:

```text
components/
hooks/
schemas/
stores/
types/
```

---

# 5. `features/*/api`

Put feature-specific API functions here.

Example:

```text
features/products/api/
├── get-products.ts
├── get-product.ts
├── create-product.ts
├── update-product.ts
└── delete-product.ts
```

These functions should be responsible for communicating with the backend/API.

Do not put API calls directly inside UI components unless there is a strong reason.

---

# 6. `features/*/components`

Put components that belong specifically to a feature here.

Examples:

```text
features/products/components/
├── product-card.tsx
├── product-list.tsx
├── product-form.tsx
└── product-filter.tsx
```

A product-specific component belongs here, not in `components/shared`.

---

# 7. `features/*/hooks`

Put feature-specific React hooks here.

Examples:

```text
features/products/hooks/
└── use-products.ts
```

Example:

```tsx
"use client";

import { useQuery } from "@tanstack/react-query";
import { getProducts } from "../api/get-products";

export function useProducts() {
  return useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
  });
}
```

Generic hooks that can be reused by unrelated features belong in:

```text
src/hooks/
```

---

# 8. `features/*/schemas`

Put Zod schemas that belong to the feature here.

Example:

```text
features/products/schemas/
└── product.schema.ts
```

Example:

```ts
import { z } from "zod";

export const productSchema = z.object({
  name: z.string().min(1),
  price: z.number().positive(),
});
```

Keep validation close to the domain it validates.

---

# 9. `features/*/stores`

Put Zustand stores here.

Example:

```text
features/cart/stores/
└── cart.store.ts
```

Use Zustand for global client state when state needs to be shared across unrelated components.

Example:

```ts
import { create } from "zustand";

type CartItem = {
  id: string;
  quantity: number;
};

type CartStore = {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
};

export const useCartStore = create<CartStore>((set) => ({
  items: [],

  addItem: (item) =>
    set((state) => ({
      items: [...state.items, item],
    })),

  removeItem: (id) =>
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    })),
}));
```

Do not create one huge global store.

Prefer multiple small domain-specific stores.

---

# 10. `features/*/types`

Put feature-specific TypeScript types here.

Example:

```text
features/products/types/
└── product.types.ts
```

Avoid putting every type into one global `types/index.ts`.

Types that only belong to a feature should stay inside that feature.

---

# 11. `components/ui`

This directory is for shadcn/ui components and generic UI primitives.

Examples:

```text
components/ui/
├── button.tsx
├── input.tsx
├── dialog.tsx
├── select.tsx
├── dropdown-menu.tsx
└── ...
```

These components should be generic and reusable.

Do not put business-specific components here.

Bad:

```text
components/ui/product-card.tsx
components/ui/cart.tsx
components/ui/order-table.tsx
```

Good:

```text
components/ui/button.tsx
components/ui/dialog.tsx
components/ui/input.tsx
```

Business-specific components belong under `features/`.

---

# 12. `components/shared`

This directory contains reusable components that are not tied to a single business feature.

Examples:

```text
components/shared/
├── loading.tsx
├── error-state.tsx
├── empty-state.tsx
├── pagination.tsx
└── confirm-dialog.tsx
```

Use this directory only when a component is genuinely shared across multiple features.

---

# 13. `components/layout`

Put global layout components here.

Examples:

```text
components/layout/
├── header.tsx
├── sidebar.tsx
├── footer.tsx
└── mobile-nav.tsx
```

These components should generally not contain feature-specific business logic.

---

# 14. `lib/`

`lib/` is for infrastructure, framework integration, utilities, and shared technical code.

It is NOT a dumping ground for business logic.

Recommended:

```text
lib/
├── api/
│   ├── client.ts
│   └── server.ts
├── auth/
│   └── session.ts
├── query/
│   ├── query-client.ts
│   └── query-keys.ts
├── constants.ts
└── utils.ts
```

Examples:

- API client
- authentication helpers
- QueryClient configuration
- utility functions
- shared constants

Business-specific code should generally live under `features/`.

---

# 15. `hooks/`

Only put generic reusable hooks here.

Examples:

```text
hooks/
├── use-debounce.ts
├── use-media-query.ts
├── use-mounted.ts
└── use-mobile.ts
```

If a hook belongs to one feature:

```text
features/products/hooks/use-products.ts
```

not:

```text
hooks/use-products.ts
```

---

# 16. State Management Rules

Do not use one state-management solution for everything.

Use the following rules.

## Local component state

Use:

```tsx
useState()
useReducer()
```

for state that only belongs to one component or a small component subtree.

Examples:

- input state
- dropdown open state
- local tab selection
- temporary UI state

---

## Global client state

Use Zustand when state must be shared across distant client components.

Examples:

- shopping cart
- wishlist
- checkout UI state
- global client preferences
- complex UI state

Example:

```text
features/cart/stores/cart.store.ts
```

---

## Server state

Use TanStack Query for client-side server data.

Examples:

- products
- orders
- users
- reviews
- categories
- notifications fetched from API

Do not duplicate TanStack Query data into Zustand without a clear reason.

Bad:

```text
API
 ↓
TanStack Query
 ↓
Zustand
 ↓
Component
```

Prefer:

```text
API
 ↓
TanStack Query
 ↓
Component
```

---

## URL state

Use URL search parameters for state that should be shareable/bookmarkable.

Examples:

```text
/products?category=shoes
/products?page=2
/products?sort=price
/products?search=iphone
```

Do not put URL state into Zustand unless there is a specific reason.

---

## Theme

Use `next-themes` rather than creating a custom global theme context.

---

## Authentication/session

Prefer server-side authentication/session handling.

Do not automatically create an `AuthContext` that fetches `/api/me` and becomes the source of truth if the authentication system already provides server-side session access.

---

# 17. TanStack Query

Global configuration:

```text
lib/query/
├── query-client.ts
└── query-keys.ts
```

Feature-specific queries:

```text
features/
├── products/hooks/use-products.ts
├── orders/hooks/use-orders.ts
└── users/hooks/use-users.ts
```

The QueryClient should be provided from:

```text
app/providers.tsx
```

Example:

```tsx
"use client";

import { QueryClientProvider } from "@tanstack/react-query";
import { makeQueryClient } from "@/lib/query/query-client";

const queryClient = makeQueryClient();

export function Providers({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}
```

---

# 18. `providers.tsx`

`app/providers.tsx` should be a Client Component.

Use it for providers that must exist at the application level.

Examples:

- TanStack Query
- Theme provider
- Other client-side providers

Keep `app/layout.tsx` as a Server Component whenever possible.

Preferred architecture:

```text
app/layout.tsx
      |
      v
app/providers.tsx
      |
      +-- QueryClientProvider
      |
      +-- ThemeProvider
      |
      +-- Other client providers
```

Do not add `"use client"` to `layout.tsx` just because a child provider is a Client Component.

---

# 19. Server Components vs Client Components

This project uses Next.js App Router.

Default to Server Components.

Only add:

```tsx
"use client";
```

when the component actually needs client-side functionality.

Typical reasons:

- `useState`
- `useEffect`
- Zustand hooks
- TanStack Query hooks
- browser APIs
- event handlers that require client execution
- interactive UI

Do NOT mark entire routes or entire feature folders as Client Components unnecessarily.

Prefer:

```text
Server Page
    |
    +-- Server Components
    |
    +-- Client interactive components
```

instead of:

```text
"use client"
Entire page tree
```

---

# 20. Avoid Over-Engineering

Do not introduce abstractions only because they look "enterprise".

Avoid creating unnecessary layers such as:

```text
components/
services/
repositories/
managers/
adapters/
facades/
factories/
```

unless the project actually needs them.

For example, for a simple API request:

```text
features/products/api/get-products.ts
```

is enough.

Do not create:

```text
ProductRepository
ProductService
ProductManager
ProductAdapter
ProductFacade
```

without a concrete architectural reason.

---

# 21. Dependency Direction

Prefer this dependency direction:

```text
app
 ↓
features
 ↓
lib
```

and:

```text
components/shared
components/ui
```

should remain generic.

Avoid making low-level shared components depend on business features.

Bad:

```text
components/ui/button.tsx
    ↓
features/products
```

Good:

```text
features/products/components/product-card.tsx
    ↓
components/ui/button.tsx
```

The feature can depend on shared UI, but generic UI should not depend on a feature.

---

# 22. Import Aliases

Use the `@/` alias consistently.

Good:

```ts
import { Button } from "@/components/ui/button";
import { useCartStore } from "@/features/cart/stores/cart.store";
import { cn } from "@/lib/utils";
```

Avoid unnecessary relative imports that traverse many directories:

```ts
import { cn } from "../../../../lib/utils";
```

---

# 23. Barrel Files

Do not create `index.ts` files everywhere by default.

Use barrel files only when they improve the public API of a module.

Avoid:

```text
features/products/
├── index.ts
├── api/index.ts
├── components/index.ts
├── hooks/index.ts
└── types/index.ts
```

if they provide no real benefit.

Prefer direct imports when clearer:

```ts
import { ProductCard } from "@/features/products/components/product-card";
```

---

# 24. Naming Conventions

Use:

```text
kebab-case
```

for file names.

Examples:

```text
product-card.tsx
use-products.ts
product.schema.ts
cart.store.ts
query-client.ts
```

React component names:

```tsx
ProductCard
ProductList
CartDrawer
```

Hooks:

```tsx
useProducts
useCart
useDebounce
```

Zustand stores:

```tsx
useCartStore
useProductFilterStore
```

---

# 25. Feature Example

For an e-commerce Product feature:

```text
features/products/
├── api/
│   ├── get-product.ts
│   ├── get-products.ts
│   ├── create-product.ts
│   └── update-product.ts
│
├── components/
│   ├── product-card.tsx
│   ├── product-list.tsx
│   ├── product-form.tsx
│   └── product-filter.tsx
│
├── hooks/
│   ├── use-product.ts
│   └── use-products.ts
│
├── schemas/
│   └── product.schema.ts
│
├── stores/
│   └── product-filter.store.ts
│
└── types/
    └── product.types.ts
```

Route:

```text
app/(dashboard)/products/page.tsx
```

should remain thin:

```tsx
import { ProductList } from "@/features/products/components/product-list";

export default function ProductsPage() {
  return <ProductList />;
}
```

---

# 26. Agent Rules

When modifying this project, follow these rules:

1. Prefer existing project patterns over introducing new patterns.
2. Inspect the relevant feature before creating new files.
3. Put business-specific code under `features/<feature-name>/`.
4. Keep `app/` route files thin.
5. Do not put business logic inside `components/ui`.
6. Use shadcn components from `components/ui`.
7. Use Zustand only for client-side global state.
8. Use TanStack Query for server/API state.
9. Do not duplicate server state into Zustand without a clear reason.
10. Use `useState` for local component state.
11. Use URL search params for shareable/filterable URL state.
12. Prefer Server Components by default.
13. Add `"use client"` only when required.
14. Do not add `"use client"` to `layout.tsx` unnecessarily.
15. Keep generic hooks in `src/hooks/`.
16. Keep feature-specific hooks inside the relevant feature.
17. Keep feature-specific types inside the feature.
18. Keep infrastructure code inside `lib/`.
19. Avoid unnecessary service/repository/manager abstractions.
20. Do not create empty folders just for consistency.
21. Do not create barrel `index.ts` files unless they provide a clear benefit.
22. Use `@/` imports consistently.
23. Follow existing naming and formatting conventions.
24. Before adding a dependency, check whether the project already has a solution.
25. Before creating a new global store, verify that the state truly needs to be global.
26. Do not move code between Server and Client Components without understanding the implications.
27. Preserve existing behavior unless the task explicitly asks for behavioral changes.
28. Prefer the smallest clean change that solves the problem.

---

# 27. Decision Tree

When adding new code, use this decision tree:

```text
Is it a route?
    |
    +-- Yes → app/
    |
    +-- No
         |
         v
Is it specific to one business feature?
    |
    +-- Yes → features/<feature>/
    |
    +-- No
         |
         v
Is it a generic UI component?
    |
    +-- Yes → components/ui or components/shared
    |
    +-- No
         |
         v
Is it a generic hook?
    |
    +-- Yes → hooks/
    |
    +-- No
         |
         v
Is it infrastructure/utility/configuration?
    |
    +-- Yes → lib/ or config/
```

For state:

```text
Does it come from the server?
    |
    +-- Yes → Server Component / TanStack Query
    |
    +-- No
         |
         v
Does it need to be global across client components?
    |
    +-- Yes → Zustand
    |
    +-- No
         |
         v
Can it be represented in the URL?
    |
    +-- Yes → searchParams
    |
    +-- No → useState / useReducer
```

---

# 28. Final Architecture Principle

The project should follow this mental model:

```text
                    Next.js App
                         |
                ┌────────┴────────┐
                |                 |
              app/            components/
                |                 |
             Routing         Shared UI
                |
                v
            features/
                |
       ┌────────┼────────┐
       |        |        |
      API      UI      State
       |        |        |
       |        |      Zustand
       |
       v
   Server/API
       |
       v
 TanStack Query

lib/
  |
  +-- infrastructure
  +-- utilities
  +-- auth
  +-- query
```

The goal is not to create the maximum number of folders.

The goal is:

- clear ownership
- predictable imports
- isolated features
- minimal global state
- reusable UI
- clear server/client boundaries
- easy maintenance
- easy onboarding for new developers
- minimal unnecessary abstraction
