"use client";

import { Search, RotateCcw } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";

import { SCHOOL_STATUS, useSchoolsStore } from "@/store/schools-store";

type Region = {
  id: number;
  name: string;
};

type District = {
  id: number;
  name: string;
};

type Props = {
  regions?: Region[];
  districts?: District[];
};

export function SchoolFilter({ regions = [], districts = [] }: Props) {
  const { filters, setFilters, resetFilters, getSchools } = useSchoolsStore();

  const [search, setSearch] = useState(filters.search ?? "");
  const [status, setStatus] = useState(filters.status);
  const [region, setRegion] = useState<number | undefined>(filters.region_id);
  const [district, setDistrict] = useState<number | undefined>(
    filters.district_id,
  );

  const onFilter = async () => {
    const newFilters = {
      page: 1,
      search,
      status,
      region_id: region,
      district_id: district,
    };

    setFilters(newFilters);

    await getSchools(newFilters);
  };

  const onReset = async () => {
    const defaultFilters = {
      page: 1,
      limit: 10,
      search: "",
      status: undefined,
      region_id: undefined,
      district_id: undefined,
      sort: "createdAt",
      order: "asc" as const,
    };

    resetFilters();

    setSearch("");
    setStatus(undefined);
    setRegion(undefined);
    setDistrict(undefined);

    await getSchools(defaultFilters);
  };

  return (
    <div
      className="
            rounded-xl
            border
            bg-card
            p-5
            shadow-sm
            "
    >
      <div className="grid gap-4 xl:grid-cols-5 lg:grid-cols-3 md:grid-cols-2">
        {/* Search */}

        <div className="relative">
          <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />

          <Input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Maktab qidirish..."
            className="pl-10"
          />
        </div>

        {/* Status */}

        <Select
          value={status}
          onValueChange={(v) => setStatus(v as keyof typeof SCHOOL_STATUS)}
        >
          <SelectTrigger>
            <SelectValue placeholder="Holat" />
          </SelectTrigger>

          <SelectContent>
            <SelectItem value="ACTIVE">ACTIVE</SelectItem>

            <SelectItem value="INACTIVE">INACTIVE</SelectItem>
          </SelectContent>
        </Select>

        {/* Region */}

        <Select
          value={region?.toString()}
          onValueChange={(v) => setRegion(Number(v))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Viloyat" />
          </SelectTrigger>

          <SelectContent>
            {regions.map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* District */}

        <Select
          value={district?.toString()}
          onValueChange={(v) => setDistrict(Number(v))}
        >
          <SelectTrigger>
            <SelectValue placeholder="Tuman" />
          </SelectTrigger>

          <SelectContent>
            {districts.map((item) => (
              <SelectItem key={item.id} value={item.id.toString()}>
                {item.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        {/* Buttons */}

        <div className="flex gap-2">
          <Button
            onClick={onFilter}
            className="
                        flex-1
                        bg-[#3AE319]
                        hover:bg-[#2FD113]
                        text-black
                        font-semibold
                        "
          >
            Filter
          </Button>

          <Button variant="outline" size="icon" onClick={onReset}>
            <RotateCcw className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
