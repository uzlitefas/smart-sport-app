"use client";

import { useEffect } from "react";
import { Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

import { useSchoolsStore } from "@/store/schools-store";

import { SchoolFilter } from "./_components/school-filter";
import { SchoolTable } from "./_components/school-table";
import { SchoolPagination } from "./_components/school-pagination";
import { SchoolEmpty } from "./_components/school-empty";
import { SchoolCreate } from "./_components/school-create";

export default function SchoolCreatePage() {
  const {
    schools,
    loading,
    total,
    page,
    limit,
    getSchools,
  } = useSchoolsStore();

  useEffect(() => {
    getSchools();
  }, []);

  return (
    <div className="flex flex-col gap-6">

      {/* Header */}
      <div className="flex items-center justify-between">

        <div>
          <h1 className="text-2xl font-bold tracking-tight">
            Maktablar
          </h1>

          <p className="text-muted-foreground text-sm">
            Barcha sport maktablarini boshqarish
          </p>
        </div>

        <SchoolCreate type="create">
          <Button
            className="
            gap-2
            bg-[#3AE319]
            hover:bg-[#2FD113]
            text-black
            font-semibold
            "
          >
            <Plus className="h-4 w-4" />
            Create School
          </Button>
        </SchoolCreate>

      </div>

      {/* Filter */}
      <SchoolFilter />

      {/* Table */}
      <Card className="border-border/60 bg-background">

        <CardContent className="p-0">

          {schools.length === 0 && !loading ? (
            <SchoolEmpty />
          ) : (
            <SchoolTable />
          )}

        </CardContent>

      </Card>

      {/* Footer */}

      <div className="flex items-center justify-between">

        <p className="text-sm text-muted-foreground">
          Jami <span className="font-semibold">{total}</span> ta maktab
        </p>

        <SchoolPagination
          page={page}
          limit={limit}
          total={total}
        />

      </div>

    </div>
  );
}