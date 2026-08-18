# client/ — map cho agent

Next.js 16 App Router · React 19 · TS · Tailwind 4 · shadcn · Zod  
Alias `@/` = `client/` (không có `src/`).  
**Route → `app/`. Nghiệp vụ → `features/<x>/`. UI generic → `components/`. Hạ tầng → `lib/`.**  
`page.tsx` mỏng. Không tạo folder trống. Không barrel `index.ts` trừ public API thật sự cần. Không `"use client"` trừ khi cần state/event/hook/browser API.

---

## Đặt file mới

```text
URL / layout / metadata / loading / 404     → app/
1 nghiệp vụ (auth, products, cart, …)       → features/<feature>/
  UI feature                                → …/components/
  hook feature                              → …/hooks/
  Zod                                       → …/schemas/
  type chỉ feature đó                       → …/types/
  pure fn                                   → …/utils/
  client store (cart)                       → …/stores/
Navbar, Footer, Logo, AppLayout             → components/layout/
Provider toàn app                           → components/providers/ + app/providers.tsx
shadcn primitive                            → components/ui/     (cấm import features)
Hook generic (use-mobile)                   → hooks/
cn, slug, fetch client                      → lib/
Ảnh tĩnh                                    → public/images/
Dummy catalog hiện tại                      → constants/assets.ts
```

Chưa có code → **đừng tạo** `features/orders`, `checkout`, `seller`, `api/`.

---

## Cây hiện tại

```text
app/
├── layout.tsx                 # Server: font, <Providers>
├── providers.tsx              # Client: AppContext + Theme + Toaster
├── not-found.tsx
└── (main)/                    # group, không lên URL
    ├── layout.tsx             # → AppLayout (navbar/footer, ẩn auth+seller)
    ├── (home)/page.tsx        # /
    ├── (auth)/
    │   ├── layout.tsx         # chỉ Logo
    │   ├── sign-in/page.tsx   # /sign-in
    │   └── sign-up/page.tsx   # /sign-up
    ├── products/
    │   ├── page.tsx           # /products
    │   └── [category]/
    │       ├── page.tsx       # /products/fruits
    │       └── [slug]/page.tsx# /products/fruits/apple
    └── cart/page.tsx          # /cart

components/
├── layout/                    # navbar, footer, logo, app-layout
├── providers/                 # app-provider, theme-provider
├── mode-toggle.tsx
└── ui/                        # shadcn only

features/
├── auth/                      # forms, views, Zod, User
├── products/                  # card, list, detail, catalog view, hooks
├── categories/                # grid (home), nav (filter)
├── cart/                      # store Zod+localStorage, hooks, /cart UI
└── home/                      # banner, best-seller, newsletter, HomeView

hooks/use-mobile.ts
lib/utils.ts · lib/slug.ts     # toCategorySlug
constants/assets.ts            # icons + dummyProducts + dummyCategories
```

---

## Route → view

| URL | `app/` | Feature view |
|---|---|---|
| `/` | `(main)/(home)/page.tsx` | `features/home/components/home-view.tsx` |
| `/products` | `products/page.tsx` | `products-view.tsx` |
| `/products/:category` | `[category]/page.tsx` | `products-view.tsx` + metadata |
| `/products/:category/:slug` | `[slug]/page.tsx` | `product-detail.tsx` + metadata |
| `/cart` | `cart/page.tsx` | `cart-view.tsx` |
| `/sign-in` `/sign-up` | `(auth)/…` | `sign-in-view` / `sign-up-view` |
| unmatched | `not-found.tsx` | — |

Chưa có: `/my-orders`, `/seller`, `/checkout`. Navbar có link — đừng giả định page tồn tại.

---

## Features — sở hữu gì

| Feature | Key files | Ghi chú |
|---|---|---|
| **auth** | `schemas/auth.schema.ts`, `types/user.types.ts`, `sign-*-form/view.tsx` | Submit đang `console.log`. User mock trong AppContext. |
| **products** | `types/product.types.ts`, `hooks/use-product.ts`, `product-card/list/detail.tsx`, `products-view.tsx` | Card add-to-cart qua `useCartItem`. |
| **categories** | `types/category.types.ts`, `category-grid.tsx`, `category-nav.tsx` | Slug = `toCategorySlug(path)`. |
| **cart** | `schemas/cart.schema.ts`, `stores/cart.store.ts`, `hooks/use-cart.ts`, `use-cart-item.ts`, `utils/cart.ts` | State `{productId, quantity}` — Zod parse mọi set; persist `localStorage` key `greencart.cart`. Join Product lúc render. |
| **home** | `home-view.tsx` + banners | Best seller import `ProductCard`. Grid import categories. |

Cart hooks:

- `useCart()` — lines, totals (tax 2%), add/update/remove/clear
- `useCartItem(productId)` — quantity, increment/decrement
- `useCartCount()` — badge navbar

---

## State

| Cái gì | Chỗ |
|---|---|
| user, products[], categories[], currency, isSeller | `components/providers/app-provider.tsx` (`useAppContext`) |
| cart | `features/cart/stores/cart.store.ts` — **không** trong AppContext |
| menu mở navbar | `useState` local |
| filter category | URL `[category]` |
| API (sau này) | `features/<x>/api` + TanStack Query, không nhét vào AppContext |

Dummy data: `constants/assets.ts` → hydrate AppContext. Xóa dummy khi có API.

---

## Phụ thuộc (không đảo)

```text
app  →  features  →  components/ui + lib
home → products, categories
products → categories, cart
navbar → cart (CartIcon), auth (user từ context)
components/ui  ↛  features
features  ↛  app/_anything
lib  ↛  features
```

Cùng feature: `./` OK. Ra ngoài: `@/…`.

---

## Cấm

- Business trong `components/ui` hoặc `page.tsx`
- Type domain trong `types/` global — để `features/<x>/types/`
- Copy `Product` vào cart state — chỉ `productId` + `quantity`
- Tạo `api/`, `stores/`, `orders/` trước khi có file thật
- Import `../../../../`

---

## Việc tiếp theo (chưa tạo folder)

`auth` nối API · `checkout` · `orders` · `seller` · search `?q=` (form navbar đã có, list chưa đọc).
