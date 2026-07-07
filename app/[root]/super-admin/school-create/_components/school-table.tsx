"use client";

import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { useSchoolsStore } from "@/store/schools-store";
import { schoolColumns } from "./school-columns";

export function SchoolTable() {
  const { schools, loading } = useSchoolsStore();

  const table = useReactTable({
    data: schools,
    columns: schoolColumns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (loading) {
    return (
      <div className="flex h-[450px] items-center justify-center">
        <div className="text-sm text-muted-foreground">
          Maktablar yuklanmoqda...
        </div>
      </div>
    );
  }

  return (
    <div className="overflow-hidden rounded-xl border">
      <div className="overflow-x-auto">

        <Table>

          <TableHeader className="bg-muted/40">

            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>

                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="
                      h-12
                      whitespace-nowrap
                      font-semibold
                      text-foreground
                    "
                  >
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                ))}

              </TableRow>
            ))}

          </TableHeader>

          <TableBody>

            {table.getRowModel().rows.map((row) => (

              <TableRow
                key={row.id}
                className="
                  transition-colors
                  hover:bg-muted/40
                "
              >
                {row.getVisibleCells().map((cell) => (

                  <TableCell
                    key={cell.id}
                    className="
                      py-3
                      whitespace-nowrap
                    "
                  >
                    {flexRender(
                      cell.column.columnDef.cell,
                      cell.getContext()
                    )}
                  </TableCell>

                ))}
              </TableRow>

            ))}

          </TableBody>

        </Table>

      </div>
    </div>
  );
}