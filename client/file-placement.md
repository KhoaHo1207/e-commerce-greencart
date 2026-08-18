# Đặt file đúng chỗ

Cây hiện tại: `structure.md`. File này chỉ trả lời: **file mới để đâu.**

Câu hỏi duy nhất: *file này vỡ thì hỏng nghiệp vụ nào?*  
Có tên domain (cart, products, auth, reviews, orders, shop, account, seller…) → **trong feature**. Không → **ngoài** (`lib/`, `components/`, `hooks/`, `config/`).

Không tạo folder trống. Không barrel `index.ts` trừ khi public API thật sự cần.

---

## 1. Component

Ba chỗ. Không nhét business vào `components/ui`.

| Chỗ | Khi nào | Ví dụ |
|---|---|---|
| `app/<route>/_components/` | **Chỉ 1 URL**, không tái dùng, không phải domain | Hero chỉ trang About |
| `features/<x>/components/` | Thuộc 1 nghiệp vụ, **nhiều route vẫn được** | `ProductCard`, `CartIcon`, `ReviewSection` |
| `components/layout/` | Shell app | Navbar, Footer, Logo, AppLayout |
| `components/ui/` | Primitive shadcn — không biết cart/product | Button, Input, Dialog |
| `components/providers/` | Bọc toàn app | AppContext, Theme |

```text
Chỉ trang /about dùng, không có API/schema?
  → app/(main)/about/_components/

Product / cart / auth / review / order / shop / wishlist / seller (có type, hook, form)?
  → features/<x>/components/

Dùng mọi trang buyer, không phải domain?
  → components/layout/

Nút, input, dialog generic?
  → components/ui/
```

**GreenCart mặc định:** domain → `features/`. `app/_components` hiếm. `components/` = shell + shadcn.

`page.tsx` luôn mỏng: import view từ feature, không viết list/form lớn trong route.

Chi tiết gắn vào page khác domain: page import feature đó.

```text
product-detail.tsx  →  features/reviews/components/review-section.tsx
product-detail.tsx  →  features/products/components/product-about.tsx
product-detail.tsx  →  features/products/components/related-products.tsx
product-detail.tsx  →  features/shop/components/shop-card.tsx
product-detail.tsx  →  features/wishlist/components/wishlist-button.tsx
navbar.tsx          →  features/cart/components/cart-icon.tsx
navbar.tsx          →  features/account/components/user-menu.tsx
navbar.tsx          →  features/account/components/seller-menu-item.tsx
navbar.tsx          →  features/products/components/product-search.tsx
my-orders page      →  features/orders/components/orders-view.tsx
seller layout       →  features/seller/components/seller-layout.tsx
```

Không copy `ReviewSection` vào `features/products` hay `app/.../_components`.  
Related list / About Product = nghiệp vụ products → `features/products`, không nhét vào reviews hay shop.  
PDP (trên xuống): gallery + tên + icon wishlist → giá → Add to Cart / Buy now → `ShopCard` → `ProductAbout` → `ReviewSection` → `RelatedProducts`.  
Nút **X** trên ô search = native browser (`type="search"`), **không** tạo `ClearButton` / file riêng.  
My Orders = nghiệp vụ `orders` → `features/orders`. Nút Add to Cart / Buy now gọi `useCart`, không copy logic giỏ vào orders.  
Shop trên PDP = `features/shop`. **Không** copy `ShopCard` vào `features/products`. `shop` không import `ProductList` (tránh products ↔ shop).  
Menu avatar = `features/account`. Nav không nhét My Orders / profile — những mục account chỉ trong dropdown (desktop) hoặc Sheet (mobile).  
`SellerMenuItem` ở **account** (không import `features/seller`) — label theo `user.role`. Become a seller đổi role rồi vào dashboard.  
Hamburger mobile = shadcn `Sheet` trong `navbar.tsx` (không tự viết overlay/click-outside). Thanh mobile **không** nhồi `ModeToggle` — theme trong Sheet.  
Wishlist = `features/wishlist`. Một `WishlistButton` (icon tim). PDP cạnh tên; card list `absolute` góc phải trên. **Không** import `ProductCard`. State chỉ `productId[]`.  
Seller dashboard = `features/seller` + `app/seller/` (ngoài `(main)`). Nav + shadcn `Sidebar`. CRUD SP = `AppContext.products`. Orders status = `features/orders` store. **Không** copy `ProductList` / `orders-view` buyer vào seller.

