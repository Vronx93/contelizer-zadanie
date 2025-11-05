import { addToast } from "@heroui/toast";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { Radio, RadioGroup } from "@heroui/radio";
import { Button } from "@heroui/button";
import { Gender, Status, User } from "@/lib/interfaces";
import { useUpdateUser } from "@/hooks/useUpdateUser";

interface EditUserFormProps {
  selectedUser: User;
  onClose: () => void;
}

const formSchema = z.object({
  id: z
    .number("Id musi być liczbą.")
    .nonnegative("Id musi być liczbą dodatnią.")
    .nonoptional("Brak numeru id użytkownika."),
  name: z.string().optional(),
  email: z.email("Podaj prawidłowy adres e-mail.").optional(),
  gender: z.enum(["male", "female"], { error: "Wybierz płeć." }).optional(),
  status: z
    .enum(["active", "inactive"], { error: "Wybierz status." })
    .optional(),
});

type FormData = z.infer<typeof formSchema>;

export default function EditUserForm({
  selectedUser,
  onClose,
}: EditUserFormProps) {
  const {
    register,
    setValue,
    getValues,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: selectedUser.email,
      gender: selectedUser.gender,
      id: selectedUser.id,
      name: selectedUser.name,
      status: selectedUser.status,
    },
  });
  const { mutateAsync, isPending } = useUpdateUser();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { user, message } = await mutateAsync(data);
    if (user) {
      onClose();
      addToast({
        title: "Sukces",
        description: (
          <p>
            Zaktualizowano konto użytkownika o adresie e-mail:{" "}
            <span className="font-semibold">{user.email}</span>
          </p>
        ),
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
      <Input
        {...register("name")}
        type="text"
        label="Imię i nazwisko"
        placeholder="Wpisz pełne imię i nazwisko"
        size="lg"
        variant="bordered"
        isInvalid={errors.name ? true : false}
        errorMessage={errors.name?.message}
      />
      <Input
        {...register("email")}
        type="text"
        label="E-mail użytkownika"
        placeholder="Wpisz adres e-mail"
        size="lg"
        variant="bordered"
        isInvalid={errors.email ? true : false}
        errorMessage={errors.email?.message}
      />
      <RadioGroup
        label="Wybierz płeć"
        orientation="horizontal"
        isInvalid={errors.gender ? true : false}
        errorMessage={errors.gender?.message}
        onValueChange={(value) =>
          setValue("gender", value as Gender, { shouldValidate: true })
        }
        value={getValues("gender")}
      >
        <Radio value="male">Mężczyzna</Radio>
        <Radio value="female">Kobieta</Radio>
      </RadioGroup>
      <RadioGroup
        label="Wybierz status"
        orientation="horizontal"
        isInvalid={errors.status ? true : false}
        errorMessage={errors.status?.message}
        onValueChange={(value) =>
          setValue("status", value as Status, { shouldValidate: true })
        }
        value={getValues("status")}
      >
        <Radio value="active">Aktywny</Radio>
        <Radio value="inactive">Nieaktywny</Radio>
      </RadioGroup>
      <Button
        type="submit"
        size="lg"
        color="primary"
        isLoading={isSubmitting || isPending}
      >
        {isSubmitting || isPending
          ? "Aktualizowanie danych.."
          : "Zatwierdź zmiany"}
      </Button>
    </form>
  );
}
