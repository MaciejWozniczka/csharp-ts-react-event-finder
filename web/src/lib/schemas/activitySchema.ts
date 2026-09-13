import { z } from "zod";

function notEmpty(requiredMessage: string) {
  return z.string().trim().min(1, { message: requiredMessage });
}

function notEmptyWithLimit(
  limit: number,
  limitMessage: string,
  requiredMessage: string,
) {
  return z
    .string()
    .max(limit, { message: limitMessage })
    .trim()
    .min(1, { message: requiredMessage });
}

export const activitySchema = z.object({
  title: notEmptyWithLimit(
    100,
    "Tytuł nie może być dłuższy niż 100 znaków",
    "Tytuł jest wymagany",
  ),
  description: notEmptyWithLimit(
    2000,
    "Tytuł nie może być dłuższy niż 2000 znaków",
    "Opis jest wymagany",
  ),
  category: notEmpty("Kategoria jest wymagana"),
  date: z.date({
    required_error: "Data jest wymagana",
    invalid_type_error: "Data jest wymagana",
  }),
  city: notEmptyWithLimit(
    100,
    "Tytuł nie może być dłuższy niż 100 znaków",
    "Miasto jest wymagane",
  ),
  venue: notEmptyWithLimit(
    100,
    "Tytuł nie może być dłuższy niż 100 znaków",
    "Miejsce jest wymagane",
  ),
});

export type ActivitySchema = z.infer<typeof activitySchema>;
