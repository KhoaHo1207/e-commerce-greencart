# GreenCart Frontend — Cấu trúc thư mục & file

Tài liệu này mô tả **cách tổ chức code frontend** trong `client/`.

Stack hiện tại:

- Next.js 16 (App Router)
- TypeScript
- Tailwind CSS v4
- shadcn/ui
- React 19

Alias import: `@/` trỏ tới thư mục `client/` (không dùng `src/`).

---

## 1. Nguyên tắc chung

1. `app/` chỉ lo **routing**. File `page.tsx` / `layout.tsx` phải mỏng.
2. Logic nghiệp vụ nằm trong `features/<tên-feature>/`.
3. UI dùng chung, không gắn với 1 feature, nằm trong `components/`.
4. `components/ui/` chỉ chứa primitive shadcn. Không nhét business vào đây.
5. Không tạo folder trống “cho đủ bộ”. Chỉ tạo khi thật sự có file.
6. Không tạo `index.ts` barrel trừ khi public API thật sự cần.
7. File đặt tên **kebab-case**. Component React đặt tên **PascalCase**.
8. Mặc định Server Component. Chỉ thêm `"use client"` khi cần state, event, hook, hoặc browser API.
9. Import luôn dùng `@/`, không dùng `../../../../`.

Cây quyết định khi tạo file mới:

```text
Đây là route (URL)?
  → app/

Gắn với 1 nghiệp vụ (cart, products, auth, orders…)?
  → features/<feature>/

UI dùng lại được, không gắn 1 feature?
  → components/        (navbar, logo, layout pieces)
  → components/ui/     (button, dialog, input — shadcn)

Hook generic, dùng nhiều feature?
  → hooks/

Type chỉ thuộc 1 feature?
  → features/<feature>/types.ts

Type dùng chung nhiều feature (User, Product dùng khắp app)?
  → types/

Hạ tầng / helper kỹ thuật (cn, fetch client, query-client)?
  → lib/

Cấu hình môi trường, site metadata?
  → config/   (tạo khi có)

Ảnh, icon tĩnh?
  → public/
```

---

## 2. Cây thư mục hiện tại

```text
client/
├── app/                          # Routing (App Router)
│   ├── layout.tsx                # Root layout: html, font, provider
│   ├── globals.css               # Tailwind + CSS variables (shadcn)
│   ├── icon.svg                  # Favicon App Router
│   ├── not-found.tsx             # Trang 404
│   └── (home)/                   # Route group — không xuất hiện trên URL
│       ├── page.tsx              #  →  /
│       └── _components/          # Component chỉ dùng cho route group này
│           ├── main-banner.tsx
│           ├── categories.tsx
│           └── best-seller.tsx
│
├── components/                   # UI dùng chung toàn app
│   ├── logo.tsx
│   ├── navbar.tsx
│   ├── product-card.tsx          # Tạm thời; nên chuyển sang features/products
│   └── ui/                       # shadcn primitives (không sửa business vào đây)
│       ├── button.tsx
│       ├── input.tsx
│       ├── dialog.tsx
│       └── ...
│
├── layouts/                      # Shell UI bọc nhiều trang
│   └── app-layout.tsx            # Navbar + main + Toaster
│
├── contexts/                     # React Context toàn app
│   └── app-provider.tsx          # user, products, cart state (client)
│
├── features/                     # Nghiệp vụ theo domain
│   └── cart/
│       ├── types.ts              # CartItem
│       └── utils.ts              # add / update / remove (pure functions)
│
├── hooks/                        # Hook generic, không gắn 1 feature
│   └── use-mobile.ts
│
├── lib/                          # Hạ tầng / utility kỹ thuật
│   └── utils.ts                  # cn()
│
├── types/                        # Type dùng chung nhiều nơi
│   ├── product.d.ts
│   └── user.d.ts
│
├── constants/                    # Data tĩnh / dummy / asset map
│   └── assets.ts
│
├── public/                       # File tĩnh, URL = /...
│   └── images/
│
├── components.json               # Cấu hình shadcn
├── next.config.ts
├── tsconfig.json
├── eslint.config.mjs
├── postcss.config.mjs
└── package.json
```

---

## 3. `app/` — Routing

`app/` ánh xạ **URL**, không phải nơi chứa business logic.

| File / folder | URL | Vai trò |
|---|---|---|
| `app/layout.tsx` | mọi route | Root layout: font, `AppContextProvider`, `AppLayout` |
| `app/globals.css` | — | Global styles |
| `app/not-found.tsx` | unmatched URL | 404 |
| `app/(home)/page.tsx` | `/` | Trang chủ |
| `app/(home)/_components/` | — | UI chỉ phục vụ trang chủ |

### Route group `(tên)`

