export const categories = [
  "Muzyka",
  "Kultura",
  "Kulinarne",
  "Sport",
  "Towarzyskie",
  "Podróże",
];

export function categoryImage(category: string) {
  return categories.includes(category)
    ? `/images/categoryImages/${encodeURIComponent(category)}.jpg`
    : "/images/placeholder.png";
}
