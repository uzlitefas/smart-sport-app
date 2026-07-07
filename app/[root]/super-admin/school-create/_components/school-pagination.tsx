"use client";

import {
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
} from "@/components/ui/pagination";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import { Button } from "@/components/ui/button";

import { useSchoolsStore } from "@/store/schools-store";

type Props = {
  page: number;
  limit: number;
  total: number;
};

export function SchoolPagination({
  page,
  limit,
  total,
}: Props) {
  const { setFilters, getSchools } = useSchoolsStore();

  const totalPages = Math.max(1, Math.ceil(total / limit));

  const changePage = async (newPage: number) => {
    if (newPage < 1 || newPage > totalPages) return;

    setFilters({
      page: newPage,
    });

    await getSchools();
  };

  const changeLimit = async (value: string) => {
    setFilters({
      page: 1,
      limit: Number(value),
    });

    await getSchools();
  };

  const start = total === 0 ? 0 : (page - 1) * limit + 1;
  const end = Math.min(page * limit, total);

  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">

      {/* Left */}

      <div className="flex items-center gap-3 text-sm text-muted-foreground">

        <span>
          {start}-{end} / {total}
        </span>

        <div className="flex items-center gap-2">

          <span>Qator</span>

          <Select
            value={String(limit)}
            onValueChange={changeLimit}
          >
            <SelectTrigger className="w-20">
              <SelectValue />
            </SelectTrigger>

            <SelectContent>

              <SelectItem value="10">
                10
              </SelectItem>

              <SelectItem value="20">
                20
              </SelectItem>

              <SelectItem value="30">
                30
              </SelectItem>

              <SelectItem value="50">
                50
              </SelectItem>

            </SelectContent>
          </Select>

        </div>

      </div>

      {/* Right */}

      <Pagination>

        <PaginationContent>

          <PaginationItem>

            <Button
              variant="outline"
              size="icon"
              disabled={page === 1}
              onClick={() => changePage(page - 1)}
            >
              <ChevronLeft className="h-4 w-4" />
            </Button>

          </PaginationItem>

          {Array.from({ length: totalPages }).map((_, index) => {
            const current = index + 1;

            return (
              <PaginationItem key={current}>
                <PaginationLink
                  isActive={current === page}
                  onClick={() => changePage(current)}
                  className="cursor-pointer"
                >
                  {current}
                </PaginationLink>
              </PaginationItem>
            );
          })}

          <PaginationItem>

            <Button
              variant="outline"
              size="icon"
              disabled={page === totalPages}
              onClick={() => changePage(page + 1)}
            >
              <ChevronRight className="h-4 w-4" />
            </Button>

          </PaginationItem>

        </PaginationContent>

      </Pagination>

    </div>
  );
}