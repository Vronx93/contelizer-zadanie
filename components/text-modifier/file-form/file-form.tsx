"use client";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { Button } from "@heroui/button";
import { addToast } from "@heroui/react";
import { shuffleText, shuffleWord } from "@/components/text-modifier/utils";
import { useEffect, useState } from "react";
import NewText from "../new-text/new-text";

const fileSchema = z.object({
  file: z
    .instanceof(File, { message: "Wgraj poprawny plik" })
    .refine(
      (file) => file.type === "text/plain" || file.name.endsWith(".txt"),
      "Tylko pliki .txt są dozwolone"
    ),
});

type FormData = z.infer<typeof fileSchema>;

export default function FileForm() {
  const {
    handleSubmit,
    watch,
    getValues,
    setValue,
    formState: { errors, isSubmitting },
  } = useForm<FormData>({ resolver: zodResolver(fileSchema) });
  const [text, setText] = useState<string>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const text = await data.file.text();
      const newText = shuffleText(text);
      setText(newText);

      addToast({
        title: "Sukces",
        description: (
          <p>
            Wygenerowano tekst dla pliku: <br />
            <span className="font-semibold">"{data.file.name}"</span>
          </p>
        ),
        color: "success",
      });
    } catch (error) {
      console.error(error);
      addToast({
        title: "Błąd",
        description: "Nie udało się odczytać pliku.",
        color: "danger",
      });
    }
  };

  useEffect(() => {
    getValues("file")
      ?.text()
      .then((originalText) => setText(originalText));
  }, [watch("file")]);

  return (
    <div className="flex flex-col items-center gap-8 w-full">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col gap-3 w-full"
      >
        {watch("file")?.name && (
          <p>
            Wybrano: <span className="font-semibold">{watch("file").name}</span>
          </p>
        )}
        {errors.file && (
          <p className="text-red-500 text-xs">{errors.file.message}</p>
        )}
        <div
          className="flex flex-col gap-3 
        md:items-start md:mr-auto"
        >
          <Button as="label" variant="bordered" className="w-full">
            Wybierz plik tekstowy
            <input
              type="file"
              className="hidden"
              onChange={(e) => {
                const file = e.target.files?.[0];
                if (file) setValue("file", file);
              }}
            />
          </Button>

          <Button
            type="submit"
            color="primary"
            isLoading={isSubmitting}
            className="w-full"
          >
            {isSubmitting ? "Trwa generowanie.." : "Generuj zmieniony tekst"}
          </Button>
        </div>
      </form>
      <NewText text={text || ""} />
    </div>
  );
}
