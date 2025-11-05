"use client";

import { SubmitHandler, useForm } from "react-hook-form";
import { Input } from "@heroui/input";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/react";
import { validatePolish } from "validate-polish";

type FormData = {
  pesel: string;
};

export default function PESELForm() {
  const {
    register,
    handleSubmit,
    formState: { isSubmitting },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = ({ pesel }) => {
    if (validatePolish.pesel(pesel)) {
      addToast({
        description: (
          <p>
            Pesel <span className="font-semibold">{pesel}</span> jest
            prawidłowy.
          </p>
        ),
        color: "success",
      });
    } else {
      addToast({
        description: (
          <p>
            Pesel <span className="font-semibold">{pesel}</span> jest błędny.
          </p>
        ),
        color: "danger",
      });
    }
  };

  return (
    <form
      className="flex flex-col gap-3 w-full"
      onSubmit={handleSubmit(onSubmit)}
    >
      <Input
        {...register("pesel")}
        variant="bordered"
        label="Wpisz PESEL"
        labelPlacement="outside-top"
        isClearable
        placeholder="Sprawdź numer PESEL..."
        size="lg"
      />
      <Button
        type="submit"
        size="lg"
        color="primary"
        isLoading={isSubmitting}
        className="sm:max-w-[320px] sm:ml-auto"
      >
        Sprawdź poprawność
      </Button>
    </form>
  );
}
