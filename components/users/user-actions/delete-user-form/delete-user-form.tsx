import { addToast } from "@heroui/toast";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { User } from "@/lib/interfaces";
import { useDeleteUser } from "@/hooks/useDeleteUser";
import z from "zod";

interface DeleteUserFormProps {
  selectedUser: User;
  onClose: () => void;
}

const formSchema = z.object({
  id: z
    .number("Id musi być liczbą.")
    .nonnegative("Id musi być liczbą dodatnią.")
    .nonoptional("Brak numeru id użytkownika."),
});

type FormData = z.infer<typeof formSchema>;

export default function DeleteUserForm({
  selectedUser,
  onClose,
}: DeleteUserFormProps) {
  const {
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      id: selectedUser.id,
    },
  });
  const { mutateAsync, isPending } = useDeleteUser();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { userId, message } = await mutateAsync(data.id);
    if (userId) {
      onClose();
      addToast({
        title: "Sukces",
        description: message,
        color: "success",
      });
    } else {
      addToast({
        title: "Błąd",
        description: message,
        color: "danger",
      });
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="dark flex flex-col gap-4 w-full"
    >
      <Button
        type="submit"
        size="lg"
        color="primary"
        isLoading={isSubmitting || isPending}
      >
        {isSubmitting || isPending ? "Trwa usuwanie..." : "Usuń"}
      </Button>
      <Button
        type="button"
        size="lg"
        color="primary"
        variant="bordered"
        isDisabled={isSubmitting || isPending}
        onPress={onClose}
      >
        Anuluj
      </Button>
    </form>
  );
}
