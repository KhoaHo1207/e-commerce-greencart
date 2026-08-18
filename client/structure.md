# client/ — map cho agent

Đặt file mới: `file-placement.md`.

Next.js 16 App Router · React 19 · TS · Tailwind 4 · shadcn · Zod  
Alias `@/` = `client/` (không có `src/`).  
**Route → `app/`. Nghiệp vụ → `features/<x>/`. UI generic → `components/`. Hạ tầng → `lib/`.**  
`page.tsx` mỏng. Không tạo folder trống. Không barrel trừ public API thật sự cần. `"use client"` chỉ khi cần state/event/hook/browser API.

---

## Đặt file mới

```text
URL / layout / metadata / 404               → app/
1 nghiệp vụ                                 → features/<feature>/
  UI / hook / Zod / type / utils / store    → …/components|hooks|schemas|types|utils|stores
Navbar, Footer, Logo, AppLayout             → components/layout/
Provider toàn app                           → components/providers/ + app/providers.tsx
shadcn                                      → components/ui/     (cấm import features)
Hook generic                                → hooks/
cn, slug                                    → lib/
Dummy + icon map                            → constants/assets.ts
Ảnh tĩnh                                    → public/images/
```

Chưa có code → **đừng tạo** `features/checkout`, `seller`, `api/`.

---

## Cây hiện tại

```text
app/
├── layout.tsx                      # Server: font, <Providers>
├── providers.tsx                   # Client: AppContext + Theme + Toaster
├── not-found.tsx
└── (main)/                         # group, không lên URL
    ├── layout.tsx                  # AppLayout (ẩn navbar trên auth + /seller)
    ├── (home)/page.tsx             # /
    ├── (auth)/
    │   ├── layout.tsx              # chỉ Logo
    │   ├── sign-in/page.tsx        # /sign-in
    │   └── sign-up/page.tsx        # /sign-up
    ├── products/
    │   ├── page.tsx                # /products
    │   └── [category]/
    │       ├── page.tsx            # /products/fruits
    │       └── [slug]/page.tsx     # /products/fruits/apple
    ├── cart/page.tsx               # /cart
    ├── my-orders/page.tsx          # /my-orders
    ├── shop/page.tsx               # /shop
    ├── account/page.tsx            # /account
    ├── wishlist/page.tsx           # /wishlist
    ├── addresses/page.tsx          # /addresses
    └── vouchers/page.tsx           # /vouchers

components/
├── layout/                         # navbar (Sheet mobile), footer, logo, app-layout
├── providers/                      # app-provider, theme-provider
├── mode-toggle.tsx
└── ui/                             # shadcn

features/
├── auth/
│   ├── components/                 # sign-in/up form + view
│   ├── schemas/auth.schema.ts
│   └── types/user.types.ts
├── home/components/                # home-view, banners, best-seller, newsletter
├── categories/
│   ├── components/                 # category-grid, category-nav
│   └── types/category.types.ts
├── products/
│   ├── components/                 # card, list, heading, view, detail, about, related, product-search
│   ├── hooks/use-product.ts        # useProduct, useFilterProducts, useRelatedProducts
│   ├── utils/related-products.ts   # cùng category, trừ SP hiện tại, tối đa 5
│   ├── utils/filter-products.ts    # category + ?q= (name / category / slug)
│   └── types/product.types.ts
├── cart/
│   ├── schemas/cart.schema.ts      # Zod — cổng state
│   ├── stores/cart.store.ts        # localStorage greencart.cart
│   ├── utils/cart.ts               # getCartLineCount (loại) · getCartUnitCount (củ)
│   ├── hooks/                      # useCart, useCartItem, useCartCount
│   ├── types/cart.types.ts
│   └── components/                 # icon, view, item, summary, empty
├── reviews/
│   ├── types/review.types.ts
│   ├── utils/reviews.ts            # filter + paginate (5/trang)
│   ├── hooks/use-reviews.ts        # useState — không lên URL
│   └── components/                 # section, filter, item, pagination
├── orders/
│   ├── types/order.types.ts        # Order, OrderItem, OrderAddress
│   ├── utils/orders.ts             # sort newest, format date/id/address
│   ├── hooks/use-orders.ts         # dummyOrders (cần đăng nhập)
│   └── components/                 # view, card, item, empty
├── shop/
│   ├── types/shop.types.ts
│   ├── utils/shop.ts               # format count / joined / response time
│   ├── hooks/use-shop.ts           # 1 dummyShop dùng chung mọi SP
│   └── components/                 # shop-card (PDP), shop-view (/shop)
├── account/
│   ├── constants/account-menu.ts   # profile, orders, wishlist, addresses, vouchers
│   └── components/                 # user-menu, profile, addresses, placeholder
└── wishlist/
    ├── schemas/wishlist.schema.ts  # Zod string[] productId, localStorage
    ├── stores/wishlist.store.ts    # greencart.wishlist
    ├── utils/wishlist.ts           # add / remove / toggle / prune
    ├── hooks/use-wishlist.ts       # useWishlist, useWishlistItem
    ├── types/wishlist.types.ts
    └── components/                 # WishlistButton (icon), view, item, empty

hooks/use-mobile.ts
lib/utils.ts · lib/slug.ts          # cn, toCategorySlug
constants/assets.ts                 # dummyProducts, dummyCategories, dummyReviews, …
```

