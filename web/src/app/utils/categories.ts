export const categories = [
  "Muzyka",
  "Kultura",
  "Kulinarne",
  "Sport",
  "Towarzyskie",
  "Podróże",
];

export const categoryOptions = categories.map((category) => ({
  text: category,
  value: category,
}));

export function categoryImage(category: string) {
  return categories.includes(category)
    ? `/images/categoryImages/${encodeURIComponent(category)}.jpg`
    : "/images/placeholder.png";
}
