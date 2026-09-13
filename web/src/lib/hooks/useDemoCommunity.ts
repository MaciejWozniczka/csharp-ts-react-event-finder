import { useSyncExternalStore } from "react";

import type {
  DemoComment,
  DemoCommunity,
  DemoProfile,
} from "../types/demoCommunity";

const storageKey = "event-finder:demo-community:v1";
type StoredDemoComment = Omit<DemoComment, "createdAt"> & { createdAt: string };
const initial: DemoCommunity = {
  profile: {
    name: "Maciej",
    city: "Poznań",
    bio: "Lubię odkrywać nowe miejsca, słuchać muzyki na żywo i spędzać czas w dobrym towarzystwie.",
    interests: ["Muzyka", "Podróże"],
  },
  comments: [],
};

function read(): DemoCommunity {
  try {
    const data = JSON.parse(localStorage.getItem(storageKey) ?? "null");
    const profile = data?.profile;
    if (
      !profile ||
      typeof profile.name !== "string" ||
      !profile.name.trim() ||
      typeof profile.city !== "string" ||
      typeof profile.bio !== "string" ||
      !Array.isArray(profile.interests) ||
      !profile.interests.every((item: unknown) => typeof item === "string")
    )
      return initial;
    return {
      profile,
      comments: Array.isArray(data.comments)
        ? data.comments.flatMap((comment: Partial<StoredDemoComment> | null) => {
            if (
              !comment ||
              typeof comment.id !== "string" ||
              typeof comment.activityId !== "string" ||
              typeof comment.body !== "string" ||
              typeof comment.createdAt !== "string"
            )
              return [];

            const createdAt = new Date(comment.createdAt);
            return Number.isNaN(createdAt.getTime())
              ? []
              : [{ ...comment, createdAt } as DemoComment];
          })
        : [],
    };
  } catch {
    return initial;
  }
}

let snapshot = read();
const listeners = new Set<() => void>();
function storageChanged(event: StorageEvent) {
  if (event.key === storageKey || event.key === null) {
    snapshot = read();
    listeners.forEach((listener) => listener());
  }
}
function subscribe(listener: () => void) {
  if (!listeners.size) window.addEventListener("storage", storageChanged);
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (!listeners.size) window.removeEventListener("storage", storageChanged);
  };
}
function save(next: DemoCommunity) {
  try {
    localStorage.setItem(storageKey, JSON.stringify(next));
  } catch {
    return false;
  }
  snapshot = next;
  listeners.forEach((listener) => listener());
  return true;
}

export function useDemoCommunity() {
  const state = useSyncExternalStore(subscribe, () => snapshot);
  return {
    ...state,
    saveProfile: (profile: DemoProfile) => save({ ...snapshot, profile }),
    addComment: (activityId: string, body: string) => {
      const text = body.trim();
      if (!text || text.length > 2000) return false;
      return save({
        ...snapshot,
        comments: [
          ...snapshot.comments,
          {
            id: crypto.randomUUID(),
            activityId,
            body: text,
            createdAt: new Date(),
          },
        ],
      });
    },
    deleteComment: (id: string) =>
      save({
        ...snapshot,
        comments: snapshot.comments.filter((comment) => comment.id !== id),
      }),
  };
}
