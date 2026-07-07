"use client";

import { ReactNode, useEffect, useState } from "react";
import { Loader2, School2 } from "lucide-react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Label } from "@/components/ui/label";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";

import { Button } from "@/components/ui/button";
import { zodResolver } from "@hookform/resolvers/zod";
import { School, CreateSchool, useSchoolsStore } from "@/store/schools-store";

import { Input } from "@/components/ui/input";

import { Textarea } from "@/components/ui/textarea";

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { createSchoolSchema } from "@/lib/validation";

type SchoolCreateProps = {
  children: ReactNode;
  type: "create" | "edit";
  school?: School;
};

export function SchoolCreate({ children, type, school }: SchoolCreateProps) {
  const [open, setOpen] = useState(false);

  const { loading, createSchool, updateSchool } = useSchoolsStore();

  /**
   * Validation keyin qo'shiladi
   */

  const form = useForm<CreateSchool>({
    resolver: zodResolver(createSchoolSchema),
    defaultValues: {
      name: "",
      inn: "",
      phone_number: "",
      email: "",
      region_id: 0,
      district_id: 0,
      address: "",
      max_students_limit: 0,
      sport_types: [],
    },
  });

  /**
   * Edit Mode
   */

  useEffect(() => {
    if (type !== "edit") return;

    if (!school) return;

    form.reset({
      name: school.name,
      inn: school.inn,
      phone_number: school.phone_number,
      email: school.email,
      region_id: school.region_id,
      district_id: school.district_id,
      address: school.address,
      max_students_limit: school.max_students_limit,
      sport_types: school.sport_types,
    });
  }, [school, type]);

  /**
   * Sheet Close
   */

  useEffect(() => {
    if (!open) {
      form.reset({
        name: "",
        inn: "",
        phone_number: "",
        email: "",
        region_id: 0,
        district_id: 0,
        address: "",
        max_students_limit: 0,
        sport_types: [],
      });
    }
  }, [open]);

  /**
   * Submit
   * (logic 3-qismda yoziladi)
   */

  const onSubmit = async (values: CreateSchool) => {
    let success = false;

    if (type === "create") {
      success = await createSchool(values);
    }

    if (type === "edit" && school) {
      success = await updateSchool(school.id, values);
    }

    if (!success) return;

    form.reset();

    setOpen(false);

    // TODO
    // toast.success(
    //   type === "create"
    //     ? "School created successfully."
    //     : "School updated successfully."
    // );
  };
  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>{children}</SheetTrigger>

      <SheetContent side="right" className="sm:max-w-xl overflow-y-auto">
        <SheetHeader>
          <div className="flex items-center gap-3">
            <div
              className="
              flex
              h-10
              w-10
              items-center
              justify-center
              rounded-lg
              bg-[#3AE319]/15
              "
            >
              <School2
                className="
                h-5
                w-5
                text-[#3AE319]
                "
              />
            </div>

            <div>
              <SheetTitle>
                {type === "create" ? "Create School" : "Edit School"}
              </SheetTitle>

              <SheetDescription>
                {type === "create"
                  ? "Yangi sport maktabini qo'shing."
                  : "Maktab ma'lumotlarini yangilang."}
              </SheetDescription>
            </div>
          </div>
        </SheetHeader>

        <form onSubmit={form.handleSubmit(onSubmit)} className="mt-8 space-y-6">
          <div className="grid gap-5">
            {/* School Name */}

            <div className="space-y-2">
              <Label htmlFor="name">School Name</Label>

              <Input
                id="name"
                placeholder="School name"
                {...form.register("name")}
              />

              {form.formState.errors.name && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.name.message}
                </p>
              )}
            </div>

            {/* INN */}

            <div className="space-y-2">
              <Label htmlFor="inn">INN</Label>

              <Input
                id="inn"
                placeholder="123456789"
                {...form.register("inn")}
              />

              {form.formState.errors.inn && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.inn.message}
                </p>
              )}
            </div>

            {/* Phone */}

            <div className="space-y-2">
              <Label htmlFor="phone_number">Phone Number</Label>

              <Input
                id="phone_number"
                placeholder="+998901234567"
                {...form.register("phone_number")}
              />

              {form.formState.errors.phone_number && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.phone_number.message}
                </p>
              )}
            </div>

            {/* Email */}

            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>

              <Input
                id="email"
                type="email"
                placeholder="school@gmail.com"
                {...form.register("email")}
              />

              {form.formState.errors.email && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.email.message}
                </p>
              )}
            </div>

            {/* Region */}

            <div className="space-y-2">
              <Label>Region</Label>

              <Controller
                control={form.control}
                name="region_id"
                render={({ field }) => (
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select region" />
                    </SelectTrigger>

                    <SelectContent>
                      {/* TODO: Region Store */}
                      <SelectItem value="1">Toshkent</SelectItem>
                      <SelectItem value="2">Samarqand</SelectItem>
                      <SelectItem value="3">Farg`ona</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {form.formState.errors.region_id && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.region_id.message}
                </p>
              )}
            </div>

            {/* District */}

            <div className="space-y-2">
              <Label>District</Label>

              <Controller
                control={form.control}
                name="district_id"
                render={({ field }) => (
                  <Select
                    value={field.value ? String(field.value) : ""}
                    onValueChange={(value) => field.onChange(Number(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select district" />
                    </SelectTrigger>

                    <SelectContent>
                      {/* TODO: District Store */}
                      <SelectItem value="1">Yunusobod</SelectItem>
                      <SelectItem value="2">Chilonzor</SelectItem>
                      <SelectItem value="3">Sergeli</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {form.formState.errors.district_id && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.district_id.message}
                </p>
              )}
            </div>

            {/* Address */}

            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>

              <Textarea
                id="address"
                rows={4}
                placeholder="School address..."
                {...form.register("address")}
              />

              {form.formState.errors.address && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.address.message}
                </p>
              )}
            </div>

            {/* Max Students */}

            <div className="space-y-2">
              <Label htmlFor="max_students_limit">Max Students</Label>

              <Input
                id="max_students_limit"
                type="number"
                {...form.register("max_students_limit", {
                  valueAsNumber: true,
                })}
              />

              {form.formState.errors.max_students_limit && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.max_students_limit.message}
                </p>
              )}
            </div>

            {/* Sport Types */}

            <div className="space-y-2">
              <Label>Sport Type</Label>

              <Controller
                control={form.control}
                name="sport_types"
                render={({ field }) => (
                  <Select
                    value={field.value?.[0]?.toString()}
                    onValueChange={(value) => field.onChange([Number(value)])}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select sport type" />
                    </SelectTrigger>

                    <SelectContent>
                      {/* TODO: Sport Types Store */}
                      <SelectItem value="1">Football</SelectItem>
                      <SelectItem value="2">Boxing</SelectItem>
                      <SelectItem value="3">Judo</SelectItem>
                      <SelectItem value="4">Taekwondo</SelectItem>
                    </SelectContent>
                  </Select>
                )}
              />

              {form.formState.errors.sport_types && (
                <p className="text-sm text-destructive">
                  {form.formState.errors.sport_types.message}
                </p>
              )}
            </div>
          </div>

          <div className="sticky bottom-0 mt-8 border-t bg-background pt-6">
            <div className="flex justify-end gap-3">
              <Button
                type="button"
                variant="outline"
                onClick={() => setOpen(false)}
                disabled={loading}
              >
                Cancel
              </Button>

              <Button
                type="submit"
                disabled={loading}
                className="min-w-[170px] bg-[#3AE319] text-black hover:bg-[#2FD113]"
              >
                {loading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {type === "create" ? "Creating..." : "Updating..."}
                  </>
                ) : type === "create" ? (
                  "Create School"
                ) : (
                  "Update School"
                )}
              </Button>
            </div>
          </div>
        </form>
      </SheetContent>
    </Sheet>
  );
}