---

## Route → view

| URL | `app/` | Feature |
|---|---|---|
| `/` | `(home)/page.tsx` | `home/components/home-view.tsx` |
| `/products` | `products/page.tsx` | `products-view.tsx` (+ `?q=`) |
| `/products/:category` | `[category]/page.tsx` | `products-view.tsx` + metadata (+ `?q=`) |
| `/products/:category/:slug` | `[slug]/page.tsx` | `product-detail.tsx` (`WishlistButton` + `ShopCard` + `ProductAbout` + `ReviewSection` + `RelatedProducts`) |
| `/cart` | `cart/page.tsx` | `cart-view.tsx` |
| `/my-orders` | `my-orders/page.tsx` | `orders-view.tsx` |
| `/shop` | `shop/page.tsx` | `shop-view.tsx` |
| `/account` | `account/page.tsx` | `account-view.tsx` |
| `/wishlist` | `wishlist/page.tsx` | `wishlist-view.tsx` |
| `/addresses` | `addresses/page.tsx` | `addresses-view.tsx` |
| `/vouchers` | `vouchers/page.tsx` | `account-placeholder.tsx` |
| `/sign-in` `/sign-up` | `(auth)/…` | `sign-*-view.tsx` |
| unmatched | `not-found.tsx` | — |

Chưa có page: `/seller`, `/checkout` (navbar/footer có thể vẫn link).

---

## Features

| Feature | Key | Ghi chú |
|---|---|---|
| **auth** | Zod forms, `User` | Submit `console.log`. User mock trong AppContext. |
| **home** | `home-view` | Import `ProductCard` + `CategoryGrid`. |
| **categories** | grid, nav | Slug = `toCategorySlug(path)`. |
| **products** | card, list, detail, about, related, search | Card: `useCartItem`. PDP: gallery + tên + **icon tim** (`WishlistButton`) → giá → Add to Cart / Buy now → `ShopCard` → `ProductAbout` → `ReviewSection` → `RelatedProducts`. Search: `ProductSearch` GET `/products?q=`. |
| **cart** | Zod store `{productId, quantity}` | Persist `localStorage`. Join Product lúc render. Tax 2%. **Badge** (`useCartCount` / `getCartLineCount`) = số **loại** (khoai 9 + cà rốt 2 → `2`). **Subtotal** trên trang cart = tổng **unit** (`itemCount`: 11 items). |
| **reviews** | filter All/5–1★, 5 item/trang | Mọi SP dùng chung `dummyReviews`. Filter = `useState` (SEO: URL SP sạch). |
| **orders** | list dummy, reorder | `dummyOrders`. Mỗi dòng: Add to Cart / Buy now → `useCart().addToCart(id, qty)` (Buy now rồi `/cart`). Chưa login → empty + Sign in. |
| **shop** | 1 shop dummy, PDP card | `dummyShop` dùng chung mọi SP. Avatar, online, ratings, products, response rate/time, joined, followers. Chat now → toast. View shop → `/shop`. |
| **account** | avatar dropdown | Nav chỉ Home / All Products. Hover avatar: profile, orders, wishlist, addresses, vouchers, logout (không trùng nav). |
| **wishlist** | localStorage `productId[]` | Cùng `WishlistButton` (icon tim, không nút chữ). PDP: cạnh tên SP. `/wishlist`: góc phải trên card (`WishlistItem`, **không** `ProductCard`). Guest OK. Max 100. Toast add/remove. List: bỏ tim / Add giỏ. |

