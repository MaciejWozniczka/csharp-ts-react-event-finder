import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import agent from "../api/agent";

type ActivityResponse = Omit<Activity, "date"> & { date: string };

function toActivity(activity: ActivityResponse): Activity {
  return { ...activity, date: new Date(activity.date) };
}

export const useActivities = (id?: string | null) => {
  const queryClient = useQueryClient();
  const {
    data: activities,
    isPending,
    isError: isActivitiesError,
    refetch: refetchActivities,
  } = useQuery({
    queryKey: ["activities"],
    queryFn: async () => {
      const response = await agent.get<ActivityResponse[]>("/activities");
      return response.data.map(toActivity);
    },
  });

  const {
    data: activity,
    isLoading: isLoadingActivity,
    error: activityError,
    refetch: refetchActivity,
  } = useQuery({
    queryKey: ["activities", id],
    queryFn: async () => {
      const response = await agent.get<ActivityResponse>(`/activities/${id}`);
      return toActivity(response.data);
    },
    enabled: !!id,
  });

  const createActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await agent.post(`/activities`, activity);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const updateActivity = useMutation({
    mutationFn: async (activity: Activity) => {
      const response = await agent.put(`/activities`, activity);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities"] });
    },
  });

  const deleteActivity = useMutation({
    mutationFn: async (id: string) => {
      const response = await agent.delete(`/activities/${id}`);
      return response.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["activities"],
        exact: true,
      });
    },
  });

  return {
    activities,
    isActivitiesError,
    refetchActivities,
    activityError,
    refetchActivity,
    isPending,
    createActivity,
    updateActivity,
    deleteActivity,
    activity,
    isLoadingActivity,
  };
};
