function normalize(value: string) {
  return value
    .toLocaleLowerCase("pl")
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/ł/g, "l")
    .trim();
}

function localDate(value: string) {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return "";
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

export function filterActivities(
  activities: Activity[],
  params: URLSearchParams,
) {
  const query = normalize(params.get("q") ?? "");
  const from = params.get("from") ?? params.get("date") ?? "";
  const to = params.get("to") ?? params.get("date") ?? "";
  return activities
    .filter((activity) => {
      if (
        query &&
        !normalize(
          [
            activity.title,
            activity.description,
            activity.city,
            activity.venue,
            activity.category,
          ].join(" "),
        ).includes(query)
      )
        return false;
      if (
        params.get("category") &&
        activity.category !== params.get("category")
      )
        return false;
      if (params.get("city") && activity.city !== params.get("city"))
        return false;
      const day = localDate(activity.date);
      if ((from || to) && !day) return false;
      if (from && day < from) return false;
      if (to && day > to) return false;
      if (params.get("status") === "active" && activity.isCancelled)
        return false;
      if (params.get("status") === "cancelled" && !activity.isCancelled)
        return false;
      return true;
    })
    .sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();
      if (Number.isNaN(timeA)) return Number.isNaN(timeB) ? 0 : 1;
      if (Number.isNaN(timeB)) return -1;
      return params.get("sort") === "desc" ? timeB - timeA : timeA - timeB;
    });
}