---

## 2. Ngoài vs trong feature

| Loại | **Ngoài** (root `client/`) | **Trong** `features/<x>/` |
|---|---|---|
| Component | `components/layout`, `components/ui` | `components/` — UI domain |
| Hook | `hooks/` — `use-mobile`, `use-debounce` | `hooks/` — `use-cart`, `use-product` |
| Type | *(không dùng `types/` global)* | `types/` — `product.types.ts` |
| Zod | — | `schemas/` — `cart.schema.ts`, `wishlist.schema.ts`, `auth.schema.ts` |
| Pure fn | `lib/` — `cn`, `toCategorySlug` | `utils/` — `addCartItem`, tính tiền giỏ |
| Store | — | `stores/` — state client 1 domain (cart, wishlist) |
| API | `lib/api/` — fetch client, interceptor | `api/` — `get-products.ts`, `add-review.ts` |
| Config | `config/` — env, site URL, currency | hằng số domain — `CART_TAX_RATE` trong schema/utils feature |
| Constants | `constants/` — asset map, dummy tạm | dummy/fixture chỉ 1 feature (khi tách được) |
| Provider | `components/providers` + `app/providers.tsx` | store/hook feature, không nhồi AppContext |

---

## 3. Từng loại file

### `lib/` — hạ tầng, **không** biết giỏ / đơn / user

Được: `cn()`, slug generic, fetch wrapper, query-client, format date generic, env parser.

Không: `addToCart`, `calcOrderTotal`, `ProductCard`.

Hiện: `lib/utils.ts` (`cn`), `lib/slug.ts` (`toCategorySlug` — string helper, nhiều feature dùng → ngoài).

`toCategorySlug` ở `lib/` vì products + categories + cart link đều dùng, không thuộc 1 domain.

---

### `utils` trong feature

Pure domain: vào data cũ → ra data mới. Không React, không `"use client"`.

```text
features/cart/utils/cart.ts                 # add/update/remove/totals; line count = loại, unit count = củ
features/products/utils/related-products.ts # cùng category, trừ SP hiện tại, cap 5
features/products/utils/filter-products.ts  # category + search query
features/orders/utils/orders.ts             # sort, format date/id/address
features/shop/utils/shop.ts                 # compact count, joined duration, response time
features/seller/utils/seller-products.ts    # slug, filter, build Product
features/orders/utils/orders.ts             # sort, format, patch, filter seller/buyer
```

Test được không cần Next. Hook/store **gọi** utils, không copy thuật toán vào component.

---

### `config/` — tạo khi có file thật

Site-wide, không phải business:

```text
config/env.ts      # parse NEXT_PUBLIC_*
config/site.ts     # name, metadataBase, currency mặc định
```

`CART_ITEM_MAX_QUANTITY`, `CART_TAX_RATE` → **feature cart** (`schemas/cart.schema.ts`), không phải config site.

---

### `constants/`

Data tĩnh / map asset. Hiện: `constants/assets.ts` (icon + dummy catalog).

Không nhét hàm. Dummy biến mất khi có API → data vào `features/<x>/api`.

---

### `hooks/`

| | |
|---|---|
| `hooks/use-mobile.ts` | Viewport — sidebar/navbar nào cũng dùng |
| `features/cart/hooks/use-cart.ts` | Chỉ giỏ |
| `features/wishlist/hooks/use-wishlist.ts` | Chỉ wishlist |

Hook vừa `window` vừa “thêm giỏ” → **feature**. Generic media-query → `hooks/`.

---

### `schemas/` (Zod)

Luôn trong feature. Form auth, shape cart / wishlist, review input.

Không đặt `validators/` global.

