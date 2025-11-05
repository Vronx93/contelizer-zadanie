import { deleteUser } from "@/actions/users/usersActions";
import { User } from "@/lib/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useDeleteUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: deleteUser,
    onSuccess: (res) => {
      if (!res.userId) return;

      queryClient.setQueryData(
        ["users"],
        (oldData: { users: User[] } | undefined) => {
          if (!oldData) {
            return { users: [] };
          }
          return {
            users: oldData.users.filter((user) => user.id !== res.userId),
          };
        }
      );
      return res.userId;
    },
  });

  return { mutateAsync, isPending };
}
