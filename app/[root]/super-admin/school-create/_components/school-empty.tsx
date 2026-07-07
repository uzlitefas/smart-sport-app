"use client";

import { School2, Plus } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";

import { SchoolCreate } from "./school-create";

export function SchoolEmpty() {
  return (
    <Card
      className="
        flex
        min-h-[420px]
        flex-col
        items-center
        justify-center
        border-dashed
        bg-background
      "
    >
      {/* Icon */}

      <div
        className="
          mb-6
          flex
          h-20
          w-20
          items-center
          justify-center
          rounded-full
          bg-[#3AE319]/10
        "
      >
        <School2
          className="
            h-10
            w-10
            text-[#3AE319]
          "
        />
      </div>

      {/* Title */}

      <h2 className="text-2xl font-bold">
        Maktablar topilmadi
      </h2>

      {/* Description */}

      <p
        className="
          mt-3
          max-w-md
          text-center
          text-sm
          leading-6
          text-muted-foreground
        "
      >
        Hozircha tizimda hech qanday maktab mavjud emas.
        Yangi maktab qo`shish uchun quyidagi tugmani bosing.
      </p>

      {/* Button */}

      <SchoolCreate type="create">
        <Button
          className="
            mt-8
            gap-2
            bg-[#3AE319]
            text-black
            hover:bg-[#2FD113]
          "
        >
          <Plus className="h-4 w-4" />
          Create School
        </Button>
      </SchoolCreate>
    </Card>
  );
}