Cart hooks: `useCart()` lines/totals/actions · `useCartItem(id)` qty ± · `useCartCount()` badge = số loại (`getCartLineCount`).

Products hooks: `useProduct(slug)` · `useFilterProducts(categorySlug?, query?)` · `useRelatedProducts(id, category)` (gọi `getRelatedProducts`).

Reviews hooks: `useReviews()` rating + page local; đổi filter → page 1.

Orders hooks: `useOrders()` dummy list nếu đã login; sort mới nhất.

Shop hooks: `useShop()` 1 shop; `productCount` = `products.length`.

Wishlist hooks: `useWishlist()` ids/items/add/remove/toggle · `useWishlistItem(id)` isSaved + toggle.

Navbar: desktop (`sm+`) Home / All Products + search + cart + login/`UserMenu` + `ModeToggle`. Mobile: logo `w-28`, thanh = search + `CartIcon` (`size-8`) + hamburger. Hamburger = shadcn `Sheet` (bấm overlay / X / link → đóng). `ModeToggle` mobile nằm **trong Sheet**, không trên thanh.

---

## State

| Cái gì | Chỗ |
|---|---|
| user, products[], categories[], currency, isSeller | `components/providers/app-provider.tsx` |
| cart | `features/cart/stores/cart.store.ts` |
| wishlist | `features/wishlist/stores/wishlist.store.ts` |
| review filter + page | `features/reviews/hooks/use-reviews.ts` (`useState`) |
| navbar menu | shadcn `Sheet` + `useState` search | Overlay / X / link → đóng. Mobile: search + cart + menu; theme trong Sheet. |
| category catalog | URL `[category]` |
| product search | URL `?q=` trên `/products` | Form `ProductSearch` trong navbar. `defaultValue` từ `useSearchParams`. X clear = native `type="search"`. |
| my orders | `dummyOrders` qua `useOrders` | Chưa persist / API |
| shop | `dummyShop` qua `useShop` | 1 shop cho mọi SP |
| API (sau này) | `features/<x>/api` + TanStack Query |

Dummy: `constants/assets.ts` (`dummyProducts`, `dummyCategories`, `dummyReviews`, `dummyAddress`, `dummyOrders`, `dummyShop`).

---

## Phụ thuộc (không đảo)

```text
app  →  features  →  components/ui + lib
home → products, categories
products → categories, cart, reviews, shop, wishlist
orders → cart (addToCart / buy now), products (type Product trên dummy item)
wishlist → products (type Product lúc render), cart (Add trên list); **không** import ProductCard
shop → products (chỉ `products.length` cho productCount; **không** import ProductList — tránh cycle)
navbar → cart (CartIcon), products (ProductSearch), account (UserMenu + ACCOUNT_MENU_ITEMS trong Sheet), user từ AppContext, shadcn Sheet / Button / ModeToggle
components/ui  ↛  features
features  ↛  app/*
lib  ↛  features
```

Cùng feature: `./`. Ra ngoài: `@/`.

---

## Cấm

- Business trong `components/ui` hoặc `page.tsx`
- Type domain ở `types/` root — để `features/<x>/types/`
- Copy `Product` vào cart / wishlist state
- Query `?rating` / `?page` cho reviews trên PDP
- Tạo `checkout/` `seller/` `api/` trước khi có file
- Import `../../../../`

---

## Việc tiếp theo

`auth` API · review theo `productId` · `checkout` · `seller`.
