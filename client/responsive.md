# GreenCart — Hướng dẫn Responsive

Tài liệu này mô tả cách làm layout **hợp lý trên mọi màn hình** trong frontend `client/`, dùng Tailwind CSS v4 (mobile-first).

Mục tiêu không phải “nhồi đủ breakpoint”, mà là:

- Mobile đọc và bấm được
- Tablet không bị thừa/thiếu khoảng trống
- Desktop tận dụng bề ngang mà card/text không bị kéo méo
- Cùng một component, không copy 2 bản UI trừ khi layout thật sự khác (navbar, banner)

---

## 1. Tư duy đúng: mobile-first

Class **không có prefix** là style mặc định cho mobile. Prefix chỉ **thêm** khi màn hình đủ lớn.

```tsx
// Đúng: mặc định 1 cột, từ md trở lên 2 cột
<div className="flex flex-col md:flex-row gap-4">

// Sai: viết desktop trước rồi override ngược
<div className="flex flex-row max-md:flex-col">
```

Hỏi theo thứ tự này khi chỉnh UI:

1. Trên điện thoại (~375px) còn dùng được không?
2. Khoảng trống giữa các item có đều không, hay card bị khóa width?
3. Chữ/nút có đủ lớn để bấm (tối thiểu ~44px) không?
4. Có đang ẩn nội dung quan trọng trên mobile không?

---

## 2. Breakpoint dùng trong project

Tailwind mặc định (min-width):

| Prefix | Từ | Dùng cho |
|---|---|---|
| (không prefix) | 0 | Điện thoại |
| `sm` | 640px | Điện thoại lớn / máy nhỏ ngang |
| `md` | 768px | Tablet, bắt đầu hiện nav desktop |
| `lg` | 1024px | Laptop |
| `xl` | 1280px | Màn rộng |
| `2xl` | 1536px | Rất rộng — **hiếm khi cần** |

GreenCart gần như chỉ cần `sm` / `md` / `lg` / `xl`.

Đừng nhảy cóc vô nghĩa:

```tsx
// Không cần
grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 2xl:grid-cols-4

// Đủ
grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5
```

`md:grid-cols-2` trùng `sm` thì bỏ `md`.

---

## 3. Padding trang — một nguồn sự thật

Khoảng lề trái/phải phải **cùng hệ** trên navbar, main, footer, 404.

Hiện tại:

```tsx
px-6 md:px-16 lg:px-24 xl:px-32
```

| Màn | Padding ngang |
|---|---|
| Mobile | `px-6` (24px) — đừng để 0, card sẽ dính mép |
| `md` | `64px` |
| `lg` | `96px` |
| `xl` | `128px` |

Quy tắc:

- Navbar / footer / 404 header dùng **cùng** bộ class này
- `main` trong `app-layout` đang thiếu `px-6` trên mobile — khi sửa layout, thêm `px-6` cho khớp navbar
- Không nhồi thêm `px-4` lung tung trong từng page nếu layout đã padding

Sai:

```tsx
<main className="md:px-16">
  <div className="px-8 md:px-20 lg:px-40">  {/* lệch với navbar */}
```

---

## 4. Grid sản phẩm (bài học từ ProductCard)

### 4.1 Card phải fill cột, đừng khóa width

Sai — card cố `224px` trong cột rộng hơn, mỗi ô còn khoảng trống lệch:

```tsx
className="min-w-56 max-w-56 w-full"
<div className="grid grid-cols-4 gap-4">
```

Đúng — card chiếm hết track của grid:

```tsx
className="w-full h-full"
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
```

`h-full` để các card cùng hàng cao bằng nhau.

### 4.2 Số cột hợp lý cho grocery card

Card có ảnh + tên + giá + nút. Trên mobile **2 cột** là chuẩn. 1 cột thì phí diện tích; 3 cột trên 375px thì chữ/nút bị bóp.

| Màn | Cột | Gap |
|---|---|---|
| Mobile | 2 | `gap-3` (12px) |
| `sm` | 3 | `gap-4` |
| `lg` | 4 | `gap-5` |
| `xl` | 5 | `gap-5` |

Gap tăng nhẹ theo màn — đừng `gap-10` trên desktop rồi `gap-1` trên mobile.

Công thức nhanh: **gap ≈ 12–20px**. Lớn hơn làm lưới thưa; nhỏ hơn làm card dính nhau.

### 4.3 Ảnh trong card

Khi card co giãn theo cột, ảnh dùng `w-full object-contain` (hoặc `object-cover` + chiều cao cố định), **không** `max-w-26` cứng — ảnh sẽ nhỏ giữa card rộng.

```tsx
<Image className="w-full h-28 md:h-36 object-contain" ... />
```

---

## 5. Flex: chồng trên mobile, hàng trên desktop

Pattern lặp lại trong project (product detail, 404, auth, footer):

```tsx
<div className="flex flex-col md:flex-row gap-6 md:gap-10 lg:gap-16">
  <div className="w-full md:w-1/2">...</div>
  <div className="w-full md:w-1/2">...</div>
</div>
```

Quy tắc:

- Mobile: `flex-col` — đọc từ trên xuống
- `md` trở lên: `flex-row` khi 2 cột vẫn đủ rộng (~350px/cột)
- Nút CTA: `flex-col sm:flex-row` + `w-full` trên mobile