Folder bọc trong ngoặc `()` **không** thành đoạn URL.

```text
app/(home)/page.tsx     →  /
app/(auth)/login/page.tsx  →  /login     (khi tạo)
```

Dùng route group để:

- gom layout riêng (ví dụ buyer vs seller)
- tách nhóm trang cho dễ đọc
- không làm bẩn URL

### Private folder `_tên`

Folder bắt đầu bằng `_` **không phải route**. Dùng cho file phụ thuộc gần route đó.

```text
app/(home)/_components/main-banner.tsx
```

Chỉ đặt component vào `_components` khi **không tái sử dụng** ngoài route group đó.

- Banner trang chủ → `app/(home)/_components/`
- `Navbar` dùng mọi trang buyer → `components/navbar.tsx`
- `ProductCard` dùng list, home, search → `features/products/components/` (hoặc `components/` tạm thời)

### `page.tsx` phải mỏng

```tsx
import BestSeller from "./_components/best-seller";
import Categories from "./_components/categories";
import Mainbanner from "./_components/main-banner";

export default function HomePage() {
  return (
    <div className="mt-10">
      <Mainbanner />
      <Categories />
      <BestSeller />
    </div>
  );
}
```

Không viết fetch phức tạp, cart logic, hay form lớn trực tiếp trong `page.tsx`.

### Route dự kiến (thêm khi làm tính năng)

```text
app/
├── (home)/
│   └── page.tsx                      →  /
├── (shop)/
│   ├── products/
│   │   ├── page.tsx                  →  /products
│   │   └── [id]/
│   │       └── page.tsx              →  /products/:id
│   ├── cart/
│   │   └── page.tsx                  →  /cart
│   └── orders/
│       └── page.tsx                  →  /orders
├── (auth)/
│   ├── login/page.tsx                →  /login
│   └── register/page.tsx             →  /register
└── seller/
    ├── layout.tsx                    →  layout riêng seller
    └── page.tsx                      →  /seller
```

Chỉ tạo các folder trên khi bắt đầu làm route tương ứng.

---

## 4. `layouts/` — Shell của app

Khác với `app/layout.tsx`:

| File | Client/Server | Việc làm |
|---|---|---|
| `app/layout.tsx` | Server | `<html>`, metadata, font, bọc provider |
| `layouts/app-layout.tsx` | Client | Navbar, khoảng padding, ẩn navbar trên `/seller`, Toaster |

`app/layout.tsx` **không** gắn `"use client"` nếu không bắt buộc. Phần cần hook (`usePathname`) tách ra `layouts/`.

Khi có layout khác (seller dashboard, auth không navbar), tạo file mới:

```text
layouts/
├── app-layout.tsx
└── seller-layout.tsx
```

Không nhồi mọi biến thể vào một file khổng lồ.

---

## 5. `components/` — UI dùng chung

### 5.1 `components/` (root)

Component tái sử dụng, **không** thuộc đúng 1 feature:

```text
components/
├── logo.tsx          # Logo + Link về /
├── navbar.tsx        # Thanh điều hướng buyer
└── product-card.tsx  # Tạm. Mục tiêu: features/products/components/product-card.tsx
```

Quy tắc:

- Có thể import `features/` nếu cần (navbar đọc `user` từ context là ổn).
- Không nhét logic giỏ hàng phức tạp vào đây — gọi hàm từ `features/cart`.

### 5.2 `components/ui/`

Chỉ primitive shadcn: `Button`, `Input`, `Dialog`, `Sheet`, …

- Không import `@/features/*`
- Không biết “product”, “cart”, “order”
- Sửa styling/variant thì sửa ở đây; không copy-paste primitive ra ngoài

Feature được phụ thuộc UI:

```text
features/products/components/product-card.tsx
        ↓
components/ui/button.tsx
```

Không chiều ngược lại.

### 5.3 `components/shared/` (tạo khi cần)

Chỗ cho UI tái sử dụng nhưng chưa phải shadcn: `EmptyState`, `ErrorState`, `LoadingSpinner` dùng nhiều trang.

Chưa có thì **đừng tạo folder trước**.

---

## 6. `features/` — Nghiệp vụ

Mỗi domain một folder. Feature **sở hữu** type, logic, UI, hook, API của chính nó.

Hiện có:

```text
features/cart/
├── types.ts      # CartItem { product, quantity }
└── utils.ts      # addCartItem, updateCartItem, removeCartItem
```

### 6.1 `features/cart` — mẫu đang dùng

| File | Nội dung | Tính chất |
|---|---|---|
| `types.ts` | `CartItem` | Type của domain cart |
| `utils.ts` | Thêm / sửa SL / xóa | **Pure function**: vào cart cũ, ra cart mới. Không `useState`, không Context |

Context chỉ gọi:

