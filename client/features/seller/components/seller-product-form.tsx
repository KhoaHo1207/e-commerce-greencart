"use client";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { assets } from "@/constants/assets";
import ProductPhoto from "@/features/products/components/product-photo";
import type { Category } from "@/features/categories/types/category.types";
import type { Product, ProductImage } from "@/features/products/types/product.types";
import { zodResolver } from "@hookform/resolvers/zod";
import { Loader2, X } from "lucide-react";
import { useRef, useState } from "react";
import { Controller, useForm } from "react-hook-form";
import {
  SELLER_PRODUCT_MAX_IMAGES,
  sellerProductSchema,
  type SellerProductSchema,
} from "../schemas/seller-product.schema";
import { filesToDataUrls } from "../utils/seller-products";

export default function SellerProductForm({
  product,
  categories,
  onSubmit,
  submitLabel,
}: {
  product?: Product;
  categories: Category[];
  onSubmit: (values: SellerProductSchema, images: ProductImage[]) => void;
  submitLabel: string;
}) {
  const fileRef = useRef<HTMLInputElement>(null);
  const [images, setImages] = useState<ProductImage[]>(product?.image ?? []);

  const form = useForm<SellerProductSchema>({
    resolver: zodResolver(sellerProductSchema),
    defaultValues: {
      name: product?.name ?? "",
      category: product?.category ?? categories[0]?.path ?? "",
      price: product?.price ?? 0,
      offerPrice: product?.offerPrice ?? 0,
      description: product?.description.join("\n") ?? "",
      inStock: product?.inStock ?? true,
    },
    mode: "onChange",
  });

  async function handleFiles(fileList: FileList | null) {
    if (!fileList?.length) return;
    const remaining = SELLER_PRODUCT_MAX_IMAGES - images.length;
    if (remaining <= 0) return;
    const next = Array.from(fileList).slice(0, remaining);
    const urls = await filesToDataUrls(next);
    setImages((prev) => [...prev, ...urls].slice(0, SELLER_PRODUCT_MAX_IMAGES));
  }

  return (
    <form
      onSubmit={form.handleSubmit((values) => onSubmit(values, images))}
      className="max-w-2xl"
      noValidate
    >
      <FieldSet>
        <FieldLegend className="sr-only">{submitLabel}</FieldLegend>
        <FieldGroup>
          <Controller
            name="name"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="product-name">Name</FieldLabel>
                <Input
                  {...field}
                  id="product-name"
                  aria-invalid={fieldState.invalid}
                  placeholder="Potato 500g"
                  className="h-11"
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </Field>
            )}
          />

          <Controller
            name="category"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel>Category</FieldLabel>
                <Select value={field.value} onValueChange={field.onChange}>
                  <SelectTrigger className="w-full h-11">
                    <SelectValue placeholder="Select a category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.map((category) => (
                      <SelectItem key={category.path} value={category.path}>
                        {category.path}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </Field>
            )}
          />

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
            <Controller
              name="price"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="product-price">Price</FieldLabel>
                  <Input
                    id="product-price"
                    type="number"
                    min={0}
                    step="0.01"
                    aria-invalid={fieldState.invalid}
                    value={Number.isFinite(field.value) ? field.value : ""}
                    onChange={(event) =>
                      field.onChange(
                        event.target.value === ""
                          ? 0
                          : Number(event.target.value),
                      )
                    }
                    className="h-11"
                  />
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : null}
                </Field>
              )}
            />
            <Controller
              name="offerPrice"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="product-offer">Offer price</FieldLabel>
                  <Input
                    id="product-offer"
                    type="number"
                    min={0}
                    step="0.01"
                    aria-invalid={fieldState.invalid}
                    value={Number.isFinite(field.value) ? field.value : ""}
                    onChange={(event) =>
                      field.onChange(
                        event.target.value === ""
                          ? 0
                          : Number(event.target.value),
                      )
                    }
                    className="h-11"
                  />
                  {fieldState.invalid ? (
                    <FieldError errors={[fieldState.error]} />
                  ) : null}
                </Field>
              )}
            />
          </div>

          <Controller
            name="description"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="product-description">
                  Description
                </FieldLabel>
                <Textarea
                  {...field}
                  id="product-description"
                  rows={5}
                  aria-invalid={fieldState.invalid}
                  placeholder={"Fresh and organic\nRich in carbohydrates"}
                />
                <FieldDescription>
                  One bullet per line. Shown on the product page.
                </FieldDescription>
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </Field>
            )}
          />

          <Field>
            <FieldLabel>Images</FieldLabel>
            <FieldDescription>
              Up to {SELLER_PRODUCT_MAX_IMAGES} photos. Uploads stay in this
              browser session (demo).
            </FieldDescription>
            <input
              ref={fileRef}
              type="file"
              accept="image/*"
              multiple
              className="sr-only"
              onChange={(event) => {
                void handleFiles(event.target.files);
                event.target.value = "";
              }}
            />
            <ul className="flex flex-wrap gap-3 mt-1">
              {images.map((image, index) => (
                <li key={`${index}-${typeof image === "string" ? image.slice(0, 24) : image.src}`} className="relative">
                  <ProductPhoto
                    src={image}
                    alt={`Product image ${index + 1}`}
                    width={96}
                    height={96}
                    className="size-24 object-contain rounded-md border border-border bg-card"
                  />
                  <button
                    type="button"
                    className="absolute -top-1.5 -right-1.5 size-6 rounded-full bg-background border border-border flex items-center justify-center"
                    aria-label={`Remove image ${index + 1}`}
                    onClick={() =>
                      setImages((prev) => prev.filter((_, i) => i !== index))
                    }
                  >
                    <X className="size-3.5" />
                  </button>
                </li>
              ))}
              {images.length < SELLER_PRODUCT_MAX_IMAGES ? (
                <li>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="size-24 rounded-md border border-dashed border-border overflow-hidden bg-muted/40"
                    aria-label="Upload product image"
                  >
                    <ProductPhoto
                      src={assets.upload_area}
                      alt=""
                      width={96}
                      height={96}
                      className="size-full object-cover"
                    />
                  </button>
                </li>
              ) : null}
            </ul>
          </Field>

          <Controller
            name="inStock"
            control={form.control}
            render={({ field }) => (
              <Field orientation="horizontal" className="items-center">
                <Switch
                  id="product-stock"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
                <FieldLabel htmlFor="product-stock" className="font-normal">
                  In stock
                </FieldLabel>
              </Field>
            )}
          />
        </FieldGroup>
      </FieldSet>

      <Button
        type="submit"
        className="mt-6 h-11"
        disabled={form.formState.isSubmitting}
      >
        {form.formState.isSubmitting ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          submitLabel
        )}
      </Button>
    </form>
  );
}
