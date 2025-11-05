import { Card, CardBody, CardHeader } from "@heroui/card";

interface NewTextProps {
  text: string;
}

export default function NewText({ text }: NewTextProps) {
  return (
    <Card className="dark p-4 w-full animate-appearance-in" shadow="md">
      <CardHeader className="font-bold">Wygenerowany tekst</CardHeader>
      <CardBody className="whitespace-pre-wrap">{text}</CardBody>
    </Card>
  );
}