```ts
setCartItems((prev) => addCartItem(prev, products, productId, quantity));
setCartItems((prev) => updateCartItem(prev, productId, quantity));
setCartItems((prev) => removeCartItem(prev, productId));
```

API giỏ hàng (từ UI):

```ts
addToCart(productId)           // cộng dồn, mặc định +1
addToCart(productId, 3)
updateCart(productId, 5)       // gán số lượng; ≤ 0 thì xóa
removeFromCart(productId)      // xóa hẳn
```

`updateCart` và `removeFromCart` khác nhau:

- `updateCart` — trang cart, input số lượng
- `removeFromCart` — nút xóa item

### 6.2 Cấu trúc 1 feature khi lớn lên

Chỉ tạo subfolder khi có file thật:

```text
features/<feature>/
├── api/              # Gọi backend: get-products.ts, add-to-cart.ts
├── components/       # UI chỉ dùng trong feature
├── hooks/            # use-products.ts, use-cart.ts
├── schemas/          # Zod
├── stores/           # Zustand (nếu tách state khỏi Context)
├── types.ts          # hoặc types/
└── utils.ts          # Pure domain logic
```

Ví dụ khi làm products đầy đủ:

```text
features/products/
├── types.ts
├── api/
│   └── get-products.ts
├── hooks/
│   └── use-products.ts
└── components/
    ├── product-card.tsx
    └── product-list.tsx
```

Ví dụ cart khi có trang giỏ + API:

```text
features/cart/
├── types.ts
├── utils.ts
├── api/
│   └── sync-cart.ts
├── hooks/
│   └── use-cart.ts
└── components/
    ├── cart-drawer.tsx
    └── cart-item-row.tsx
```

### 6.3 Feature dự kiến

| Feature | Việc của nó |
|---|---|
| `cart` | Giỏ hàng |
| `products` | Catalog, card, filter, chi tiết |
| `auth` | Login, register, session |
| `orders` | Đơn của user |
| `checkout` | Địa chỉ, thanh toán |
| `seller` | Dashboard người bán |

Không tạo sẵn các folder này.

### 6.4 Import trong feature

- Cùng feature, file gần nhau: relative `./types` được.
- Ra ngoài feature: `@/components/ui/button`, `@/lib/utils`.
- Feature A **không** import sâu vào ruột feature B (`features/cart/utils` từ `orders` thì nên qua public API rõ ràng, hoặc shared type).

---

## 7. `contexts/` — State client dùng nhiều nơi

Hiện:

```text
contexts/app-provider.tsx
```

Đang giữ:

- `user` / `setUser`
- `isSeller`
- `products` (tạm từ `dummyProducts`)
- `cartItems` + `addToCart` / `updateCart` / `removeFromCart`
- `currency`
- `router` (các component cũng có thể gọi `useRouter()` trực tiếp)

Quy tắc:

- Context **mỏng**: không nhét thuật toán domain. Thuật toán cart ở `features/cart/utils.ts`.
- Khi 1 domain đủ lớn (cart, auth), tách provider/store riêng, không nhồi tất cả vào `AppContext`.
- Không đưa `router` vào context nếu không có lý do — `useRouter()` / `<Link>` ở component là đủ.

---

## 8. `hooks/` vs `features/*/hooks/`

| Chỗ | Khi nào |
|---|---|
| `hooks/` | Generic: `use-mobile`, `use-debounce`, `use-mounted` |
| `features/<x>/hooks/` | Chỉ phục vụ feature đó: `use-cart`, `use-products` |

`hooks/use-mobile.ts` đúng chỗ vì sidebar/navbar nào cũng có thể dùng.

---

## 9. `lib/` — Hạ tầng

Không chứa nghiệp vụ “thêm vào giỏ”, “tính giá đơn”.

Đúng:

```text
lib/
├── utils.ts              # cn()
├── api/client.ts         # fetch wrapper (khi có)
└── query/query-client.ts # TanStack Query (khi dùng)
```

Sai:

```text
lib/add-to-cart.ts        # → features/cart/utils.ts
lib/product-card.tsx      # → features/products/components/
```

---

## 10. `types/` — Type dùng chung

```text
types/
├── product.d.ts
└── user.d.ts
```

`Product` và `User` đang dùng ở navbar, card, cart, context → để global là hợp lý.

Type **chỉ cart dùng** (`CartItem`) nằm ở `features/cart/types.ts`, không để trong `types/`.

Khi type chỉ phục vụ 1 feature, đặt trong feature đó.

---

## 11. `constants/`

```text
constants/assets.ts
```

Hiện chứa:

- map icon/ảnh (`assets.logo`, `assets.star_icon`, …)
- `dummyProducts`, `dummyAddress`, `dummyOrders` (data fake)

Khi có API thật:

