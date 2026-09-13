import { format } from "date-fns";

export function formatDate(value: Date): string {
  return format(value, "dd.MM.yyyy HH:mm");
}
