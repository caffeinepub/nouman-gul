import { useQuery } from "@tanstack/react-query";
import { useActor } from "./useActor";

export interface Profile {
  bio: string;
  tagline: string;
  name: string;
}

export function useGetProfile() {
  const { actor, isFetching } = useActor();
  return useQuery<Profile>({
    queryKey: ["profile"],
    queryFn: async () => {
      if (!actor) return { name: "", tagline: "", bio: "" };
      return actor.getProfile();
    },
    enabled: !!actor && !isFetching,
  });
}
