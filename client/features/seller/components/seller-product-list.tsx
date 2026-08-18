"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCartMoney } from "@/features/cart/utils/cart";
import ProductPhoto from "@/features/products/components/product-photo";
import { toCategorySlug } from "@/lib/slug";
import { Pencil, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { useSellerProducts } from "../hooks/use-seller-products";
import { filterSellerProducts } from "../utils/seller-products";
import SellerPageHeader from "./seller-page-header";

export default function SellerProductList() {
  const { products, categories, currency, removeProduct, toggleStock } =
    useSellerProducts();
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState("all");
  const [stock, setStock] = useState<"all" | "in" | "out">("all");
  const [deleteId, setDeleteId] = useState<string | null>(null);

  const filtered = useMemo(
    () => filterSellerProducts(products, query, category, stock),
    [products, query, category, stock],
  );

  const pending = products.find((product) => product._id === deleteId);

  return (
    <div className="flex flex-col gap-6">
      <SellerPageHeader
        title="Product list"
        description={`${filtered.length} of ${products.length} products`}
        action={
          <Button asChild>
            <Link href="/seller/products/add">
              <Plus className="size-4" />
              Add product
            </Link>
          </Button>
        }
      />

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <Input
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search products"
          className="h-11 sm:max-w-xs"
          type="search"
        />
        <Select value={category} onValueChange={setCategory}>
          <SelectTrigger className="w-full sm:w-44 h-11">
            <SelectValue placeholder="Category" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All categories</SelectItem>
            {categories.map((item) => (
              <SelectItem key={item.path} value={item.path}>
                {item.path}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
        <Select
          value={stock}
          onValueChange={(value) => setStock(value as "all" | "in" | "out")}
        >
          <SelectTrigger className="w-full sm:w-40 h-11">
            <SelectValue placeholder="Stock" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">All stock</SelectItem>
            <SelectItem value="in">In stock</SelectItem>
            <SelectItem value="out">Out of stock</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {filtered.length === 0 ? (
        <p className="text-sm text-muted-foreground border border-dashed border-border rounded-lg p-8 text-center">
          No products match these filters.
        </p>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Selling</TableHead>
              <TableHead>MRP</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((product) => {
              const href = `/products/${toCategorySlug(product.category)}/${product.slug}`;
              return (
                <TableRow key={product._id}>
                  <TableCell>
                    <div className="flex items-center gap-3 min-w-48">
                      <ProductPhoto
                        src={product.image[0]}
                        alt={product.name}
                        width={48}
                        height={48}
                        className="size-12 object-contain rounded border border-border bg-card shrink-0"
                      />
                      <div className="min-w-0">
                        <Link
                          href={href}
                          className="font-medium hover:text-primary line-clamp-1"
                        >
                          {product.name}
                        </Link>
                        <p className="text-xs text-muted-foreground">
                          {product.slug}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>{product.category}</TableCell>
                  <TableCell className="font-medium text-primary">
                    {formatCartMoney(currency, product.offerPrice)}
                  </TableCell>
                  <TableCell className="text-muted-foreground line-through">
                    {formatCartMoney(currency, product.price)}
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <Switch
                        checked={product.inStock}
                        onCheckedChange={(checked) => {
                          toggleStock(product._id, checked);
                          toast.success(
                            checked
                              ? `${product.name} is in stock`
                              : `${product.name} is out of stock`,
                          );
                        }}
                        aria-label={`Toggle stock for ${product.name}`}
                      />
                      <Badge variant={product.inStock ? "secondary" : "outline"}>
                        {product.inStock ? "In stock" : "Out"}
                      </Badge>
                    </div>
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-1">
                      <Button variant="ghost" size="icon" asChild>
                        <Link
                          href={`/seller/products/${product._id}/edit`}
                          aria-label={`Edit ${product.name}`}
                        >
                          <Pencil className="size-4" />
                        </Link>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        aria-label={`Delete ${product.name}`}
                        onClick={() => setDeleteId(product._id)}
                      >
                        <Trash2 className="size-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}

      <AlertDialog
        open={Boolean(deleteId)}
        onOpenChange={(open) => {
          if (!open) setDeleteId(null);
        }}
      >
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Delete product?</AlertDialogTitle>
            <AlertDialogDescription>
              {pending
                ? `${pending.name} will be removed from the storefront.`
                : "This product will be removed from the storefront."}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              onClick={() => {
                if (!deleteId) return;
                const name = pending?.name ?? "Product";
                removeProduct(deleteId);
                toast.success(`${name} deleted`);
                setDeleteId(null);
              }}
            >
              Delete
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