---

### `types/`

Type domain → `features/<x>/types/`.  
`Product` dùng khắp app **vẫn** ở `features/products/types/` — cart/home import type, không kéo logic products.

Không tạo lại `types/product.d.ts` ở root.

---

### `stores/`

Client global **một domain** (cart / wishlist + localStorage + Zod).  
User/products dummy tạm: `AppContext`. API thật: TanStack Query trong `features/<x>/hooks`, **không** nhân đôi vào store.

---

### `api/` (khi có backend)

```text
lib/api/client.ts                 # base URL, headers, error
features/products/api/get-product.ts
features/reviews/api/list-reviews.ts
```

Component không `fetch` thẳng. Hook gọi `api/`.

---

### `app/`

Chỉ: `page.tsx`, `layout.tsx`, `loading.tsx`, `error.tsx`, `not-found.tsx`, `route.ts`, `generateMetadata`.  
Không: form lớn, store, Zod, list product.

---

## 4. Ví dụ nhanh

| File | Chỗ |
|---|---|
| Comment/review trên trang SP | `features/reviews/components/` (+ schema, hooks) |
| Related products trên PDP | `features/products/components/related-products.tsx` (+ utils, hook) |
| About Product trên PDP | `features/products/components/product-about.tsx` (dưới shop, trên reviews) |
| Thanh search navbar | `features/products/components/product-search.tsx` (GET `/products?q=`) |
| Nút X xóa ô search | **Không có file** — native `<input type="search">` trong `product-search.tsx` |
| Lọc list theo `?q=` | `features/products/utils/filter-products.ts` |
| Trang My Orders | `features/orders/components/` (+ types, hook, utils) |
| Shop trên PDP / `/shop` | `features/shop/components/shop-card.tsx` (+ types, hook, utils) |
| Dropdown avatar | `features/account/components/user-menu.tsx` |
| Manage store / Become a seller | `features/account/components/seller-menu-item.tsx` |
| Seller dashboard chrome | `features/seller/components/` (layout, navbar, sidebar) |
| Seller product list / add / edit | `features/seller/components/` + `schemas/seller-product.schema.ts` |
| Seller orders | `features/seller/components/seller-orders.tsx` (gọi `useOrders`, **không** `orders-view`) |
| Ảnh SP (static hoặc data URL) | `features/products/components/product-photo.tsx` |
| Sidebar mục seller | `features/seller/constants/seller-nav.ts` |
| Wishlist icon (PDP + card list) | `features/wishlist/components/wishlist-button.tsx` |
| Trang `/wishlist` | `features/wishlist/components/wishlist-view.tsx` (+ item, empty, store) |
| Empty “wishlist trống” | `features/wishlist/components/wishlist-empty.tsx` |
| Hamburger / đóng click ngoài | shadcn `Sheet` trong `components/layout/navbar.tsx` — **không** file overlay riêng |
| Theme trên mobile | `ModeToggle` trong Sheet footer, không trên thanh navbar |
| `formatCartMoney` | `features/cart/utils/` |
| Badge giỏ (số trên icon) | `getCartLineCount` — số **loại**, không cộng quantity. Đổi sang unit = sai spec. `CartIcon` = `size-8`, badge trong ô. |
| Subtotal trang cart | `itemCount` / `getCartUnitCount` — tổng củ/món |
| `cn()` | `lib/utils.ts` |
| `NEXT_PUBLIC_API_URL` parse | `config/env.ts` |
| `useDebounce` | `hooks/use-debounce.ts` |
| `useReviews(productId)` | `features/reviews/hooks/` |
| Empty state generic | `components/ui/empty` (đã có) |
| Empty “giỏ trống” | `features/cart/components/cart-empty.tsx` |
| Metadata title site | `app/layout.tsx` / `config/site.ts` |

---

## 5. Cấm

```text
components/ui/*     →  features/*
lib/*               →  features/*
features/cart       →  app/(main)/products/_components
page.tsx            →  chứa form/list/store
```

Chiều đúng: `app` → `features` → `components/ui` + `lib`.
