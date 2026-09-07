import { useSearchParams } from "react-router";

export function useActivityFilters() {
  const [params, setParams] = useSearchParams();
  const changeFilter = (key: string, value: string) => {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        if (value) next.set(key, value);
        else next.delete(key);
        return next;
      },
      { replace: true },
    );
  };
  const changeDateRange = (from: string, to: string) => {
    setParams(
      (previous) => {
        const next = new URLSearchParams(previous);
        next.delete("date");
        for (const [key, value] of [
          ["from", from],
          ["to", to],
        ]) {
          if (value) next.set(key, value);
          else next.delete(key);
        }
        return next;
      },
      { replace: true },
    );
  };
  const hasFilters = [
    "q",
    "category",
    "city",
    "date",
    "from",
    "to",
    "status",
  ].some((key) => !!params.get(key));
  const clearFilters = () =>
    setParams(params.get("sort") ? { sort: params.get("sort")! } : {}, {
      replace: true,
    });

  return { params, changeFilter, changeDateRange, hasFilters, clearFilters };
}
