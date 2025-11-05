import { addToast } from "@heroui/toast";
import { Input } from "@heroui/input";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import z from "zod";
import { Radio, RadioGroup } from "@heroui/radio";
import { Button } from "@heroui/button";
import { useCreateUser } from "@/hooks/useCreateUser";
import { Gender, Status } from "@/lib/interfaces";

interface AddUserFormProps {
  onClose: () => void;
}

const formSchema = z.object({
  name: z.string().nonempty("Podaj imię."),
  email: z.email("Podaj prawidłowy adres e-mail.").nonempty("Podaj e-mail."),
  gender: z.enum(["male", "female"], { error: "Wybierz płeć." }),
  status: z.enum(["active", "inactive"], { error: "Wybierz status." }),
});

type FormData = z.infer<typeof formSchema>;

export default function AddUserForm({ onClose }: AddUserFormProps) {
  const {
    register,
    setValue,
    handleSubmit,
    formState: { isSubmitting, errors },
  } = useForm<FormData>({ resolver: zodResolver(formSchema) });
  const { mutateAsync, isPending } = useCreateUser();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    const { user } = await mutateAsync(data);
    if (user) {
      onClose();
      addToast({
        title: "Sukces",
        description: (
          <p>
            Utworzono konto użytkownika dla adresu e-mail:{" "}
            <span className="font-semibold">{user.email}</span>
          </p>
        ),
        color: "success",
      });
    } else {
      addToast({
        title: "Błąd",
        description: <p>Utworzenie konta nie powiodło się.</p>,
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
          ? "Tworzenie użytkownika.."
          : "Stwórz użytkownika"}
      </Button>
    </form>
  );
}
