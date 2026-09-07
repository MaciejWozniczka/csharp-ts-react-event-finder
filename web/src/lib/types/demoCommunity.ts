export type DemoProfile = {
  name: string;
  city: string;
  bio: string;
  interests: string[];
};
export type DemoComment = {
  id: string;
  activityId: string;
  body: string;
  createdAt: string;
};
export type DemoCommunity = { profile: DemoProfile; comments: DemoComment[] };
