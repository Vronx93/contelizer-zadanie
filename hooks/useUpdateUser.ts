import { updateUser } from "@/actions/users/usersActions";
import { User } from "@/lib/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useUpdateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: updateUser,
    onSuccess: (res) => {
      if (!res.user) return;

      queryClient.setQueryData(
        ["users"],
        (oldData: { users: User[] } | undefined) => {
          if (!oldData) {
            return { users: [res.user] };
          }
          return {
            users: oldData.users.map((user) =>
              user.id === res.user?.id ? res.user : user
            ),
          };
        }
      );
      return res.user;
    },
  });

  return { mutateAsync, isPending };
}
