import { fetchUsers } from "@/actions/users/usersActions";
import { useQuery } from "@tanstack/react-query";

export default function useUsers() {
  const {
    data: usersData,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    staleTime: 6000 * 5,
  });

  return {
    users: usersData?.users || [],
    isLoading,
    errorMessage: usersData?.errorMessage || error?.message,
  };
}
