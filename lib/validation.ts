import { z } from "zod";

export const createSchoolSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "School name must be at least 3 characters.")
    .max(100, "School name must not exceed 100 characters."),

  inn: z
    .string()
    .trim()
    .regex(/^\d{9}$/, "INN must contain exactly 9 digits."),

  phone_number: z
    .string()
    .trim()
    .regex(/^\+998\d{9}$/, "Phone number must be in the format +998901234567."),

  email: z.string().trim().email("Please enter a valid email address."),

  region_id: z
    .number({
      error: "Please select a region.",
    })
    .positive("Please select a region."),

  district_id: z
    .number({
      error: "Please select a district.",
    })
    .positive("Please select a district."),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters.")
    .max(255, "Address must not exceed 255 characters."),

  max_students_limit: z
    .number({
      error: "Student limit is required.",
    })
    .int("Student limit must be an integer.")
    .positive("Student limit must be greater than 0.")
    .max(100000, "Student limit is too large."),

  sport_types: z
    .array(z.number())
    .min(1, "Please select at least one sport type."),
});

export type CreateSchoolSchema = z.infer<typeof createSchoolSchema>;