- xóa dần dummy khỏi đây
- ảnh product sẽ là URL từ server, không import static như dummy hiện tại

Không nhét hàm business vào `constants/`.

---

## 12. `public/` — File tĩnh

```text
public/images/logo.svg      →  /images/logo.svg
```

Dùng cho `next/image` / `<Image src="/images/..." />`.

`app/icon.svg` là favicon theo convention App Router, khác với file trong `public/`.

Không import business code từ `public/`.

---

## 13. Đặt tên file

| Loại | File | Export |
|---|---|---|
| Component | `product-card.tsx` | `ProductCard` |
| Hook | `use-mobile.ts` | `useMobile` |
| Pure util | `utils.ts` hoặc `add-cart-item.ts` | `addCartItem` |
| Schema Zod | `product.schema.ts` | `productSchema` |
| Store Zustand | `cart.store.ts` | `useCartStore` |
| API function | `get-products.ts` | `getProducts` |
| Provider | `app-provider.tsx` | `AppContextProvider` |
| Layout | `app-layout.tsx` | `AppLayout` |
| Type | `types.ts` / `product.d.ts` | `Product`, `CartItem` |

Một file một trách nhiệm rõ. Nhóm hàm **cùng domain và cùng tính chất** (3 hàm cart thuần) thì để chung một `utils.ts` là đúng — không cần tách 3 file một dòng.

---

## 14. Server Component vs Client Component

```text
Server (mặc định)          Client ("use client")
─────────────────          ─────────────────────
app/layout.tsx             layouts/app-layout.tsx
app/(home)/page.tsx        components/navbar.tsx
app/not-found.tsx          contexts/app-provider.tsx
                           components/product-card.tsx
                           features không cần "use client"
                           nếu chỉ export pure function
```

`features/cart/utils.ts` **không** cần `"use client"` — chỉ là TypeScript thuần, server hay client import được.

Thêm `"use client"` khi file dùng:

- `useState` / `useEffect` / `useContext`
- `onClick` / `onChange`
- `useRouter`, `usePathname`
- API trình duyệt (`window`, `localStorage`)

---

## 15. Luồng phụ thuộc (không được đảo)

```text
app/page.tsx
    → layouts/  hoặc  app/_components/
        → components/navbar.tsx
        → features/products/components/...
            → features/cart/utils.ts
            → components/ui/button.tsx
            → lib/utils.ts
            → types/product.d.ts
```

Cấm:

```text
components/ui/*   →  features/*
lib/utils.ts      →  features/*
features/cart     →  app/(home)/_components   (feature không phụ thuộc route)
```

---

## 16. State — để chỗ nào

| Loại state | Chỗ để |
|---|---|
| Mở/đóng mobile menu | `useState` trong `navbar.tsx` |
| Filter trên URL (`?category=`) | `searchParams` |
| User / cart / products (tạm, dùng nhiều trang) | `contexts/app-provider.tsx` |
| Logic đổi cart | `features/cart/utils.ts` |
| Data từ API (sau này) | TanStack Query trong `features/*/hooks` |
| Global client store (sau này, nếu context quá tải) | `features/<x>/stores/*.store.ts` (Zustand) |

Đừng copy danh sách product từ server vào context rồi lại fetch Query cùng một data.

---

## 17. Việc nên dọn khi làm tiếp

Những chỗ **đúng tạm thời**, nên chuyển khi feature lớn:

| Hiện tại | Nên chuyển tới |
|---|---|
| `components/product-card.tsx` | `features/products/components/product-card.tsx` |
| `app/(home)/_components/categories.tsx` (nếu dùng lại trang products) | `features/products/components/` hoặc `features/categories/` |
| `products` + dummy trong `AppContext` | `features/products/hooks/use-products.ts` |
| `cartItems` trong `AppContext` khi cart phức tạp | `features/cart/hooks/use-cart.ts` hoặc store |
| `router` trong context | bỏ, dùng `useRouter` / `Link` tại chỗ |

---

## 18. Checklist khi thêm file

1. File này phục vụ URL nào, feature nào, hay UI generic?
2. Đặt đúng tầng theo cây quyết định ở mục 1.
3. Tên kebab-case.
4. `page.tsx` có còn mỏng không?
5. Có đang nhét business vào `components/ui` không?
6. Type có nên nằm trong feature thay vì `types/` không?
7. Có cần `"use client"` thật không?
8. Có tạo folder trống không? Nếu có thì đừng.

---

## 19. Tóm tắt một câu

> **Route ở `app/`, nghiệp vụ ở `features/`, UI chung ở `components/`, hạ tầng ở `lib/`, type dùng chung ở `types/`, state React mỏng ở `contexts/` — không nhét logic domain vào Context hay vào `page.tsx`.**
