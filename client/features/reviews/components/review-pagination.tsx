"use client";

import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
} from "@/components/ui/pagination";
import { ChevronLeftIcon, ChevronRightIcon } from "lucide-react";

type ReviewPaginationProps = {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
};

export default function ReviewPagination({
  currentPage,
  totalPages,
  onPageChange,
}: ReviewPaginationProps) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <Pagination className="mt-8">
      <PaginationContent>
        <PaginationItem>
          <Button
            type="button"
            variant="ghost"
            size="default"
            disabled={currentPage === 1}
            onClick={() => onPageChange(currentPage - 1)}
            aria-label="Go to previous page"
          >
            <ChevronLeftIcon />
            <span className="hidden sm:block">Previous</span>
          </Button>
        </PaginationItem>
        {pages.map((page) => (
          <PaginationItem key={page}>
            <Button
              type="button"
              variant={page === currentPage ? "outline" : "ghost"}
              size="icon"
              onClick={() => onPageChange(page)}
              aria-current={page === currentPage ? "page" : undefined}
            >
              {page}
            </Button>
          </PaginationItem>
        ))}
        <PaginationItem>
          <Button
            type="button"
            variant="ghost"
            size="default"
            disabled={currentPage === totalPages}
            onClick={() => onPageChange(currentPage + 1)}
            aria-label="Go to next page"
          >
            <span className="hidden sm:block">Next</span>
            <ChevronRightIcon />
          </Button>
        </PaginationItem>
      </PaginationContent>
    </Pagination>
  );
}
