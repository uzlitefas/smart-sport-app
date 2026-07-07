"use client";

import { ReactNode, useState } from "react";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

import { School, useSchoolsStore } from "@/store/schools-store";

type Props = {
  school: School;
  children: ReactNode;
};

export function SchoolDelete({
  school,
  children,
}: Props) {
  const [open, setOpen] = useState(false);

  const { deleteSchool, loading } = useSchoolsStore();

  const handleDelete = async () => {
    const success = await deleteSchool(school.id);

    if (success) {
      setOpen(false);
    }
  };

  return (
    <AlertDialog
      open={open}
      onOpenChange={setOpen}
    >
      <AlertDialogTrigger asChild>
        {children}
      </AlertDialogTrigger>

      <AlertDialogContent>

        <AlertDialogHeader>

          <AlertDialogTitle>
            Maktabni o`chirish
          </AlertDialogTitle>

          <AlertDialogDescription>
            <span className="font-semibold">
              {school.name}
            </span>{" "}
            maktabini o`chirmoqchimisiz?

            <br />
            <br />

            Bu amalni ortga qaytarib bo`lmaydi.
          </AlertDialogDescription>

        </AlertDialogHeader>

        <AlertDialogFooter>

          <AlertDialogCancel disabled={loading}>
            Bekor qilish
          </AlertDialogCancel>

          <AlertDialogAction
            disabled={loading}
            onClick={(e) => {
              e.preventDefault();
              handleDelete();
            }}
            className="
              bg-red-600
              hover:bg-red-700
              text-white
            "
          >
            {loading
              ? "O'chirilmoqda..."
              : "O'chirish"}
          </AlertDialogAction>

        </AlertDialogFooter>

      </AlertDialogContent>
    </AlertDialog>
  );
}