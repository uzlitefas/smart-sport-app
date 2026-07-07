"use client";

import { ColumnDef } from "@tanstack/react-table";
import { Pencil, Trash2 } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

import { School } from "@/store/schools-store";

import { SchoolCreate } from "./school-create";
import { SchoolDelete } from "./school-delete";

export const schoolColumns: ColumnDef<School>[] = [
  {
    id: "index",
    header: "#",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.index + 1}
      </span>
    ),
    enableSorting: false,
    enableHiding: false,
    size: 50,
  },

  {
    accessorKey: "name",
    header: "Maktab nomi",
    cell: ({ row }) => (
      <div className="font-medium whitespace-nowrap">
        {row.original.name}
      </div>
    ),
  },

  {
    accessorKey: "inn",
    header: "INN",
    cell: ({ row }) => (
      <span className="text-muted-foreground">
        {row.original.inn}
      </span>
    ),
  },

  {
    accessorKey: "phone_number",
    header: "Telefon",
    cell: ({ row }) => row.original.phone_number,
  },

  {
    accessorKey: "max_students_limit",
    header: "Limit",
    cell: ({ row }) => (
      <span>{row.original.max_students_limit}</span>
    ),
  },

  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => {
      const active = row.original.status === "ACTIVE";

      return (
        <Badge
          variant="outline"
          className={
            active
              ? "border-green-600 bg-green-500/15 text-green-500"
              : "border-red-600 bg-red-500/15 text-red-500"
          }
        >
          {row.original.status}
        </Badge>
      );
    },
  },

  // Hozircha API region va district nomini qaytarmasa placeholder.
  // Keyinchalik backend region_name va district_name yuborsa shu joyni almashtirasiz.

  {
    id: "region",
    header: "Viloyat",
    cell: () => (
      <span className="text-muted-foreground">
        —
      </span>
    ),
  },

  {
    id: "district",
    header: "Tuman",
    cell: () => (
      <span className="text-muted-foreground">
        —
      </span>
    ),
  },

  {
    id: "actions",
    header: () => (
      <div className="text-right">
        Amallar
      </div>
    ),

    cell: ({ row }) => {
      const school = row.original;

      return (
        <div className="flex justify-end gap-2">

          <SchoolCreate
            type="edit"
            school={school}
          >
            <Button
              size="icon"
              variant="outline"
              className="
              h-8
              w-8
              border-green-600/30
              hover:bg-green-500/10
              "
            >
              <Pencil className="h-4 w-4 text-green-500" />
            </Button>
          </SchoolCreate>

          <SchoolDelete school={school}>
            <Button
              size="icon"
              variant="outline"
              className="
              h-8
              w-8
              border-red-600/30
              hover:bg-red-500/10
              "
            >
              <Trash2 className="h-4 w-4 text-red-500" />
            </Button>
          </SchoolDelete>

        </div>
      );
    },
    enableSorting: false,
  },
];