import { createUser } from "@/actions/users/usersActions";
import { User } from "@/lib/interfaces";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export function useCreateUser() {
  const queryClient = useQueryClient();

  const { mutateAsync, isPending } = useMutation({
    mutationFn: createUser,
    onSuccess: (res) => {
      if (!res.user) return;

      queryClient.setQueryData(
        ["users"],
        (oldData: { users: User[] } | undefined) => {
          return oldData
            ? { users: [...oldData.users, res.user] }
            : { users: [res.user] };
        }
      );
      return res.user;
    },
  });

  return { mutateAsync, isPending };
}