```tsx
<div className="flex flex-col sm:flex-row gap-3">
  <button className="w-full sm:w-auto px-8 py-3">Add to Cart</button>
  <button className="w-full sm:w-auto px-8 py-3">Buy now</button>
</div>
```

`gap` trên flex cũng scale: `gap-4 md:gap-8`, không `gap-16` trên mobile.

---

## 6. Ẩn / hiện — chỉ khi layout thật sự khác

Dùng `hidden` / `md:flex` khi **cấu trúc** đổi (menu desktop vs hamburger), không dùng để nhồi 2 bản nội dung giống nhau.

Đúng (navbar):

```tsx
<div className="hidden sm:flex">...menu desktop...</div>
<button className="sm:hidden" aria-label="Menu">...</button>
```

Đúng (banner ảnh khác nhau vì crop):

```tsx
<Image className="w-full hidden md:block" src={bannerDesktop} />
<Image className="w-full md:hidden" src={bannerMobile} />
```

Sai — copy 2 heading:

```tsx
<h1 className="md:hidden">Freshness...</h1>
<h1 className="hidden md:block">Freshness You Can Trust...</h1>
```

Chỉ cần một heading + `text-3xl md:text-5xl`.

---

## 7. Chữ

Scale **một bậc**, không nhảy 3 size:

| Vai trò | Mobile | Desktop |
|---|---|---|
| Hero | `text-3xl` | `md:text-4xl lg:text-5xl` |
| Section | `text-2xl` | `md:text-3xl` |
| Body | `text-sm` / `text-base` | `md:text-lg` (chỉ đoạn lead) |
| Caption | `text-xs` | `md:text-sm` |

Input trên iOS: giữ `text-base` (16px) trên mobile — nhỏ hơn Safari sẽ zoom khi focus. shadcn Input đã làm `text-base md:text-sm`.

`truncate` cho tên sản phẩm trong card. Không truncate heading trang.

---

## 8. Touch target

Ngón tay cần ~44×44px.

```tsx
// Đủ
className="h-11 px-4"          // 44px
className="py-3.5 w-full"      // nút full-width mobile

// Nguy hiểm
className="h-6 w-6"            // icon-only, quá nhỏ
className="text-[10px] p-1"
```

Chip category (`px-4 py-2`) chấp nhận được vì vùng bấm rộng theo chữ. Icon navbar nên `size-8` hoặc thêm padding.

---

## 9. Ảnh và media

- Banner full-width: `w-full`, chiều cao theo ảnh hoặc `aspect-[16/6]`
- Overlay chữ trên ảnh: trên mobile căn giữa/bottom; desktop mới `md:items-start md:pl-24`
- Ảnh overlay **không đổi màu theo theme** (banner kem) → chữ phải luôn tối (`text-stone-800`), không dùng `text-foreground`
- `next/image`: luôn `width`/`height` hoặc `fill` + parent `relative`

Product detail thumbnails: cột dọc `flex-col gap-3`, ảnh lớn `max-w-full`. Trên mobile có thể `flex-row overflow-x-auto` nếu nhiều ảnh — chỉ đổi khi 4+ thumbnail bị đẩy layout.

---

## 10. Container vs full-bleed

| Loại | Cách |
|---|---|
| Nội dung (list, form, heading) | Nằm trong padding layout |
| Banner full-bleed | Negative margin hoặc để ngoài `main` padding |
| Form auth | `w-full max-w-md` + `px-4` trên layout auth |

`max-w-*` dùng cho **độ dài dòng chữ / form**, không khóa card trong grid.

```tsx
// Form, prose
className="w-full max-w-md mx-auto"

// Grid card: không max-w trên item
className="w-full"
```

---

## 11. Checklist trước khi merge UI

1. Chrome DevTools: 375 / 768 / 1280. Không chỉ desktop.
2. Grid: card có fill cột không, hay còn lỗ trống vì `max-w-*`?
3. Padding trái navbar có khớp nội dung bên dưới không?
4. Nút/link trên mobile có bấm trượt không (quá nhỏ / chồng nhau)?
5. Có `hidden md:block` copy nội dung kép không?
6. Ảnh có bị vỡ / crop chữ trên banner mobile không?
7. Dark mode: chỗ nào nằm trên **ảnh sáng** thì không dùng token `foreground`.

---

## 12. Pattern copy-paste cho GreenCart

**Product grid**

```tsx
<div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-3 sm:gap-4 md:gap-5">
```

**Section title**

```tsx
<p className="text-2xl md:text-3xl font-medium text-foreground">
```

**Hai cột (detail, footer)**

```tsx
<div className="flex flex-col md:flex-row items-start gap-8 md:gap-12">
```

**Page gutter**

```tsx
className="px-6 md:px-16 lg:px-24 xl:px-32"
```

**CTA**

```tsx
className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3"
```

---

## 13. Tóm tắt

> Viết mobile trước. Dùng ít breakpoint. Cho phần tử **co theo cột** (`w-full`), đừng khóa `max-w` trong grid. Padding trang thống nhất. Ẩn/hiện chỉ khi layout đổi. Gap 12–20px. Nút đủ lớn để bấm.
